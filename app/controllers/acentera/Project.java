/*
Copyright (c) 2013 - 2014 ACenterA Inc.

MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

package controllers.acentera;

import com.myjeeva.digitalocean.pojo.DropletImage;
import com.typesafe.plugin.MailerAPI;
import com.typesafe.plugin.MailerPlugin;
import models.db.*;
import models.db.acentera.exceptions.DAOException;
import models.db.acentera.impl.ProjectImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.hibernate.Session;
import play.Logger;
import play.i18n.Messages;
import play.mvc.Result;
import play.mvc.With;
import com.acentera.utils.ProjectsHelpers;
import utils.HibernateSessionFactory;

import java.util.List;


@With(SecurityController.class)
public class Project extends ACenterAController {


    public static Result getProjectById(Long projectId ) {

        //only users that can access this project
        SecurityController.checkPermission(projectId);

        return OkJsonResult(
                ProjectsHelpers.getInstance().getUserProjectWithRolesAsJson(
                        ProjectImpl.getProjectInfo(projectId, getUser()), getUser()
                )
        );
    }


    @With(UserPasswordRequire.class)
    public static Result deleteProject(Long projectId) throws DAOException {
        //only admin
        SecurityController.checkIsAdmin(projectId);
        //Make sure we can execute this action

        boolean bRes = ProjectsHelpers.getInstance().deleteProjectId(projectId);

        if (bRes) {
            return OkEmptyJsonResult();
        } else {
            return FailedMessage("DELETE_FAILED");
        }
    }


    public static Result getProjects() {
        try {
            Logger.debug("GET PROJECTS CALLED....");
            return OkJsonResult(
                    ProjectsHelpers.getAvailableProjectsAsJson(getUser())
            );
        } catch (Exception ee) {
            return FailedMessage(ee.getMessage());
        }
    }

    public static Result getProjectServers(final Long projectId) {

        //only users that can access this project
        SecurityController.checkPermission(projectId);

        /* ASync Example.. or update if something new... only for website

        try {

            //Return cached data or database stored data..

            JSONObject j = new JSONObject();
            //ProjectsHelpers.getServersByProjectAndUserAccess(projectId, getUser())
            j.put("servers",new JSONArray());
            return OkJsonResult(
                    j
            );
        } finally {

            //Get newest data and send update to browser if needed...
            msgActor.addAsyncJob(new AsyncJob() {

                @Override
                protected void executeJob() {
                    JSONObject obj = ProjectsHelpers.getServersByProjectAndUserAccess(projectId, getUser());

                    updateModel(obj);
                }
            });
        }
        */

        /* If not used async ... then we would do this  only */
        //Return cached data or database stored data..
        return OkJsonResult(
                ProjectsHelpers.getServersByProjectAndUserAccess(projectId, getUser())
        );
    }

    public static Result getProjectServerDetails(final Long projectId, final String providerName, final Long serverId) {

        //only users that can access this project
        SecurityController.checkPermission(projectId);

        JSONObject server = ProjectsHelpers.getServerByProjectAndUserAccess(projectId, providerName, serverId);

        return OkJsonResult(
                server
        );

    }


    public static Result getProjectServerInfo(final Long projectId, final Long serverid) {


        //only users that can access this project
        SecurityController.checkPermission(projectId);

        JSONObject server = ProjectsHelpers.getServerByProject(projectId, serverid);

        return OkJsonResult(
                server
        );

    }



    /* Cloud Provider -- API Keys */
    public static Result deleteCloudProvider(Long projectId, Long providerId) {
        //only admin
        SecurityController.checkIsAdmin(projectId);
        //Make sure we can execute this action

        boolean bRes = ProjectImpl.deleteCloudProvider(projectId, providerId, getUser());

        if (bRes) {
            return OkEmptyJsonResult();
        } else {
            return FailedMessage("DELETE_FAILED");
        }
    }

    public static Result addNewCloudProvider(Long projectId) {
        //only admin
        SecurityController.checkIsAdmin(projectId);

        JSONObject jsonData = getPostBodyAsJson("provider");


        ProjectProviders provider  = ProjectImpl.createProjectProvider(projectId, getUser(), jsonData);
        ProjectsHelpers.getOrReloadAPIRegions(provider);
        return OkCreatedJsonResult(
                ProjectsHelpers.getProjectProvidersAsJson(provider)
        );
    }

    public static Result updateCloudProvider(Long projectId, Long providerId) {

        //onlyAdmin
        SecurityController.checkIsAdmin(projectId);

        //Make sure we can execute this action
        JSONObject jsonData = getPostBodyAsJson("provider");
        ProjectProviders provider  = ProjectImpl.updateCloudProvider(projectId, providerId, getUser(),jsonData);

        //Ok lets validate the connectivity... (and gater regions...)
        ProjectsHelpers.getOrReloadAPIRegions(provider);


        return OkJsonResult(
                ProjectsHelpers.getProjectProvidersAsJson(provider)
        );
    }


    public static Result getProjectProviderImages(Long projectId, Long providerId) {
        //Make sure we can execute this action
        try {
            List<DropletImage> lstImages = ProjectsHelpers.getAvailableImages(projectId, providerId);


            return OkJsonResult(
                    ProjectsHelpers.getProjectImagesAsJson(lstImages)
            );

        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("IMAGE_GET", e);
        }
    }



    public static Result createProjects() {

      //Everyone can create projects...
      JSONObject jsonData = getPostBodyAsJson("projects");

      models.db.Project p = new models.db.Project();
      p.setName(jsonData.getString("name"));

      ProjectUserRoles userProjectRole  = ProjectImpl.createProjectAsAdmin(p, getUser());

      Session session = HibernateSessionFactory.getSession();
      if (!session.getTransaction().wasCommitted()) {
        if (session.getTransaction().isActive()) {
            if (!session.getTransaction().wasRolledBack()) {
                session.getTransaction().commit();
            }
        }
      }




      p = userProjectRole.getProjectTags().getProject();

      //Return created Projects object
      //getAvailableProjectsAsJson()
      return OkJsonResult(ProjectsHelpers.getProjectsAsJson(p));
  }



    /* Project Quotas */
    public static Result addNewProjectQuota(Long projectId) {
        JSONObject jsonData = getPostBodyAsJson("quota");
        SecurityController.checkIsAdmin(projectId);
        /*
            name: "dsfdsf"
            compute: 5
        */

        ProjectQuota q = ProjectImpl.createProjectQuota(projectId, getUser(), jsonData);

        try {
            return OkCreatedJsonResult(
                    ProjectsHelpers.getQuotaAsJson(q)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("EXCEPTION", e);
        }
    }

    public static Result updateProjectQuota(Long projectId, Long quotaId) {
        JSONObject jsonData = getPostBodyAsJson("quota");
        SecurityController.checkIsAdmin(projectId);
        /*
            name: "dsfdsf"
            compute: 5
        */

        ProjectQuota q  = ProjectImpl.updateProjectQuota(projectId, quotaId, getUser(), jsonData);

        try {
            return OkCreatedJsonResult(
                    ProjectsHelpers.getQuotaAsJson(q)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("EXCEPTION", e);
        }
    }

    public static Result deleteProjectQuota(Long projectId, Long quotaId) {

        SecurityController.checkIsAdmin(projectId);

        boolean bRes = ProjectImpl.deleteProjectQuota(projectId, quotaId, getUser());

        if (bRes) {
            return OkEmptyJsonResult();
        } else {
            return FailedMessage("DELETE_FAILED");
        }

    }







    /* Project Users */
    public static Result addProjectUser(Long projectId) {
        JSONObject jsonData = getPostBodyAsJson("user");

        if (SecurityController.canEditUsers(projectId)) {

            ProjectQuota q = ProjectImpl.createProjectUser(projectId, getUser(), jsonData);

            try {
                return OkCreatedJsonResult(
                        ProjectsHelpers.getQuotaAsJson(q)
                );
            } catch (Exception e) {
                e.printStackTrace();
                return FailedMessage("EXCEPTION", e);
            }
        } else {
            return FailedMessage("UNAUTHORIZED");
        }
    }

    public static Result updateProjectUser(Long projectId, Long userId) {
        JSONObject jsonData = getPostBodyAsJson("user");

        /*
            name: "dsfdsf"
            compute: 5
        */
        if (SecurityController.canDeleteUser(projectId, userId)) {
            String r = ProjectImpl.updateProjectUser(projectId, userId, getUser(), jsonData);

            try {
                return getProjectUserDetails(projectId, userId);
            } catch (Exception e) {
                e.printStackTrace();
                return FailedMessage("EXCEPTION", e);
            }
        } else {
            return FailedMessage("UNAUTHORIZED");
        }
    }

    public static Result getProjectUserDetails(Long projectId, Long userId) {

        JSONObject res = null;
        Logger.debug("getProjectUserDetails A ");
        if (SecurityController.canViewUser(projectId, userId)) {
            Logger.debug("getProjectUserDetails B ");

            try {

                res = ProjectImpl.getProjectUserDetails(projectId, userId, getUser());
                Logger.debug("getProjectUserDetails C " + res);

                if (res == null) {
                    JSONObject jso = new JSONObject();
                    JSONObject jsoUser = new JSONObject();
                    jsoUser.put("id", userId);
                    jsoUser.put("disable", 1);
                    jso.put("users", jsoUser);
                    return OkJsonResult(jso);
                    //return OkEmptyJsonResult();
                }
                return OkJsonResult(res);
            } catch (Exception e) {
                e.printStackTrace();
                return FailedMessage(e.getMessage());
            }
        } else {
            return FailedMessage("UNAUTHORIZED");
        }
    }

    public static Result deleteProjectUser(Long projectId, Long userId) {
        try {
            boolean bRes = false;
            Logger.debug("DELETE PROJECT USER");
            if (SecurityController.canDeleteUser(projectId, userId)) {
                Logger.debug("DELETE PROJECT CAN DELETE");
                try {
                    Logger.debug("DELETE PROJECT CAN DELETE OF : " + userId);
                    bRes = ProjectImpl.deleteProjectUser(projectId, userId);

                    if (bRes) {
                        return OkEmptyJsonResult();
                    } else {
                        return FailedMessage("DELETE_FAILED 1");
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    return FailedMessage(e.getMessage());
                }
            } else {
                return FailedMessage("UNAUTHORIZED 1");
            }
        } catch (Exception eee) {
            eee.printStackTrace();
        }
        return FailedMessage("UNAUTHORIZED 2");

    }



    /* Invite Users */

    public static Result inviteResponseProjectUser(Long projectId, String inviteId) {
        JSONObject jsonData = getPostBodyAsJson();

        /*
            email: "email@email.com"
        */
        if (SecurityController.canViewProject(projectId)) {
            try {
                String u = ProjectImpl.inviteResponseProjectUser(projectId, getUser(), inviteId, jsonData);

                if (u != null) {
                    return OkCreatedJsonResult(u);
                } else {
                    return notFound();
                }

            } catch (Exception e) {
                e.printStackTrace();
                return FailedMessage("EXCEPTION", e);
            }
        } else {
            return FailedMessage("UNAUTHORIZED");
        }
    }

    public static Result inviteProjectUser(Long projectId) {
        JSONObject jsonData = getPostBodyAsJson("projectInvite");


            if (SecurityController.isProjectAdmin(projectId)) {
                try {
                    String u = ProjectImpl.inviteProjectUser(projectId, getUser(), jsonData);


                    if (u != null) {

                        //Ok the user successfully got invited... lets send an email
                        String invitedUserEmail = jsonData.getString("email");
                        MailerAPI mail = play.Play.application().plugin(MailerPlugin.class).email();


                        mail.setSubject(Messages.get("EMAIL_INVITE_SUBJECT"));
                        mail.addRecipient(invitedUserEmail);

                        //Send a copy to the current user..
                        //mail.addCc(getUser().getEmail());

                        mail.addFrom("ACenterA Support <noreply@acentera.com>");
                        //sends both text and html

                        //TODO: SHould load .yml file instead using yml freemarker templating..
                        mail.send(
                                Messages.get("EMAIL_INVITE_PLAIN_HEAD") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_PLAIN_PHRASE1") + " " + getUser().getEmail() + "\r\n" +
                                        Messages.get("EMAIL_INVITE_PLAIN_PHRASE2") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_PLAIN_LINKPHRASE_BEFORE") + " " + "https://" + request().host() + "/project/" + projectId + " " + Messages.get("EMAIL_INVITE_PLAIN_LINKPHRASE_AFTER") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_PLAIN_PHRASE3") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_PLAIN_PHRASE4") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_PLAIN_FOOTER") + "\r\n"
                                ,
                                "<html>" +
                                        Messages.get("EMAIL_INVITE_HTML_HEAD") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_HTML_PHRASE1") + " " + getUser().getEmail() + "\r\n" +
                                        Messages.get("EMAIL_INVITE_HTML_PHRASE2") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_HTML_LINKPHRASE_BEFORE") + "&nbsp;" + "<a href='https://" + request().host() + "/project/" + projectId + "'>https://" + request().host() + "/project/" + projectId + "</a>&nbsp;" + Messages.get("EMAIL_INVITE_PLAIN_LINKPHRASE_AFTER") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_HTML_PHRASE3") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_HTML_PHRASE4") + "\r\n" +
                                        Messages.get("EMAIL_INVITE_HTML_FOOTER") + "\r\n" +
                                        "</html>"
                        );
                        return OkCreatedJsonResult(u);
                    } else {
                        return OkEmptyJsonResult();
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    return FailedMessage("EXCEPTION", e);
                }
            } else {
                return FailedMessage("UNAUTHORIZED");
            }
    }


    /* SSH Keys */
    public static Result addProjectSshKey(Long projectId) {
        JSONObject jsonData = getPostBodyAsJson("sshkey");

        /*
            name, tag, publickey
        */

        try {
            ProjectSshKey sshKey = ProjectImpl.addProjectSSHKey(projectId, jsonData);

            if ( sshKey != null ) {
                return OkCreatedJsonResult(ProjectsHelpers.getSshKeyAsJson(sshKey));
            } else {
                return OkEmptyJsonResult();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("EXCEPTION", e);
        }
    }

    public static Result deleteProjectSshKey(Long projectId, Long sshKeyId) {
        try {
                //if (SecurityController.canEditKey(projectId, sshKeyId)) {
                    ProjectSshKey sshKey = ProjectImpl.getProjectSshKey(projectId, sshKeyId);
                    if (SecurityController.canEditKey(sshKey)) {
                        boolean deleted = ProjectImpl.deleteProjectSSHKey(projectId, sshKeyId);

                        if (deleted) {
                            return OkEmptyJsonResult();
                        } else {
                            return FailedMessage("DELETE_FAILED");
                        }
                } else {
                    return FailedMessage("UNAUTHORIZED");
                }
            } catch (Exception e) {
                e.printStackTrace();
                return FailedMessage("EXCEPTION", e);
            }
    }

    public static Result updateProjectSshKey(Long projectId, Long sshKeyId) {
        JSONObject jsonData = getPostBodyAsJson("sshkey");

        /*
            name, tag, publickey
        */

        try {
            ProjectSshKey sshKey = ProjectImpl.getProjectSshKey(projectId, sshKeyId);
            if (SecurityController.canEditKey(sshKey)) {
                sshKey = ProjectImpl.updateProjectSSHKey(projectId, sshKeyId, jsonData);

                if (sshKey != null) {
                    return OkJsonResult(ProjectsHelpers.getSshKeyAsJson(sshKey));
                } else {
                    return OkEmptyJsonResult();
                }
            } else {
                return FailedMessage("UNAUTHORIZED");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("EXCEPTION", e);
        }
    }



    public static Result getProjectTaskStatus(Long projectId, Long taskId) {
        try {
            Logger.debug("GetProjectTaskStatus : " + projectId + " , " + taskId);
            if (SecurityController.isProjectAdmin(projectId)) {
                String r = ProjectsHelpers.getProjectTaskStatusAsJson(projectId, taskId);
                return OkJsonResult(r);
            } else {
                return FailedMessage("UNAUTHORIZED");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("EXEPTION", e);
        }
    }

    public static Result createProjectServer(Long projectId) {
        JSONObject jsonData = getPostBodyAsJson("server");

        /*
            all required informations...
        */

        try {
            if (SecurityController.isProjectAdmin(projectId)) {
                ProjectTasks d = ProjectsHelpers.createNewDroplet(projectId, jsonData.getLong("provider_id"), jsonData);
                String r = ProjectsHelpers.getDropletEventStatusInfo(projectId, Integer.valueOf(d.getExtId()), jsonData.getLong("provider_id"));




                JSONObject jsoStatus = new JSONObject();


                //TODO: We sould probably return the task object instead of having the UI Client to do another Query to get it..
                jsoStatus.put("task_id", d.getId());
                jsoStatus.put("status", "OK");
                jsoStatus.put("success", true);

                //for testing without really creating a server...
                //String r = "{\"status\":\"OK\",\"eventId\":null,\"errorMessage\":null,\"event\":{\"id\":24325056,\"actionStatus\":null,\"dropletId\":1641802,\"eventTypeId\":1,\"percentage\":\"3\"}}";

                jsoStatus.put("data", r);

                if (r != null) {
                    return OkJsonResult(jsoStatus.toString());
                } else {
                    return OkEmptyJsonResult();
                }
            } else {
                return FailedMessage("UNAUTHORIZED");
            }

//            return OkEmptyJsonResult();
        } catch (Exception e) {
            e.printStackTrace();
            return FailedMessage("EXCEPTION", e);
        }

        //return OkEmptyJsonResult();
    }





}
