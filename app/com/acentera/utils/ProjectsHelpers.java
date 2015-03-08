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

package com.acentera.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.myjeeva.digitalocean.DigitalOcean;
import com.myjeeva.digitalocean.exception.AccessDeniedException;
import com.myjeeva.digitalocean.exception.RequestUnsuccessfulException;
import com.myjeeva.digitalocean.exception.ResourceNotFoundException;
import com.myjeeva.digitalocean.impl.DigitalOceanClient;
import com.myjeeva.digitalocean.pojo.*;
import controllers.acentera.ACenterAController;
import controllers.acentera.SecurityController;
import models.db.*;
import models.db.acentera.constants.PermisionTagConstants;
import models.db.acentera.constants.PermissionActionConstats;
import models.db.acentera.constants.TagConstants;
import models.db.acentera.exceptions.DAOException;
import models.db.acentera.impl.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import play.Logger;
import utils.HibernateSessionFactory;
import utils.Utils;

import java.util.*;

import static ch.lambdaj.Lambda.having;
import static ch.lambdaj.Lambda.on;
import static ch.lambdaj.Lambda.select;
import static org.hamcrest.Matchers.equalTo;


public class ProjectsHelpers {


    protected static ProjectsHelpers _instance = null;

    protected ProjectsHelpers() {

    }
    public static ProjectsHelpers getInstance() {
        if (_instance == null) {
            synchronized(ProjectsHelpers.class) {
                if (_instance == null) {
                    _instance = new ProjectsHelpers();
                }

            }
        }
        return _instance;
    }

