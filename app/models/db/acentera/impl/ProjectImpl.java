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

package models.db.acentera.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.myjeeva.digitalocean.pojo.DropletImage;
import controllers.acentera.SecurityController;
//import models.web.Project;
import models.db.*;
import models.db.acentera.constants.RoleConstants;
import models.db.acentera.constants.TagConstants;
import models.db.acentera.exceptions.DAOException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import play.Logger;
import utils.HibernateSessionFactory;
import com.acentera.utils.ProjectsHelpers;

import java.math.BigInteger;
import java.util.*;

import static ch.lambdaj.Lambda.*;
import static ch.lambdaj.Lambda.select;
import static org.hamcrest.Matchers.equalTo;

public class ProjectImpl extends DAO {

    private static Object availableSshKeys;
    private static Long uniqueCloudId;

    public ProjectImpl() {
        super();
    }


    public static List<ProjectSshKey> getAvailableSshKeys(Long projectId) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectSshKey.class);

        List<ProjectSshKey> lstSshKeys = (List<ProjectSshKey>) criteria.add(Restrictions.and(
                Restrictions.eq("projects.id", projectId)
        )).list();

        return lstSshKeys;
    }

    public static Long getUniqueCloudId() {
        Session s = (Session) HibernateSessionFactory.getSession();

        Random rand = new Random();
        long cloudId = 0;
        boolean notUnique = true;
        while(notUnique) {
            cloudId = rand.nextInt(10000000);

            Query query = s.createSQLQuery(
                    "select count(1) from  project where cloudId = :cloudId limit 1")
                    .setParameter("cloudId", cloudId);

            List result = query.list();
            BigInteger l = (BigInteger)result.get(0);
            if (l.intValue() <= 0) {
                notUnique = false;
            }
        }

        return cloudId;
    }

    private void disableTags(ProjectProvidersQuotaTags tag) {
        tag.disable();
    }

    private void enableTags(ProjectProvidersQuotaTags tag) {
        tag.enable();
    }





    public static ProjectDevices getProjectServer(Long projectId, Long internalId) throws Exception {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectDevices.class);

        return (ProjectDevices) criteria.add(Restrictions.and(
                        Restrictions.eq("project.id", projectId),
                        Restrictions.eq("id", internalId)
                )
        ).uniqueResult();
    }

    public static List<UserProjects> getProjectForUser(User u) throws Exception {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        return (List<UserProjects>) criteria.add(Restrictions.and(
                        Restrictions.eq("user", u)
                )
        ).list();
    }

    public static JSONObject getProjectUserDetails(Long projectId, Long userId, User u) throws Exception {
            Logger.debug("getProjectUserDetails B1 ");
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

            JSONArray jsoProjectUserArray = new JSONArray();
            JSONArray jsoUserArray = new JSONArray();
            JSONArray jsoProjectIdArray = new JSONArray();
            jsoProjectIdArray.add(projectId);

            Set<User> proessedUsers = new HashSet<User>();

            //Get informations about the current User if its in this project...
            //User theUser = UserImpl.getUserById(userId);

            //Verry Bad but we couldn't get the user / project mapping to work properly in restrictions...
        Logger.debug("getProjectUserDetails B2  ");
            List<UserProjects> lstUp = (List<UserProjects>) criteria.add(Restrictions.and(
                        Restrictions.eq("project.id", projectId)
                    )
            ).list();
        Logger.debug("getProjectUserDetails B2a  " + lstUp);

            UserProjects up = null;
            Iterator<UserProjects> itrUp = lstUp.iterator();
            while (itrUp.hasNext() && up == null) {
                    UserProjects tmpUp = itrUp.next();
                    if (tmpUp.getUser().getId().longValue() == userId) {
                        up = tmpUp;
                    }
            }


        Logger.debug("getProjectUserDetails Bb " + up);

            if (up == null) {
                Logger.debug("Returning null 2...");
                return null;
            }


            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            mapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
            ObjectWriter ow = mapper.writer();

            User projectUser = up.getUser();

            jsoProjectUserArray.add(projectUser.getId());
            JSONObject jsoUser = JSONObject.fromObject(mapper.writeValueAsString(projectUser));
            jsoUser.put("project", jsoProjectIdArray);
            jsoUser.put("project_id", projectId);

            //get current user Tag only..
            //Other tags will be gathered if end-user click on them..
            List<ProjectUserTags> tags = ProjectImpl.getUserProjectTags(up);
            JSONArray jsoTagsArr = new JSONArray();
            for (int i = 0; i < tags.size(); i++) {
                jsoTagsArr.add(JSONObject.fromObject(mapper.writeValueAsString(tags.get(i))));
            }

            //jsoUser.put("tags", mapper.writeValueAsString(userProject.getTags()));
            jsoUser.put("tags", jsoTagsArr);


            //Get the current user roles for this project...
            JSONArray jsRolesArray = new JSONArray();
            Set<ProjectTags> userRoles = ProjectImpl.getUserProjectRoles(up);
            Iterator<ProjectTags> itrRoles = userRoles.iterator();
            while(itrRoles.hasNext()) {
                ProjectTags userProjectRole = itrRoles.next();
                JSONObject role = JSONObject.fromObject(ow.writeValueAsString(userProjectRole));
                jsRolesArray.add(role);
            }
            jsoUser.put("roles", jsRolesArray);


            jsoUserArray.add(jsoUser);

            proessedUsers.add(projectUser);

            JSONObject jso = new JSONObject();
            jso.put("users", jsoUserArray);
           //jsoProject.put("users", jsoProjectUserArray);

             return jso;
    }


    public static User getUsersForProjectById(Project p, Long userId) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                        Restrictions.eq("project", p),
                        Restrictions.eq("user.id", userId)
                )
        ).uniqueResult();

        if (userProject != null)
            return userProject.getUser();

        return null;
    }

    public static List<UserProjects> getUsersForProject(Project p) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        List<UserProjects> lst = (List<UserProjects>) criteria.add(Restrictions.and(
                        Restrictions.eq("project", p)
                )
        ).list();

        return lst;
    }

    public static List<Project> getAvailableProjects(User u) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        List<UserProjects> lst = (List<UserProjects>) criteria.add(Restrictions.and(
                                     Restrictions.eq("user", u)
                )
       ).list();


        //Get only active Projects
        List<Project> projects = extract(lst, on(UserProjects.class).getProject());

        Logger.debug("GOT PROJECTS? : " + projects);
        return projects;
    }

    public static Project getProject(Long projectId, User u) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        List<UserProjects> lst = (List<UserProjects>) criteria.add(Restrictions.and(
                        Restrictions.eq("project.id", projectId),
                        Restrictions.eq("user", u)
                )
        ).list();


        if (lst.size() == 1) {
            return lst.get(0).getProject();
        }

        return null;
    }

    public static Project getProject(Long projectId) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        List<UserProjects> lst = (List<UserProjects>) criteria.add(Restrictions.and(
                        Restrictions.eq("project.id", projectId),
                        Restrictions.eq("user", SecurityController.getUser())
                )
        ).list();


        if (lst.size() == 1) {
            return lst.get(0).getProject();
        }

        return null;
    }

    public static List<ProjectUserTags> getUserProjectTags(UserProjects up) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectUserTags.class).createAlias("projectTags", "tags");

        List<ProjectUserTags> tags = (List<ProjectUserTags>) criteria.add(Restrictions.and(
                        Restrictions.eq("userProjects", up),
                        Restrictions.isNull("disableDate"),
                        Restrictions.eq("tags.type", "quota")
                )
        ).list();

        return tags;
    }

    public static Set<ProjectTags> getUserProjectRoles(UserProjects up) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectUserRoles.class).createAlias("projectTags", "tags");

        List<ProjectUserRoles> userprojectroles = (List<ProjectUserRoles>) criteria.add(Restrictions.and(
                Restrictions.eq("userProjects", up),
                Restrictions.isNull("disableDate"),
                Restrictions.eq("tags.type", "role")
            )
        ).list();

        Logger.debug("GOT ROLES : " + userprojectroles);
        Set<ProjectTags> roles = new HashSet(extract(userprojectroles, on(ProjectUserRoles.class).getProjectTags()));
        Logger.debug("GOT A ROLES : " + roles);

        return roles;
    }



    public static ProjectProviders createProjectProvider(Long projectId, User u,    JSONObject provider) {

        String name = provider.getString("name");
        String apikey = provider.getString("apikey");
        String secretkey = provider.getString("secretkey");
        String type = provider.getString("type");
        String tag = provider.getString("tag").trim();

        ProjectProviders prov  = new ProjectProviders();
        prov.setName(name);
        prov.setApikey(apikey);
        prov.setSecretkey(secretkey);
        prov.setType(type);

        Project p = getProject(projectId, u);

        if (tag != null) {
            ProjectProvidersTags providerTags = new ProjectProvidersTags();
            providerTags.setProjectTags(ProjectTagsImpl.getOrCreateTags(p, tag, TagConstants.PROVIDER));
            prov.setTag(providerTags);
        }

        prov.setProject(p);

        Session s = (Session)HibernateSessionFactory.getSession();
        s.save(prov);
        return prov;
    }


    public static Project getProjectInfo(Long projectId, User u) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);
        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                        Restrictions.eq("user", u),
                        Restrictions.eq("project.id", projectId)
        )).uniqueResult();


        Project p = userProject.getProject();

        return p;
    }




    //TODO: Check that the end-user have proper role to execute this operation...
    public static ProjectProviders updateCloudProvider(Long projectId, Long providerId, User u, JSONObject updatedCloudProvider) {
        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                Restrictions.eq("user", u),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();



        List<ProjectProviders> ll = select(userProject.getProject().getProviders(), having(on(ProjectProviders.class).getId(), equalTo(providerId)));
        if (ll.size() == 1) {
            //Ok great we have it.. lets deactivate it..
            ProjectProviders provider = ll.get(0);

            provider.setName(updatedCloudProvider.getString("name"));
            provider.setApikey(updatedCloudProvider.getString("apikey"));

            //we do not update the API Cloud Provider Type they should delete / recreate one...

            if (updatedCloudProvider.has("secretkey")) {
                if (updatedCloudProvider.getString("secretkey").trim().compareTo("") != 0) {
                    if (updatedCloudProvider.getString("secretkey").trim().compareTo("null") != 0) {
                        provider.setSecretkey(updatedCloudProvider.getString("secretkey").trim());
                    }
                }
            }


            String newProviderTag = updatedCloudProvider.getString("tag").trim();

            if (provider.getTag() == null) {
                //must set the new one...
                //provider.getTag().disable();
                ProjectProvidersTags providerTags = new ProjectProvidersTags();
                providerTags.setProjectTags(ProjectTagsImpl.getOrCreateTags(userProject.getProject(), newProviderTag , TagConstants.PROVIDER));
                provider.setTag(providerTags);
            } else {
                if (provider.getTag().compareTo(newProviderTag) != 0) {
                    //must set the new one...
                    ProjectProvidersTags providerTags = new ProjectProvidersTags();
                    providerTags.setProjectTags(ProjectTagsImpl.getOrCreateTags(userProject.getProject(), newProviderTag, TagConstants.PROVIDER));
                    provider.setTag(providerTags);
                }
            }


            if (updatedCloudProvider.containsKey("tags")) {
                JSONArray listOfTags = updatedCloudProvider.getJSONArray("tags");

                final Set<ProjectProvidersQuotaTags> tags = provider.getTags();
                Set<ProjectProvidersQuotaTags> newTags = new HashSet<ProjectProvidersQuotaTags>();

                for(ProjectProvidersQuotaTags tag:tags) {
                    tag.disable();
                }

                int len = listOfTags.size();
                for (int i = 0; i < len ; i++) {
                    JSONObject jsoData = listOfTags.getJSONObject(i);
                    String data = jsoData.getString("name");

                    List<ProjectProvidersQuotaTags> foundItem = select(tags, having(on(ProjectProvidersQuotaTags.class).getName(), equalTo(data)));

                    ProjectProvidersQuotaTags projectProviderQuotaTag = null;
                    if (foundItem.size() == 1) {
                        //We found it..
                        projectProviderQuotaTag = foundItem.get(0);
                    } else {
                        //This tag is not in this object yet.
                        projectProviderQuotaTag = new ProjectProvidersQuotaTags();
                    }
                    projectProviderQuotaTag.setProjectTags(ProjectTagsImpl.getOrCreateTags(userProject.getProject(), data, TagConstants.QUOTA));
                    projectProviderQuotaTag.enable();

                    tags.add(projectProviderQuotaTag);
                    s.saveOrUpdate(projectProviderQuotaTag);
                    newTags.add(projectProviderQuotaTag);
                }

                //Set the new Tags
                provider.setTags(tags);

                s.saveOrUpdate(provider);

                //Since we disabled all data now.. lets return the object.
                provider.setTags(newTags);




                //Do not return the provider object as someone will potentially call "save on the object"
                return provider;//ProjectsHelpers.getProjectProvidersAsJson(provider);
            }
        }

        return null;
    }






    public static boolean deleteCloudProvider(Long projectId, Long providerId, User u) {
        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                Restrictions.eq("user", u),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();



        //TODO: Check that the end-user have proper role to execute this operation...
        List<ProjectProviders> ll = select(userProject.getProject().getProviders(), having(on(ProjectProviders.class).getId(), equalTo(providerId)));
        if (ll.size() == 1) {
            //Ok great we have it.. lets deactivate it.. only if no devices is assinged...
            ProjectProviders prov = ll.get(0);

            List<ProjectDevices> activeDevices = (List<ProjectDevices>) criteria.add(Restrictions.and(
                    Restrictions.eq("providers", prov ),
                    Restrictions.eq("project.id", projectId)
            )).list();

            //ONly if no devices...
            if (activeDevices == null || activeDevices.size()<=0) {
                prov.disable();
                s.saveOrUpdate(prov);
                return true;
            }
        }

        return false;
    }



    public static UserProjects getUserProject(Long projectId, User u) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                Restrictions.eq("user", u),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();

        return userProject;
    }

    public static UserProjects getUserProject(Long projectId, Long userId) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserProjects.class);

        Logger.debug("USER PROJECT AAA");

        /* need to investigate*/
        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                Restrictions.eq("user.id", userId),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();
        Logger.debug("USER PROJECT BB");

        /*
        List<UserProjects> userProject = (List<UserProjects>) criteria.add(Restrictions.and(
                Restrictions.eq("project.id", projectId)
        )).list();

        UserProjects up = null;
        Iterator<UserProjects> itr = userProject.iterator();
        while(itr.hasNext() && up == null) {
            UserProjects tmpUp = itr.next();
            if (tmpUp.getUser().getId().longValue() == userId) {
                up = tmpUp;
            }

        }

*/
        return userProject;
    }

    public static ProjectUserRoles createProjectAsAdmin(Project p, User u) {

        Logger.debug("Will create userProjectsRole...");
        ProjectUserRoles upr = new ProjectUserRoles();
        p.setPartner(u.getPartner());
        Session s = (Session)HibernateSessionFactory.getSession();
        try {
            s.save(p);

            //upr.setUser(u);
            upr.setProjectTags(ProjectTagsImpl.getOrCreateTags(p, RoleConstants.PRJOECT_ADMIN, TagConstants.ROLE));


            //p.addUserProjectRole(upr);
            upr.setUser(u);

            Logger.debug("Will create user...");

            UserProjects up = new UserProjects();
            up.setProject(p);
            up.setUser(u);
            up.addRole(upr);

            p.addUserProject(up);

            s.save(p);
            s.save(up);
            s.save(upr);

            s.saveOrUpdate(upr);
        } catch (Exception ee) {
            ee.printStackTrace();;
            //System.exit(0);
        } finally {
        }

        return upr;
    }

    public static Project save(Project p) {
        Session s = (Session)HibernateSessionFactory.getSession();
        s.save(p);
        return p;
    }



    /* Quotas */



    public static ProjectQuota createProjectQuota(Long projectId, User u, JSONObject data) {

        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                Restrictions.eq("user", u),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();


        //TODO: Check that the end-user have proper role to execute this operation...
        if (userProject != null) {
            //Ok great we have access to this project lets add the new quota..


            ProjectQuota quota = new ProjectQuota();

            ProjectTags projectTags = ProjectTagsImpl.getOrCreateTags(userProject.getProject(), data.getString("name"), TagConstants.QUOTA);

            quota.setProjectTags(projectTags);
            quota.setComputeLimit(data.getInt("compute"));
            quota.setProjects(userProject.getProject());

            if (userProject.getProject().addQuota(quota)) {
                s.saveOrUpdate(userProject);
                s.saveOrUpdate(quota);

                return quota;
            }
        }

        //p.getProviders();

        return null;
    }


    public static ProjectQuota updateProjectQuota(Long projectId, Long quotaId, User u, JSONObject jsoData) {
        Session s = (Session) HibernateSessionFactory.getSession();

        if (jsoData.has("id")) {
            if (jsoData.getLong("id") != quotaId) {
                return null;
            }
        }
        UserProjects userProject = getUserProject(projectId, u);

        //TODO: Check that the end-user have proper role to execute the delete operation on this object...
        Set<ProjectQuota> projectQuota = userProject.getProject().getQuotas();

        List<ProjectQuota> lst = select(projectQuota,
                having(on(ProjectQuota.class).getId(),
                        equalTo(quotaId)));
        if (lst.size() == 1) {
            //Disable the object


            ProjectTags projectTags = ProjectTagsImpl.getOrCreateTags(userProject.getProject(), jsoData.getString("name"), TagConstants.QUOTA);

            lst.get(0).setProjectTags(projectTags);


            lst.get(0).setComputeLimit(jsoData.getInt("compute"));
            return lst.get(0);
        }

        return null;
    }

    public static boolean deleteProjectQuota(Long projectId, Long quotaId, User u) {
        Session s = (Session) HibernateSessionFactory.getSession();

        UserProjects userProject = getUserProject(projectId, u);

        //TODO: Check that the end-user have proper role to execute the delete operation on this object...
        Set<ProjectQuota> projectQuota = userProject.getProject().getQuotas();

        List<ProjectQuota> lst = select(projectQuota,
                having(on(ProjectQuota.class).getId(),
                        equalTo(quotaId)));
        if (lst.size() == 1) {
            //Disable the object
            lst.get(0).disable();
            return true;
        }

        return false;
    }



    /* Users */

    public static ProjectQuota createProjectUser(Long projectId, User u, JSONObject data) {

        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = (UserProjects) criteria.add(Restrictions.and(
                Restrictions.eq("user", u),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();


        //TODO: Check that the end-user have proper role to execute this operation...
        if (userProject != null) {
            //Ok great we have access to this project lets add the new quota..


            ProjectQuota quota = new ProjectQuota();

            ProjectTags projectTags = ProjectTagsImpl.getOrCreateTags(userProject.getProject(), data.getString("name"), TagConstants.QUOTA);

            quota.setProjectTags(projectTags);

            quota.setComputeLimit(data.getInt("compute"));
            quota.setProjects(userProject.getProject());

            if (userProject.getProject().addQuota(quota)) {
                s.saveOrUpdate(userProject);
                s.saveOrUpdate(quota);

                return quota;
            }
        }

        //p.getProviders();

        return null;
    }


    public static String updateProjectUser(Long projectId, Long userId, User u, JSONObject userData) {
        Session s = (Session) HibernateSessionFactory.getSession();

        Logger.debug("UpdatePrjoectUser.... start");
        UserProjects userProject = getUserProject(projectId, userId);

        User userToUpdate = userProject.getUser();



        //final Set<ProjectTags> tags = userToUpdate.getTags(projectId);
        Logger.debug("UpdatePrjoectUser.... userToUpdate " + userToUpdate);
        if (userToUpdate!= null) {
            Logger.debug("UpdatePrjoectUser.... userToUpdate GOOD " + userData);
            boolean updated = false;
            if (userData.containsKey("tags")) {
                final Set<ProjectUserTags> tags = userProject.getTags();
                JSONArray listOfTags = userData.getJSONArray("tags");

                Set<ProjectUserTags> newTags = new HashSet<ProjectUserTags>();

                for (ProjectUserTags tag : tags) {
                    tag.disable();
                }

                int len = listOfTags.size();
                for (int i = 0; i < len; i++) {
                    JSONObject jsoData = listOfTags.getJSONObject(i);
                    String data = jsoData.getString("name");

                    List<ProjectUserTags> foundItem = select(tags, having(on(ProjectUserTags.class).getName(), equalTo(data)));

                    ProjectUserTags projectUserTag = null;
                    if (foundItem.size() == 1) {
                        //We found it..
                        projectUserTag = foundItem.get(0);
                    } else {
                        //This tag is not in this object yet.
                        projectUserTag = new ProjectUserTags();
                        projectUserTag.setUser(userToUpdate);
                    }
                    projectUserTag.setProjectTags(ProjectTagsImpl.getOrCreateTags(userProject.getProject(), data, TagConstants.QUOTA));
                    projectUserTag.enable();

                    tags.add(projectUserTag);
                    s.saveOrUpdate(projectUserTag);
                    newTags.add(projectUserTag);
                }

                //Set the new Tags
                updated = true;
                //not usre why we have to do this.. the other setTag should of worked
                for (ProjectUserTags tag : tags) {
                    if (tag.isDisabled()) {
                        s.update(tag);
                    }
                }
                userProject.setTags(tags);
                s.saveOrUpdate(userToUpdate);

                //Since we disabled all data now.. lets return the object.
                userProject.setTags(newTags);
            }

            Logger.debug("USER DATA ROLES");
            if (userData.containsKey("roles")) {
                Logger.debug("USER DATA ROLES EXISTED");
                final Set<ProjectUserRoles> roles = userProject.getAllRoles();
                JSONArray lsitOfRoles = userData.getJSONArray("roles");

                Set<ProjectUserRoles> newRoles = new HashSet<ProjectUserRoles>();

                Logger.debug("ALL ROLES IS : " + roles);
                for (ProjectUserRoles role : roles) {
                    Logger.debug("DISABLING ROLE OF " + role);
                    role.disable();
                }

                int len = lsitOfRoles.size();
                for (int i = 0; i < len; i++) {
                    JSONObject jsoData = lsitOfRoles.getJSONObject(i);
                    String data = jsoData.getString("name");

                    List<ProjectUserRoles> foundItem = select(roles, having(on(ProjectUserRoles.class).getName(), equalTo(data)));

                    ProjectUserRoles projectUserRole = null;
                    if (foundItem.size() == 1) {
                        //We found it..
                        projectUserRole = foundItem.get(0);
                    } else {
                        //This tag is not in this object yet.
                        projectUserRole = new ProjectUserRoles();
                        projectUserRole.setUser(userToUpdate);
                    }
                    projectUserRole.setProjectTags(ProjectTagsImpl.getOrCreateTags(userProject.getProject(), data, TagConstants.ROLE));
                    projectUserRole.enable();

                    roles.add(projectUserRole);
                    s.saveOrUpdate(projectUserRole);
                    newRoles.add(projectUserRole);
                }

                //Set the new Tags
                updated = true;
                for (ProjectUserRoles role : roles) {
                    Logger.debug("VALIDATE IF ROLE : " + role + " is disabled : " + role.isDisabled());
                    if (role.isDisabled()) {
                        Logger.debug("SAVE OR UPDATE IF ROLE : " + role + " is disabled : " + role.isDisabled());
                        s.saveOrUpdate(role);
                    }
                }

                userProject.setAllRoles(roles);

                //Save all disabled roles...
                Logger.debug("SAVING ALLROLES");
                s.saveOrUpdate(userToUpdate);

                //Since we disabled all data now.. lets return the object.
                Logger.debug("USER PROJECT SET NEW ROLES OF : " + newRoles);
                userProject.setAllRoles(newRoles);
            }



            if (updated) {
                s.update(userToUpdate);
            }

            //Do not return the provider object as someone will potentially call "save on the object"

            //TODO: This shouldn't call ProjectsHelpers

            return ProjectsHelpers.getInstance().getUserWithRolesAsJson(userProject, u);
        }

        return null;
    }

    public static boolean deleteProjectUser(Long projectId, Long userId) throws Exception {
        try {
            Session s = (Session) HibernateSessionFactory.getSession();

            //TODO: Should check if we are the last of this proejct if so tell user to
            //delete the project instead..
            /*if (userId == u.getId()) {
                throw new Exception("CANNOT_REMOVE_YOURSELF_FROM_PROJECT");
            }*/

            Logger.debug("GET USER PROJECT...");
            UserProjects userProject = getUserProject(projectId, userId);

            if (! userProject.isDisabled()) {
                userProject.disable();

                s.update(userProject);

                return true;
            }

            return false;
        } catch (Exception eee) {
            eee.printStackTrace();
        }
        return false;
    }

    /* Invite Project User */
    public static String inviteResponseProjectUser(Long projectId, User u, String inviteId, JSONObject data) throws DAOException {
        Session s = (Session) HibernateSessionFactory.getSession();



        UserProjects userProject = getUserProject(projectId, u);

        //TODO: Check that the end-user have proper role to execute this operation...
        if (userProject != null) {
            //Ok great we have access to this project lets invite the new user...

            //Do we have an invite ?
            if (userProject.getInviteToken() == null) {
                return null;
            }

            if ( ! (userProject.getInviteToken().compareTo(inviteId) == 0) ) {
                return null;
            }

            //Ok we have the smae invite token... what about acceptance?

            Logger.debug("aaaaaaa : " + data.getString("action"));
            if (data.getString("action").compareTo("accept") == 0) {
                userProject.setInviteToken(null);
                return "true";
            } else {
                //Ok lets delete the invite.... (we should trace it / log maybe ?)
                userProject.disable();
                s.update(userProject);
                return "false";
            }
        }
        return null;
    }

    public static String inviteProjectUser(Long projectId, User u, JSONObject data) throws DAOException {

        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(UserProjects.class);

        UserProjects userProject = getUserProject(projectId, u);

        //TODO: Check that the end-user have proper role to execute this operation...
        if (userProject != null) {
            //Ok great we have access to this project lets invite the new user...

            User invitedUser = UserImpl.getOrCreateUserByEmail(data.getString("email"));

            if (invitedUser != null) {
                UserProjects uProject = new UserProjects();
                uProject.setProject(userProject.getProject());
                uProject.setUser(invitedUser);
                uProject.setInviteToken(UUID.randomUUID().toString().replaceAll("-", ""));

                userProject.getProject().addUserProject(uProject);
                s.saveOrUpdate(uProject);

                //TODO: Refactor so this doens't use ProjectsHelpers..... DAO Shouldn't call ProjectHelpers..
                return ProjectsHelpers.getInstance().getUserWithRolesAsJson(uProject, u);
            }
        }

        //p.getProviders();

        return null;
    }

    public static Set<ProjectProviders> getCloudProviders(Long projectId) {
        Subject currUser = SecurityController.getSubject();
        //TODO: Checke that user have access to this project using the shiro currentUser object (hasPermission.. type of thing)
        User u = SecurityController.getUser();
        Logger.debug("getCloudProvider USER IS : " + u);
        Logger.debug("getCloudProvider ProjectId is : " + projectId);
        Logger.debug("getCloudProvider USER IS : " + u.getEmail());
        UserProjects lstUserProjects = getUserProject(projectId, u);
        Set<ProjectProviders> lstProviders = lstUserProjects.getProject().getProviders();
        return lstProviders;

    }


    public static List<DropletImage> getAvailableImages(Long projectId, Long providerId) {

        return null;
    }

    public static ProjectProviders getCloudProvider(Long projectId, Long providerId) {
        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(ProjectProviders.class);

        ProjectProviders provider = (ProjectProviders) criteria.add(Restrictions.and(
                Restrictions.eq("id", providerId),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();

        return provider;
    }

    public static ProjectSshKey addProjectSSHKey(Long projectId, JSONObject jsonData) {
        Session s = (Session) HibernateSessionFactory.getSession();

        //TODO: Validate that currentUser can add keys... to this project...
        //TODO: Validate that the key does not already exists ?

        Subject currUser = SecurityController.getSubject();
        User u = (User) SecurityController.getUser();

        Project p = getProject(projectId, u);

        ProjectSshKey sshKey = new ProjectSshKey();
        sshKey.setProjects(p);
        sshKey.setName(jsonData.getString("name"));
        sshKey.setProjectTags(ProjectTagsImpl.getOrCreateTags(p, jsonData.getString("tag"), TagConstants.KEY));
        sshKey.setPublicKey(jsonData.getString("publickey"));

        s.saveOrUpdate(sshKey);
        return sshKey;
    }

    public static Set<ProjectTags> getProjectTags(UserProjects uproject) {
        Set<ProjectTags> projectTags = new HashSet<ProjectTags>();
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectTags.class);

        List<ProjectTags> lstTags = (List<ProjectTags>) criteria.add(Restrictions.and(
                Restrictions.eq("project", uproject.getProject())
        )).list();

        return new HashSet(lstTags);
    }

    public static ProjectSshKey getProjectSshKey(Long projectId, Long sshKeyId) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectSshKey.class);

        ProjectSshKey sshKey = (ProjectSshKey) criteria.add(Restrictions.and(
                Restrictions.eq("projects.id", projectId),
                Restrictions.eq("id", sshKeyId)
        )).uniqueResult();

        return sshKey;
    }

    public static boolean deleteProjectSSHKey(Long projectId, Long sshKeyId) {

        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectSshKey.class);

        ProjectSshKey sshKey = (ProjectSshKey) criteria.add(Restrictions.and(
                Restrictions.eq("projects.id", projectId),
                Restrictions.eq("id", sshKeyId)
        )).uniqueResult();

        sshKey.disable();

        s.update(sshKey);

        return true;
    }

    public static ProjectSshKey updateProjectSSHKey(Long projectId, Long sshKeyId, JSONObject jsonData) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectSshKey.class);

        ProjectSshKey sshKey = (ProjectSshKey) criteria.add(Restrictions.and(
                Restrictions.eq("projects.id", projectId),
                Restrictions.eq("id", sshKeyId)
        )).uniqueResult();


        sshKey.setName(jsonData.getString("name"));
        sshKey.setProjectTags(ProjectTagsImpl.getOrCreateTags(sshKey.getProjects(), jsonData.getString("tag"), TagConstants.KEY));
        sshKey.setPublicKey(jsonData.getString("publickey"));

        s.update(sshKey);

        return sshKey;
    }


    public static ProjectTasks getProjectTaskById(Long projectId, Long taskId) {
        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectTasks.class);

        Logger.debug("get projects.id of : " + projectId);
        Logger.debug("get task.id of : " + taskId);
        ProjectTasks task = (ProjectTasks) criteria.add(Restrictions.and(
                Restrictions.eq("projects.id", projectId),
                Restrictions.eq("id", taskId)
        )).uniqueResult();

        Logger.debug("got : " + task);
        return task;
    }

    public static ProjectProviders getServerCloudProvider(Long projectId, Long serverId, User u) {
        Session s = (Session) HibernateSessionFactory.getSession();

        UserProjects up = getUserProject(projectId, u);

        Criteria criteria = s.createCriteria(ProjectDevices.class);
        ProjectDevices projectDevice = (ProjectDevices ) criteria.add(Restrictions.and(
                Restrictions.eq("project", up.getProject()),
                Restrictions.eq("id", serverId)
        )).uniqueResult();

        return projectDevice.getProviders();
    }

    public static ProjectProviders getProjectCloudProviderById(Long projectId, long providerId, User user) {
        Session s = (Session) HibernateSessionFactory.getSession();

        Criteria criteria = s.createCriteria(ProjectProviders.class);

        ProjectProviders provider = (ProjectProviders) criteria.add(Restrictions.and(
                Restrictions.eq("id", providerId),
                Restrictions.eq("project.id", projectId)
        )).uniqueResult();

        return provider;

    }
}


