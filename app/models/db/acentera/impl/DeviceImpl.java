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


import controllers.acentera.SecurityController;
import models.db.Device;
import models.db.ProjectDevices;
import models.db.User;
import models.db.UserProjects;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import utils.HibernateSessionFactory;

import java.util.Set;


public class DeviceImpl extends DAO {


    public DeviceImpl() {
        super();
    }

    //Not supposed to be called but it was string before
    public static Set<ProjectDevices> getDevices(Long projectId) {

        User u = SecurityController.getUser();

        Session session = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = session.createCriteria(ProjectDevices.class);
        UserProjects userProject = ProjectImpl.getUserProject(projectId, u);
        Set<ProjectDevices> deviseSet = userProject.getProject().getDevices();

        return deviseSet;

    }



    public static ProjectDevices getProjectDevice(Long projectId, Long serverId) {

        User u = SecurityController.getUser();

        Session session = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = session.createCriteria(ProjectDevices.class);
        UserProjects userProject = ProjectImpl.getUserProject(projectId, u);

        ProjectDevices pdevice = (ProjectDevices)criteria.add(Restrictions.and(
                Restrictions.eq("project", userProject.getProject()),
                Restrictions.eq("id", serverId)
        )).uniqueResult();

        return pdevice;
    }


    public Device getDevice(int guidid) {

        Session session = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = session.createCriteria(Device.class);

        Device device = (Device)criteria.add(Restrictions.and(
                Restrictions.eq("id", guidid)
        )).uniqueResult();

        return device;
    }
}