    public static JSONObject getServerByProject(Long projectId, Long acenteraId) {

        //SecurityUtils.getSubject()
        SecurityController.checkPermission(projectId);

        try {
            ProjectDevices projectDevice  = ProjectImpl.getProjectServer(projectId, acenteraId);

            if (!(SecurityController.isTagPermitted(projectId, projectDevice))) {
                return null;
            }

            ProjectProviders prov = projectDevice.getProviders();

            JSONObject res = new JSONObject();
            JSONArray jsoServersArray = new JSONArray();


            List<DropletImage> lstDropletImages = null;
            List<Region> lstRegions = null;
            List<DropletSize> lstSize = null;



                //TODO: Refactor to support more Cloud Providers....
                try {
                    DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

                    Droplet droplet = apiClient.getDropletInfo(Integer.valueOf(projectDevice.getExternalId()));

                    if (droplet != null) {
                        JSONObject jso = new JSONObject();

                        ObjectMapper mapper = new ObjectMapper();
                        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                        ObjectWriter ow = mapper.writer();


                        if (lstDropletImages == null) {
                            lstDropletImages = apiClient.getAvailableImages();
                        }
                        if (lstRegions == null) {
                            lstRegions= apiClient.getAvailableRegions();
                        }

                        if (lstSize == null) {
                            lstSize = apiClient.getAvailableSizes();
                        }


                        DropletImage dimage = null;
                        Iterator<DropletImage> itrImages = lstDropletImages.iterator();
                        while (dimage == null && itrImages.hasNext()) {
                            DropletImage img = itrImages.next();
                            if (img.getId().intValue() == droplet.getImageId().intValue()) {
                                dimage = img;
                            }
                        }


                        Region dregion = null;
                        Iterator<Region> itrRegions = lstRegions.iterator();
                        while (dregion == null && itrRegions.hasNext()) {
                            Region region  = itrRegions.next();
                            if (region.getId().intValue() ==  droplet.getRegionId().intValue()) {
                                dregion = region;
                            }
                        }

                        DropletSize dsize = null;
                        Iterator<DropletSize> itrSize = lstSize.iterator();
                        while (dsize == null && itrSize.hasNext()) {
                            DropletSize size = itrSize.next();
                            Logger.debug("COMPARE SIZE OF : " + size.getId() + " VS " + droplet.getSizeId());
                            if (size.getId().intValue() ==  droplet.getSizeId().intValue()) {
                                Logger.debug("COMPARE SIZE OF : " + size.getId() + " VS " + droplet.getSizeId() + " FOUND");
                                dsize = size;
                            }
                        }


                        JSONObject jsoDropletImage = JSONObject.fromObject(ow.writeValueAsString(droplet));

                        if (dimage != null) {
                            jsoDropletImage.put("image_distibution", dimage.getDistribution());
                            jsoDropletImage.put("image_name", dimage.getName());
                        }

                        if (dregion != null) {
                            jsoDropletImage.put("region_slug", dregion.getSlug());
                            jsoDropletImage.put("region_name", dregion.getName());
                        }

                        if (dsize != null){
                            jsoDropletImage.put("size", dsize);
                        }


                        jsoDropletImage.put("external_id", droplet.getId());
                        jsoDropletImage.put("type", projectDevice.getType());
                        jsoDropletImage.put("id", projectDevice.getId());
                        jsoDropletImage.put("provider", prov.getId());

                        Set<ProjectProvidersRegions> lstRegionsProvider = prov.getRegions();
                        Iterator<ProjectProvidersRegions> itrRegionsProviders = lstRegionsProvider.iterator();
                        ProjectProvidersRegions selectedRegion = null;
                        while(itrRegionsProviders.hasNext() && selectedRegion == null) {
                            ProjectProvidersRegions ppr = itrRegionsProviders.next();
                            if (ppr.getExtId() != null) {
                                if (ppr.getExtId().intValue() == droplet.getRegionId().intValue()) {
                                    selectedRegion = ppr;
                                }
                            }
                        }
                        if (selectedRegion != null) {
                            jsoDropletImage.put("provider_region", selectedRegion.getProjectRegions().getId());
                        }


                        //droplet.getRegionId()


                        //TODO: Can we edit ?
                        if (SecurityController.isPermitted(projectId, PermisionTagConstants.SERVER, projectDevice.getDevice().getId(), PermissionActionConstats.EDIT)) {
                            jsoDropletImage.put("canEdit", 1);
                        }

                        res.put("server", jsoDropletImage);
                    }


                } catch (Exception e) {
                    e.printStackTrace();

                }

            return res;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static JSONObject getServerByProjectAndUserAccess(Long projectId, String providerName, Long serverId) {

        //SecurityUtils.getSubject()

        try {

            Set<ProjectProviders> lstProviders = ProjectImpl.getCloudProviders(projectId);

            Iterator<ProjectProviders> itrProviders = lstProviders.iterator();
            JSONObject res = new JSONObject();
            JSONArray jsoServersArray = new JSONArray();


            List<DropletImage> lstDropletImages = null;
            List<Region> lstRegions = null;
            List<DropletSize> lstSize = null;

            while(itrProviders.hasNext()) {
                ProjectProviders prov = itrProviders.next();

                //TODO: Refactor to support more Cloud Providers....
                try {
                    Logger.debug("API KEY : " + prov.getApikey() + " and secret : " + prov.getSecretkey());
                    DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());


                    List<Droplet> lstDroplets = apiClient.getAvailableDroplets();

                    if (lstDroplets != null) {
                        JSONObject jso = new JSONObject();

                        ObjectMapper mapper = new ObjectMapper();
                        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                        ObjectWriter ow = mapper.writer();

                        //jsoServersArray.add(ow.writeValueAsString(lstDroplets));
                        for (int i = 0; i < lstDroplets.size(); i++) {
                            Droplet droplet = lstDroplets.get(i);

                            if (lstDropletImages == null) {
                                lstDropletImages = apiClient.getAvailableImages();
                            }
                            if (lstRegions == null) {
                                lstRegions= apiClient.getAvailableRegions();
                            }

                            if (lstSize == null) {
                                lstSize = apiClient.getAvailableSizes();
                            }


                            DropletImage dimage = null;
                            Iterator<DropletImage> itrImages = lstDropletImages.iterator();
                            while (dimage == null && itrImages.hasNext()) {
                                DropletImage img = itrImages.next();
                                if (img.getId().intValue() == droplet.getImageId().intValue()) {
                                    dimage = img;
                                }
                            }


                            Region dregion = null;
                            Iterator<Region> itrRegions = lstRegions.iterator();
                            while (dregion == null && itrRegions.hasNext()) {
                                Region region  = itrRegions.next();
                                if (region.getId().intValue() ==  droplet.getRegionId().intValue()) {
                                    dregion = region;
                                }
                            }

                            DropletSize dsize = null;
                            Iterator<DropletSize> itrSize = lstSize.iterator();
                            while (dsize == null && itrSize.hasNext()) {
                                DropletSize size = itrSize.next();
                                Logger.debug("COMPARE SIZE OF : " + size.getId() + " VS " + droplet.getSizeId());
                                if (size.getId().intValue() ==  droplet.getSizeId().intValue()) {
                                    Logger.debug("COMPARE SIZE OF : " + size.getId() + " VS " + droplet.getSizeId() + " FOUND");
                                    dsize = size;
                                }
                            }


                            JSONObject jsoDropletImage = JSONObject.fromObject(ow.writeValueAsString(droplet));

                            if (dimage != null) {
                                jsoDropletImage.put("image_distibution", dimage.getDistribution());
                                jsoDropletImage.put("image_name", dimage.getName());
                            }

                            if (dregion != null) {
                                jsoDropletImage.put("region_slug", dregion.getSlug());
                                jsoDropletImage.put("region_name", dregion.getName());
                            }

                            if (dsize != null){
                                jsoDropletImage.put("size", dsize);
                            }
                            jsoServersArray.add(jsoDropletImage);
                        }

                    } else {
                        //nothing
                    }

                    res.put("servers", jsoServersArray);
                } catch (Exception e) {
                    e.printStackTrace();

                }
            }
            //res.put("servers",jsoServersArray);
            return res;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static JSONObject getServersByProjectAndUserAccess(Long projectId, User user) {


        JSONObject res = new JSONObject();
        JSONArray jsoServersArray = new JSONArray();
        res.put("servers", jsoServersArray);
        try {
            //TODO: Take the one that match the selected api tags only (ie: have access to)
            Set<ProjectProviders> lstProviders = ProjectImpl.getCloudProviders(projectId);

            Iterator<ProjectProviders> itrProviders = lstProviders.iterator();


            Logger.debug("GOT PROVIDER : " + lstProviders);

            List<DropletImage> lstDropletImages = null;
            List<Region> lstRegions = null;
            List<DropletSize> lstSize = null;

            Project p = ProjectImpl.getProject(projectId, user);
            Set<ProjectDevices> deviceSet = DeviceImpl.getDevices(projectId);

            HashMap<String, ProjectDevices> devicesToReturn = new HashMap<String, ProjectDevices>();
            Set<Long> processedDevices = new HashSet<Long>();

            while(itrProviders.hasNext()) {
                ProjectProviders prov = itrProviders.next();

                //TODO: Refactor to support more Cloud Providers....
                try {
                    DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

                    List<Droplet> lstDroplets = apiClient.getAvailableDroplets();

                    if (lstDroplets != null) {
                        JSONObject jso = new JSONObject();

                        ObjectMapper mapper = new ObjectMapper();
                        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                        ObjectWriter ow = mapper.writer();

                        //jsoServersArray.add(ow.writeValueAsString(lstDroplets));
                        for (int i = 0; i < lstDroplets.size(); i++) {
                            Droplet droplet = lstDroplets.get(i);

                            if (lstDropletImages == null) {
                                lstDropletImages = apiClient.getAvailableImages();
                            }
                            if (lstRegions == null) {
                                lstRegions= apiClient.getAvailableRegions();
                            }

                            if (lstSize == null) {
                                lstSize = apiClient.getAvailableSizes();
                            }


                            DropletImage dimage = null;
                            Iterator<DropletImage> itrImages = lstDropletImages.iterator();
                            while (dimage == null && itrImages.hasNext()) {
                                DropletImage img = itrImages.next();
                                if (img.getId().intValue() == droplet.getImageId().intValue()) {
                                    dimage = img;
                                }
                            }


                            Region dregion = null;
                            Iterator<Region> itrRegions = lstRegions.iterator();
                            while (dregion == null && itrRegions.hasNext()) {
                                Region region  = itrRegions.next();
                                if (region.getId().intValue() ==  droplet.getRegionId().intValue()) {
                                    dregion = region;
                                }
                            }

                            DropletSize dsize = null;
                            Iterator<DropletSize> itrSize = lstSize.iterator();
                            while (dsize == null && itrSize.hasNext()) {
                                DropletSize size = itrSize.next();
                                Logger.debug("COMPARE SIZE OF : " + size.getId() + " VS " + droplet.getSizeId());
                                if (size.getId().intValue() ==  droplet.getSizeId().intValue()) {
                                    Logger.debug("COMPARE SIZE OF : " + size.getId() + " VS " + droplet.getSizeId() + " FOUND");
                                    dsize = size;
                                }
                            }



                            ProjectDevices deviceInProjectMapping = null;
                            Iterator<ProjectDevices> itrDevices = deviceSet.iterator();
                            while(itrDevices.hasNext() && deviceInProjectMapping == null) {
                                ProjectDevices pd = itrDevices.next();
                                //Try to find a device that matches the current one we are looking at..
                                if (((pd.getExternalId().compareTo(String.valueOf(droplet.getId())) == 0) && (pd.getProviders().getType().compareToIgnoreCase(prov.getType()) == 0) )) {
                                    deviceInProjectMapping = pd;
                                }
                            }


                            if (deviceInProjectMapping == null) {
                                //Device does not exists...
                                //Lets create a Generic GUID and also save the mapping...

                                //First create a Device
                                //Currently the framework doesn't automatically import data..
                                /*
                                Device dev = new Device();
                                dev.setProject(p);
                                dev.setPartner_id(user.getProject_id());
                                dev.setGUID(Utils.getUniqueGUID());
                                dev.setSalt(Utils.getRandomSalt());

                                ProjectDevices projectDevice = new ProjectDevices();
                                projectDevice.setDevice(dev);
                                projectDevice.setProject(p);
                                projectDevice.setExternalId( String.valueOf(droplet.getId()));
                                projectDevice.setProviders(prov);

                                DAO.save(dev);
                                DAO.save(projectDevice);
                                deviceInProjectMapping = projectDevice;
                                */
                            }

                            Logger.debug("deviceInProjectMapping");
                            if (deviceInProjectMapping != null) {
                                JSONObject jsoDroplet = JSONObject.fromObject(ow.writeValueAsString(droplet));

                                if (dimage != null) {
                                    jsoDroplet.put("image_distibution", dimage.getDistribution());
                                    jsoDroplet.put("image_name", dimage.getName());
                                }

                                if (dregion != null) {
                                    jsoDroplet.put("region_slug", dregion.getSlug());
                                    jsoDroplet.put("region_name", dregion.getName());
                                }

                                if (dsize != null) {
                                    jsoDroplet.put("size", dsize);
                                }
                                ////jsoDroplet.put("acenteraid", deviceInProjectMapping.getDevice().getId());
                                jsoDroplet.put("acenteraid", deviceInProjectMapping.getId());

                                Logger.debug("deviceInProjectMapping acenteraid " + deviceInProjectMapping.getId());
                                jsoDroplet.put("external_id", droplet.getId());
                                jsoDroplet.put("id", deviceInProjectMapping.getId());
                                jsoDroplet.put("type", deviceInProjectMapping.getType());
                                deviceInProjectMapping.getDevice().setDropletInfo(jsoDroplet);

                                devicesToReturn.put(droplet.getId() + "_" + prov.getId(), deviceInProjectMapping);
                            }

                        }

                    } else {
                        //nothing
                    }

                    //CHeck if all the api returned all the values... (what about api that we deleted??)
                    Iterator<ProjectDevices> itrDevices = deviceSet.iterator();
                    Logger.debug("GOT ProjectDevices  ??? ");
                    while(itrDevices.hasNext()) {
                        ProjectDevices pd = itrDevices.next();
                        Logger.debug("GOT ProjectDevices : " + pd);
                        String key = pd.getExternalId() + "_" + pd.getProviders().getId();
                        if (! (devicesToReturn.containsKey(key) ) ) {
                            //Device not found lets add

                            //We must get the JSONValue...
                            devicesToReturn.put(key, pd);
                        }
                    }

                    //At this point deviceTOReturn contains all of the entries...

                    Logger.debug("deviceTOReturn ProjectDevices  ??? ");
                    Iterator<Map.Entry<String, ProjectDevices>> itrResponse = devicesToReturn.entrySet().iterator();
                    while(itrResponse.hasNext()) {
                        Map.Entry<String, ProjectDevices> item = itrResponse.next();
                        Logger.debug("deviceTOReturn ProjectDevices  : " + item.getValue());
                        Logger.debug("deviceTOReturn ProjectDevices  Device : " + item.getValue().getDevice());
                        Logger.debug("deviceTOReturn ProjectDevices  Device getDropletInfo : " + item.getValue().getDevice().getDropletInfo());
                        if (item.getValue().getDevice().getDropletInfo().has("id")) {
                            if (!(processedDevices.contains(item.getValue().getDevice().getId()))) {
                                processedDevices.add(item.getValue().getDevice().getId());
                                jsoServersArray.add(item.getValue().getDevice().getDropletInfo());
                            }
                        }
                    }

                    Logger.debug("deviceInProjectMapping REGURNING OF : " + jsoServersArray);
                    res.put("servers", jsoServersArray);
                } catch (Exception e) {
                    e.printStackTrace();

                }
            }
            //res.put("servers",jsoServersArray);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    public String getUserWithRolesAsJson(UserProjects uproject, User currentUser) {

        //TODO: Does currentUser have access to read this user information for this project ?


        //String projectAsJson = g.toJson(p);
        JSONObject jso = new JSONObject();

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();

        try {
            Set<ProjectTags> projectTags = new HashSet<ProjectTags>();
            projectTags  = ProjectImpl.getProjectTags(uproject);

            //jsoProject.put("user", lstUsers);
            JSONArray jsoProjectUserArray = new JSONArray();
            JSONArray jsoUserArray = new JSONArray();
            Project p = uproject.getProject();

            JSONArray jsoProjectIdArray = new JSONArray();
            jsoProjectIdArray.add(p.getId());

                User projectUser = uproject.getUser();
                jsoProjectUserArray.add(projectUser.getId());
                JSONObject jsoUser = JSONObject.fromObject(mapper.writeValueAsString(projectUser));

                jsoUser.put("projects", jsoProjectIdArray);
                jsoUser.put("project_id", p.getId());


                //Get the User Roles infos
                JSONArray jsRolesArray = new JSONArray();
                Set<ProjectTags> roles = ProjectImpl.getUserProjectRoles(uproject);
                Iterator<ProjectTags> itrRoles = roles.iterator();
                while(itrRoles.hasNext()) {
                    ProjectTags userProjectRole = itrRoles.next();
                    JSONObject role = JSONObject.fromObject(ow.writeValueAsString(userProjectRole));
                    jsRolesArray.add(role);
                }

                jsoUser.put("roles", jsRolesArray);


                jsoUserArray.add(jsoUser);

                jso.put("users", jsoUserArray);

                Set<ProjectQuota> s = p.getQuotas();
                if ((s != null) && (s.size() > 0)) {
                    jso.put("quotas", mapper.writeValueAsString(s));
                }

                Set<ProjectProviders> lstProviders = p.getProviders();
                if ((lstProviders != null) && (lstProviders.size() > 0)) {

                        Set<ProjectProviders> userAccessProviders = new HashSet<ProjectProviders>();
                        Iterator<ProjectProviders> itrProjectProviders = lstProviders.iterator();
                        while(itrProjectProviders.hasNext()) {
                            ProjectProviders pr = itrProjectProviders.next();
                            if (SecurityController.isPermitted(p, pr)) {
                                userAccessProviders.add(pr);
                            }
                        }

                    jso.put("providers", mapper.writeValueAsString(userAccessProviders));
                }


                Set<ProjectSshKey> lstKeys = p.getSshKeys();
                if ((lstKeys != null) && (lstKeys.size() > 0)) {
                    Iterator<ProjectSshKey> itrKeys = lstKeys.iterator();
                    JSONArray jsoKeys = new JSONArray();
                    while (itrKeys.hasNext() ) {
                        ProjectSshKey sshKey = itrKeys.next();

                        if (SecurityController.isPermitted(p, sshKey)) {
                            jsoKeys.add(mapper.writeValueAsString(sshKey));
                        }

                    }
                    jso.put("sshkeys", jsoKeys);
                }

                jsoUser.put("tags", mapper.writeValueAsString(projectTags));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return jso.toString();
    }

    public static String getProjectProvidersAsJson(ProjectProviders prov) {


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);


        ObjectWriter ow = mapper.writer();
        JSONObject jso = new JSONObject();
        try {
            Logger.debug("PROVIDER IS : " + prov.getId());
            jso.put("provider", ow.writeValueAsString(prov));
            return jso.toString();
        } catch (JsonProcessingException e) {
           e.printStackTrace();
           return null;
        }

    }


    public static JSONObject getAvailableProjectsAsJson(User user) throws Exception {
        List<UserProjects> lst = ProjectImpl.getProjectForUser(user);
        Logger.debug("GET PROJECTS getAvailableProjectsAsJson...." + user.getId());
        //SecurityController.checkPermission()
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();

        JSONObject res = new JSONObject();
        try {
            Iterator<UserProjects> itr =  lst.iterator();
            JSONArray jsarrProject = new JSONArray();
            while(itr.hasNext()) {
                UserProjects up = itr.next();

                Logger.debug("GET PROJECTS getAvailableProjectsAsJson.   up is : " + up + " id : " + up.getId() + " project id : " +up.getProjectId());
                if (SecurityController.canViewProject(up) || (up.getInviteToken() != null)) {
                    Logger.debug("GET PROJECTS getAvailableProjectsAsJson.   GOOOOD");
                    Project p = up.getProject();
                    JSONObject jsoProject = new JSONObject();
                    jsoProject.put("id", p.getId());
                    jsoProject.put("name", p.getName());

                    if (up.getInviteToken() != null) {
                        jsoProject.put("type", "invited");
                        jsoProject.put("invitetoken", up.getInviteToken());
                    } else {
                        jsoProject.put("type", "accepted");
                    }

                    jsarrProject.add(jsoProject);
                } else {
                    Logger.debug("GET PROJECTS getAvailableProjectsAsJson.   FALLLLSE");
                }
            }
            res.put("projects", jsarrProject);
        } catch (Exception ee) {
            ee.printStackTrace();
            res.put("projects", new JSONArray());
        }

        return res;
    }

    public static  JSONObject getProjectsAsJson(Project projects) {
        //Make sure to do an hibernate commit before we get the projectasjson..
        if (SecurityController.canViewProject(projects.getId())) {

            Gson g = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
            Set<ProjectProviders> providers = projects.getProviders();
            String projectAsJson = g.toJson(projects);

            JSONObject res = new JSONObject();
            res.put("projects", projectAsJson);


                res.getJSONObject("projects").put("created_just_now",1);

            return res;
        } else {
            JSONObject res = new JSONObject();
            res.put("projects", new JSONObject());
            return res;
        }
    }


    public String getUserProjectWithRolesAsJson(Project p, User u) {

        SecurityController.getSubject().checkPermission("project:" + p.getId() + ":view");


        //String projectAsJson = g.toJson(p);
        JSONObject jso = new JSONObject();

        UserProjects uproject = ProjectImpl.getUserProject(p.getId(), u);

        List<UserProjects> lstUsers = ProjectImpl.getUsersForProject(p);


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();



        try {
            jso.put("project", ow.writeValueAsString(p));
            JSONObject jsoProject = jso.getJSONObject("project");
            jsoProject.put("invitetoken", uproject.getInviteToken());

            //Get the current user roles for this project...
            JSONArray jsRolesArray = new JSONArray();
            Set<ProjectTags> roles = ProjectImpl.getUserProjectRoles(uproject);
            Logger.debug("GOR ROLES : " + roles);
            Iterator<ProjectTags> itrRoles = roles.iterator();
            while(itrRoles.hasNext()) {
                ProjectTags userProjectRole = itrRoles.next();
                JSONObject role = JSONObject.fromObject(ow.writeValueAsString(userProjectRole));
                jsRolesArray.add(role);
                jsoProject.put(userProjectRole.getName(), 1);
            }




            //jsoProject.put("user", lstUsers);
            JSONArray jsoProjectUserArray = new JSONArray();
            JSONArray jsoUserArray = new JSONArray();
            Iterator <UserProjects> up = lstUsers.iterator();
            JSONArray jsoProjectIdArray = new JSONArray();
            jsoProjectIdArray.add(p.getId());

            Set<User> proessedUsers = new HashSet<User>();

            Logger.debug("ALL USERS : " + lstUsers);


            Set<ProjectTags> projectTags = new HashSet<ProjectTags>();
            projectTags  = ProjectImpl.getProjectTags(uproject);





            if (SecurityController.getSubject().isPermitted("project:" + p.getId() + ":user:view")) {
                while (up.hasNext()) {
                    UserProjects userProject = up.next();
                    if (SecurityController.getSubject().isPermitted("project:" + p.getId() + ":user:view:" + userProject.getId())) {

                        //TOOD: If user can view this user otherwise continue.. (we must make sure project.users : [ ID's match only the one we can view ]

                        User projectUser = userProject.getUser();
                        Logger.debug("WILL INSERT.. " + projectUser.getEmail());


                        jsoProjectUserArray.add(projectUser.getId());
                        JSONObject jsoUser = JSONObject.fromObject(mapper.writeValueAsString(projectUser));

                        if (!proessedUsers.contains(projectUser)) {

                            //jsoUser.put("projects", jsoProjectIdArray);
                            jsoUser.put("project_id", p.getId());

                            //get current user Tag only..
                            //Other tags will be gathered if end-user click on them..
                            if (projectUser.equals(u)) {
                                List<ProjectUserTags> tags = ProjectImpl.getUserProjectTags(uproject);
                                JSONArray jsoTagsArr = new JSONArray();
                                for (int i = 0; i < tags.size(); i++) {
                                    jsoTagsArr.add(JSONObject.fromObject(mapper.writeValueAsString(tags.get(i))));
                                }

                                //jsoUser.put("tags", mapper.writeValueAsString(userProject.getTags()));
                                jsoUser.put("tags", jsoTagsArr);
                            }

                            //jsoUser.put("tags", mapper.writeValueAsString(userProject.getTags()));

                        }
                        jsoUserArray.add(jsoUser);
                        proessedUsers.add(projectUser);
                    }
                }
            }

            jso.put("users", jsoUserArray);
            jsoProject.put("users", jsoProjectUserArray);

            jso.put("tags", mapper.writeValueAsString(projectTags));

            Set<ProjectQuota> s = p.getQuotas();
            if ((s != null) && (s.size() > 0)) {
                jso.put("quotas", mapper.writeValueAsString(s));
            }

            Set<ProjectRegions> projectRegionsSet = new HashSet<ProjectRegions>();
            Set<ProjectProviders> lstProviders = p.getProviders();
            if ((lstProviders != null) && (lstProviders.size() > 0)) {

                Iterator<ProjectProviders> itrProjectProviders = lstProviders.iterator();
                Set<ProjectProviders> userAccessProviders = new HashSet<ProjectProviders>();
                while(itrProjectProviders.hasNext()) {
                    ProjectProviders pr = itrProjectProviders.next();

                    if (SecurityController.isTagPermitted(p.getId(), pr)) {
                        userAccessProviders.add(pr);
                        try {
                            if (pr.getRegions() != null) {
                                Iterator<ProjectProvidersRegions> itrRegions = pr.getRegions().iterator();
                                while (itrRegions.hasNext()) {
                                    ProjectProvidersRegions ppr = itrRegions.next();
                                    projectRegionsSet.add(ppr.getProjectRegions());
                                }
                            }
                        } catch (Exception ee) {

                        }
                    }
                }

                jso.put("regions", mapper.writeValueAsString(projectRegionsSet));


                jso.put("providers", mapper.writeValueAsString(userAccessProviders));

                Set<ProjectSshKey> lstKeys = p.getSshKeys();
                if ((lstKeys != null) && (lstKeys.size() > 0)) {
                    Iterator<ProjectSshKey> itrKeys = lstKeys.iterator();
                    JSONArray jsoKeys = new JSONArray();
                    while (itrKeys.hasNext() ) {
                        ProjectSshKey sshKey = itrKeys.next();

                        if (SecurityController.isPermitted(p,  sshKey)) {
                            jsoKeys.add(mapper.writeValueAsString(sshKey));
                        }

                    }
                    jso.put("sshkeys", jsoKeys);
                }

            }

            jsoProject.put("roles", jsRolesArray);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return jso.toString();
    }

    public static String getQuotaAsJson(ProjectQuota q) throws JsonProcessingException {
        JSONObject jsoObject = new JSONObject();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
        ObjectWriter ow = mapper.writer();
        return ow.writeValueAsString(q);
    }

    public static void getOrReloadAPIRegions(ProjectProviders prov) {
        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());
        try {
            List<Region> lstRegions = apiClient.getAvailableRegions();
            Set<ProjectProvidersRegions> projectRegionsSet =  prov.getRegions();

            Iterator<Region> itrRegions = lstRegions.iterator();

            while(itrRegions.hasNext()) {
                Region r = itrRegions.next();
                if (projectRegionsSet.contains(r.getSlug())) {
                    Logger.debug("Project REgions contains already : " + r.getSlug());

                    Iterator<ProjectProvidersRegions> it= projectRegionsSet.iterator();

                    while(it.hasNext())
                    {
                        ProjectProvidersRegions v = it.next();

                        if (v.isDisabled()) {
                            v.enable();
                        }

                    }

                } else {
                    ProjectRegions pr = ProjectRegionsImpl.getOrCreateRegion(prov.getProject(), r.getSlug(), r.getName(), r.getId());
                    prov.addRegion(pr);
                }
            }

        } catch (AccessDeniedException accessDenied) {
            ProjectProvidersImpl.disableAllRegions(prov);
        } catch (Exception ee) {
        }
        //aa
    }

    public static List<DropletImage> getAvailableImages(Long projectId, Long providerId) throws RequestUnsuccessfulException, AccessDeniedException, ResourceNotFoundException {
        ProjectProviders prov = ProjectImpl.getCloudProvider(projectId, providerId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        List<DropletImage> lstImages = apiClient.getAvailableImages();

        return lstImages;

    }

    public static JSONObject getProjectImagesAsJson(List<DropletImage> lstImages) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();
        JSONObject jso = new JSONObject();

        HashMap<String, Distro> hmDistro = new HashMap<String,Distro>();
        Iterator<DropletImage> itrImages = lstImages.iterator();
        long distroId = 1;

        List<DropletImage> realListImages = new ArrayList<DropletImage>();

        while(itrImages.hasNext()) {
            DropletImage img = itrImages.next();

            if (img.getSlug() == null) {
                continue;
            }

            if (! (hmDistro.containsKey(img.getDistribution()))) {
                if (img.getDistribution().compareTo("Arch Linux") == 0) {
                    continue;
                }



                Distro d = new Distro();
                d.setId(distroId);
                d.setName(img.getDistribution());
                distroId++;
                hmDistro.put(img.getDistribution(), d);
            }

            if (!(img.getSlug().toLowerCase().startsWith(img.getDistribution().toLowerCase()) )) {
                continue;
            }

            realListImages.add(img);



        }

        jso.put("images", mapper.writeValueAsString(realListImages));
        jso.put("distros", mapper.writeValueAsString(hmDistro.values()));

        return jso;
    }

    public static JSONObject getSshKeyAsJson(ProjectSshKey sshKey) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();
        JSONObject jso = new JSONObject();

        if (SecurityController.isPermitted(sshKey.getProjects(),  sshKey)) {
            jso.put("sshkey", ow.writeValueAsString(sshKey));
        }
        //jso.getJSONObject("sshkey").remove("tags");
        return jso;
    }

    public static ProjectTasks createNewDroplet(Long projectId, Long providerId, JSONObject jsonData) throws Exception, RequestUnsuccessfulException, AccessDeniedException, ResourceNotFoundException {

        Droplet d = new Droplet();

        d.setName(jsonData.getString("name"));
        d.setImageId(jsonData.getInt("image_id"));




        d.setSizeId(jsonData.getInt("size_id"));


        /*
            @SerializedName("image_id")
            private Integer imageId;

            @SerializedName("region_id")
            private Integer regionId;

            @SerializedName("size_id")
            private Integer sizeId;
	    */

        ProjectProviders prov = ProjectImpl.getCloudProvider(projectId, providerId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        List<SshKey> lstKeys = apiClient.getAvailableSshKeys();

        List<ProjectSshKey> lstProjectKeys = ProjectImpl.getAvailableSshKeys(projectId);

        String sshKeyIds = "";

        Droplet res = null;

        ProjectTasks task = new ProjectTasks();
        task.setName("Create Server");
        task.setType("server");
        task.setProviderId(prov.getId());
        task.setProjects(prov.getProject());
        ProjectImpl.save(task);


        ProjectRegions pr = ProjectRegionsImpl.getProjectRegionById(projectId, jsonData.getLong("region_id"));
        List<Region> lstRegions = apiClient.getAvailableRegions();
        Iterator<Region> itrRegion = lstRegions.iterator();
        Integer regionId = null;
        while(itrRegion.hasNext() && regionId == null) {
            Region r = itrRegion.next();
            if (r.getSlug().compareToIgnoreCase(pr.getSlug()) == 0) {
                regionId = r.getId();
            }
        }
        d.setRegionId(regionId);


        if (jsonData.has("sshkeys_id")) {

            JSONArray jsoKeyArray = jsonData.getJSONArray("sshkeys_id");
            String keysId = "";
            for (int i = 0; i < jsoKeyArray.size(); i++) {
                Long keyId = jsoKeyArray.getLong(i);

                ProjectSshKey currentKey = null;
                Iterator<ProjectSshKey> itrKeys = lstProjectKeys.iterator();
                while ( itrKeys.hasNext() && currentKey == null) {
                    ProjectSshKey key = itrKeys.next();
                    if (key.getId().longValue() == keyId.longValue()) {
                        currentKey = key;
                    }
                }

                if (currentKey == null) {
                    //Uh Oh, the key does not exists on this project ???
                    throw new Exception("KEY_NOT_FOUND");
                }
                //Ok key exists on this project great.... lets find if the api have it too..

                SshKey projectKey = null;
                Iterator<SshKey> itrProjKeys= lstKeys.iterator();
                while ( itrProjKeys.hasNext() && projectKey == null) {
                    SshKey key = itrProjKeys.next();

                    if (key.getName().compareTo(currentKey.getName()) == 0) {
                        projectKey = key;
                    }

                }

                if ( projectKey == null ) {
                    //Key does not exists ? lets create it..
                    projectKey = apiClient.addSshKey(currentKey.getName(), currentKey.getPublicKey());
                }

                //Ok at this point we have all the ssh key reqruied.. lets build the string..
                if ( i == 0) {
                    sshKeyIds = String.valueOf(projectKey.getId());
                } else {
                    sshKeyIds += "," + projectKey.getId();
                }
            }
            res = apiClient.createDropletWithPrivateNetworking(d, sshKeyIds);

        } else {
            res = apiClient.createDropletWithPrivateNetworking(d);
        }

        task.setExtId(res.getEventId());
        ProjectImpl.update(task);


        Project p = ProjectImpl.getProject(projectId);
        Device device = new Device();
        device.setGUID(Utils.getUniqueGUID());
        //d.setId(task.getExtId());

        ProjectDevices pd = new ProjectDevices();
        pd.setProject(p);
        pd.setDevice(device);
        pd.setPartner_id(SecurityController.getUser().getPartnerId());

        pd.setExternalId(String.valueOf(res.getId()));

        pd.setProviders(prov);


        Logger.debug("SAVIGN DEVICE");
        HibernateSessionFactory.getSession().saveOrUpdate(device);
        Logger.debug("SAVIGN PROJECT DEVICE");
        HibernateSessionFactory.getSession().saveOrUpdate(pd);

        return task;

    }

    public static String getDropletEventStatusInfo(Long projectId, Integer eventId, long providerId) {

        ProjectProviders prov = ProjectImpl.getCloudProvider(projectId, providerId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        try {
            Response response = apiClient.getEventProgress(eventId);

            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            ObjectWriter ow = mapper.writer();


            return ow.writeValueAsString(response.getEvent());


        } catch (AccessDeniedException e) {
            e.printStackTrace();
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
        } catch (RequestUnsuccessfulException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getProjectTaskStatusAsJson(Long projectId, Long taskId) throws JsonProcessingException, RequestUnsuccessfulException, AccessDeniedException, ResourceNotFoundException {
        ProjectTasks task = ProjectImpl.getProjectTaskById(projectId, taskId);

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();
        String val = ow.writeValueAsString(task);
        JSONObject jsoTask = new JSONObject();
        jsoTask.put("task", val);


        ProjectProviders prov = ProjectProvidersImpl.getProviderById(task.getProviderId());
        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        Response l = apiClient.getEventProgress(Integer.valueOf(task.getExtId()));

        if ((l != null) && (l.getEvent() != null) ) {
            jsoTask.getJSONObject("task").put("percentage", l.getEvent().getPercentage());
            jsoTask.getJSONObject("task").put("action_status", l.getEvent().getActionStatus());
        } else {
            //No percentage to this task
            jsoTask.getJSONObject("task").put("percentage", 100);
            jsoTask.getJSONObject("task").put("action_status", "done");
        }

        return jsoTask.toString();
    }

    public static String shutdownServer(Long projectId, Long serverId) throws Exception {


        ProjectProviders prov = ProjectImpl.getServerCloudProvider(projectId, serverId, SecurityController.getUser());
        ProjectDevices dev = ProjectImpl.getProjectServer(projectId, serverId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        ProjectTasks task = new ProjectTasks();
        task.setName("Shutdown Server");
        task.setType("server");
        task.setProviderId(prov.getId());
        task.setProjects(prov.getProject());
        ProjectImpl.save(task);


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();


        Response res = apiClient.powerOffDroplet(Integer.valueOf(dev.getExternalId()));
        Logger.debug("GOT RESPONSE OF : " + ow.writeValueAsString(res));

        task.setExtId(res.getEventId());

        ProjectImpl.update(task);

        JSONObject jsoTask = new JSONObject();
        jsoTask.put("task_id", task.getId());
        jsoTask.put("success", true);


        return jsoTask.toString();
    }

    public static String poweronServer(Long projectId, Long serverId) throws Exception {


        ProjectProviders prov = ProjectImpl.getServerCloudProvider(projectId, serverId, SecurityController.getUser());
        ProjectDevices dev = ProjectImpl.getProjectServer(projectId, serverId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        ProjectTasks task = new ProjectTasks();
        task.setName("Shutdown Server");
        task.setType("server");
        task.setProviderId(prov.getId());
        task.setProjects(prov.getProject());
        ProjectImpl.save(task);


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();


        Response res = apiClient.powerOnDroplet(Integer.valueOf(dev.getExternalId()));

        task.setExtId(res.getEventId());

        ProjectImpl.update(task);

        JSONObject jsoTask = new JSONObject();
        jsoTask.put("task_id", task.getId());
        jsoTask.put("success", true);

        return jsoTask.toString();
    }

    public static String restartServer(Long projectId, Long serverId) throws Exception {


        ProjectProviders prov = ProjectImpl.getServerCloudProvider(projectId, serverId, SecurityController.getUser());
        ProjectDevices dev = ProjectImpl.getProjectServer(projectId, serverId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        ProjectTasks task = new ProjectTasks();
        task.setName("Restart Server");
        task.setType("server");
        task.setProviderId(prov.getId());
        task.setProjects(prov.getProject());
        ProjectImpl.save(task);


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();


        Response res = apiClient.powerCyleDroplet(Integer.valueOf(dev.getExternalId()));

        task.setExtId(res.getEventId());

        ProjectImpl.update(task);

        JSONObject jsoTask = new JSONObject();
        jsoTask.put("task_id", task.getId());
        jsoTask.put("success", true);

        return jsoTask.toString();
    }


    public static String resizeServer(Long projectId, Long serverId, Integer size_id) throws Exception {


        ProjectProviders prov = ProjectImpl.getServerCloudProvider(projectId, serverId, SecurityController.getUser());
        ProjectDevices dev = ProjectImpl.getProjectServer(projectId, serverId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        ProjectTasks task = new ProjectTasks();
        task.setName("Resize Server");
        task.setType("server");
        task.setProviderId(prov.getId());
        task.setProjects(prov.getProject());
        ProjectImpl.save(task);


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();


        Logger.debug("SIZE.. : " + size_id + " extId : " + dev.getExternalId());
        Response res = apiClient.resizeDroplet(Integer.valueOf(dev.getExternalId()), size_id.intValue());

        Logger.debug("RESP  .. : " + res.getErrorMessage());
        task.setExtId(res.getEventId());

        ProjectImpl.update(task);

        JSONObject jsoTask = new JSONObject();
        jsoTask.put("task_id", task.getId());
        jsoTask.put("success", true);

        return jsoTask.toString();
    }


    public static String destroyServer(Long projectId, Long serverId) throws Exception {


        ProjectProviders prov = ProjectImpl.getServerCloudProvider(projectId, serverId, SecurityController.getUser());
        ProjectDevices dev = ProjectImpl.getProjectServer(projectId, serverId);

        DigitalOcean apiClient = new DigitalOceanClient(prov.getApikey(), prov.getSecretkey());

        ProjectTasks task = new ProjectTasks();
        task.setName("Destroy Server");
        task.setType("server");
        task.setProviderId(prov.getId());
        task.setProjects(prov.getProject());
        ProjectImpl.save(task);


        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter ow = mapper.writer();


        Response res = apiClient.deleteDroplet(Integer.valueOf(dev.getExternalId()) );

        task.setExtId(res.getEventId());

        ProjectImpl.update(task);

        JSONObject jsoTask = new JSONObject();
        jsoTask.put("task_id", task.getId());
        jsoTask.put("success", true);

        return jsoTask.toString();
    }

    public static ProjectProviders getProjectProviderById(Long project_id, long provider_id) {

        ProjectProviders pd = ProjectImpl.getProjectCloudProviderById(project_id, provider_id, SecurityController.getUser());
        if (SecurityController.isTagPermitted(pd.getProjectId(), pd)) {
            //SecurityController.getSubject().checkPermission("project:" + pd.getProjectId() + ":tags:" + pd.getTag () + ":view");
            return pd;
        } else {
            return null;
        }
    }

    public static String updateServer(Long projectId, Long serverId, JSONObject updatedServer) throws JsonProcessingException {

        SecurityController.checkPermission(projectId, PermisionTagConstants.SERVER, serverId, PermissionActionConstats.EDIT);


        ProjectDevices device = DeviceImpl.getProjectDevice(projectId, serverId);

        //Device device = projectDevice.getDevice();


        Session s = HibernateSessionFactory.getSession();

        if (updatedServer.containsKey("tags")) {
            JSONArray listOfTags = updatedServer.getJSONArray("tags");

            final Set<ProjectDevicesTags> tags = device.getTags();
            Set<ProjectDevicesTags> newTags = new HashSet<ProjectDevicesTags>();

            for (ProjectDevicesTags tag : tags) {
                tag.disable();
            }

            int len = listOfTags.size();
            for (int i = 0; i < len; i++) {
                JSONObject jsoData = listOfTags.getJSONObject(i);
                String data = jsoData.getString("name");

                List<ProjectDevicesTags> foundItem = select(tags, having(on(ProjectDevicesTags.class).getName(), equalTo(data)));

                ProjectDevicesTags projectTags = null;
                if (foundItem.size() == 1) {
                    //We found it..
                    projectTags = foundItem.get(0);
                } else {
                    //This tag is not in this object yet.
                    projectTags = new ProjectDevicesTags();
                }
                projectTags.setProjectTags(ProjectTagsImpl.getOrCreateTags(device.getProject(), data, TagConstants.ANY));
                projectTags.enable();

                tags.add(projectTags);
                s.saveOrUpdate(projectTags);
                newTags.add(projectTags);
            }

            //Set the new Tags
            device.setTags(tags);

            s.saveOrUpdate(device);

            //Since we disabled all data now.. lets return the object.
            device.setTags(newTags);


            //Do not return the provider object as someone will potentially call "save on the object"

            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            ObjectWriter ow = mapper.writer();
            JSONObject jsoRes = new JSONObject();
            jsoRes.put("servers", ow.writeValueAsString(device));
            //return device;//ProjectsHelpers.getProjectProvidersAsJson(provider);
            return jsoRes.toString();
        }

        return null;
    }

    public boolean deleteProjectId(Long projectId) throws DAOException {

        SecurityController.checkIsAdmin(projectId);
        boolean bRes = false;

        Project p = ProjectImpl.getProject(projectId);

        if (p.getDevices() != null && p.getDevices().size() > 0) {
            return bRes;
        }

        if (p.getProviders() != null && p.getProviders().size() > 0) {
            return bRes;
        }

        p.disable();
        ProjectImpl.update((MetaData) p);

        return true;
    }
}
