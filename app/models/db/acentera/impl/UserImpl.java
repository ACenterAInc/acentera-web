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
import models.db.User;
import models.db.acentera.exceptions.DAOException;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import play.Logger;
import utils.DatabaseManager;
import utils.HibernateSessionFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import static ch.lambdaj.Lambda.having;
import static ch.lambdaj.Lambda.select;

public class UserImpl extends DAO {


    public UserImpl() {
        super();
    }
/*
    public static Set<ProjectTags> getTagsByProject(User u, Long projectId) {

        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(ProjectTags.class);

        List<ProjectTags> userProjectsTasg = (List<ProjectTags>) criteria.add(Restrictions.and(
                        Restrictions.eq("project.id", projectId),
                )
        ).list();

        select(userProjectsTasg, having(on(ProjectTags.class).get

        if (userProjectsTasg != null) {
            return new HashSet(userProjectsTasg);
        } else {
            Set<ProjectTags> tags = new HashSet<ProjectTags>();
            return tags;
        }
    }*/

    public static User getUserById(long userId) {

        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(User.class);
        User g = (User) criteria.add(Restrictions.eq("id", userId)).uniqueResult();
        return g;

    }



    public static User getUserByEmailExcludeInvited(String email)  throws DAOException {

        if (email == null) {
            return null;
        }
        User u = getUserByEmail(email);
        if (u == null) {
            //user does not exists lets create him..

            /*Session s = (Session) HibernateSessionFactory.getSession();
            u = new User();
            u.setEmail(email);
            u.setType("invited");
            s.save(u);

            return u;*/
            return null;
        } else {
            if (u.getType() != null && u.getType().compareTo("invited") == 0) {
                return null;
            }
        }
        return u;
    }

    public static User getOrCreateUserByEmail(String email)  throws DAOException {

        if (email == null) {
            return null;
        }
        User u = getUserByEmail(email);
        if (u == null) {
            //user does not exists lets create him..

            Session s = (Session) HibernateSessionFactory.getSession();
            u = new User();
            u.setEmail(email);
            u.setType("invited");
            s.save(u);

            return u;
        }
        return u;
    }


    public static User getUserByEmail(String email)  throws DAOException {

        if (email == null) {
            return null;
        }

        try {
            Session s = (Session) HibernateSessionFactory.getSession();
            Criteria criteria = s.createCriteria(User.class);
            Object g = criteria.add(Restrictions.eq("email", email)).uniqueResult();
            Logger.debug("G USER IS : " + g);
            return (User)g;
        } catch (Exception eee) {
            eee.printStackTrace();
        }
        Logger.debug("RET OF NULL");
        return null;
    }

    public static User saveOrUpdate(User u) throws DAOException {

        Session s = (Session) HibernateSessionFactory.getSession();
        s.saveOrUpdate(u);
        return u;
    }

    public static Set<String> getUserPermissions(User user) throws SQLException {
        //s.add("user:demo@acentera.com:write");
        try {
            try {Logger.debug("SECURITY USER : " + SecurityController.getUser().getId());} catch (Exception zz) {}
            Logger.debug("VS USER : " + user.getId());

            //if (SecurityController.getUser().getId().longValue() == user.getId().longValue()) {
                //Ok the current desktop have access (ie if we impersonate a user... a specific desktop later on)
                Set<String> Perms = new HashSet<String>();
                //Lets use custom query not hibernate for This one, its easier and more performant
                /*Session sess = (Session) HibernateSessionFactory.getSession();
                SessionFactoryImplementor sfi = (SessionFactoryImplementor) sess.getSessionFactory();
                ConnectionProvider cp = sfi.getConnectionProvider();
                */
                Connection c = DatabaseManager.getInstance().getConnection();


/*
            Perms.add("user:" + user.getId());
            Perms.add("user:" + user.getEmail());
            PreparedStatement s = c.prepareStatement("explain select PROJECT_TAGS.project_id, project_tags_id from PROJECT_USER INNER JOIN PROJECT_USER_TAGS ON (PROJECT_USER.id = PROJECT_USER_TAGS.user_id) INNER JOIN PROJECT_TAGS on (PROJECT_TAGS.id=PROJECT_USER_TAGS.project_tags_id) where PROJECT_USER.user_id = ? and PROJECT_TAGS.disable_date IS NULL");
*/

                PreparedStatement userProjects = c.prepareStatement("select project_user.project_id from PROJECT_USER where user_id=? and PROJECT_USER.disable_date is NULL");
                userProjects.setLong(1, user.getId());
                ResultSet rs = userProjects.executeQuery();

                while (rs.next()) {
                    Long projectId = rs.getLong("project_id");
                    Perms.add("project:" + rs.getLong("project_id") + ":view");
                }
                rs.close();
                userProjects.close();

                PreparedStatement tagRoles = c.prepareStatement("select PU.project_id, PROJECT_TAGS.name from PROJECT_USER_ROLES INNER JOIN PROJECT_USER PU ON (PU.id=PROJECT_USER_ROLES.project_user_id and PU.user_id=PROJECT_USER_ROLES.user_id) inner join PROJECT_TAGS on (PROJECT_TAGS.id=PROJECT_USER_ROLES.project_tags_id) where PU.user_id=? and PROJECT_USER_ROLES.user_id=? and PROJECT_TAGS.disable_date is null and PROJECT_USER_ROLES.disable_date is NULL and PU.disable_date IS NULL");
                tagRoles.setLong(1, user.getId());
                tagRoles.setLong(2, user.getId());
                rs = tagRoles.executeQuery();
                HashMap<Long, Set<String>> hmProjectRolesMapping = new HashMap<Long, Set<String>>();

                while (rs.next()) {
                    Long projectId = rs.getLong("project_id");
                    //RoleName :
                    String name = rs.getString("name");
                    if (!hmProjectRolesMapping.containsKey(projectId)) {
                        hmProjectRolesMapping.put(projectId, new HashSet<String>());
                    }
                    hmProjectRolesMapping.get(projectId).add(name);

                    if (name.compareTo("ProjectAdmin") == 0) {
                        Perms.add("project:" + rs.getLong("project_id") + ":view,edit,admin");
                        Perms.add("project:" + rs.getLong("project_id") + ":user:view,edit,delete");
                    } else if (name.compareTo("CanEdit") == 0) {
                        Perms.add("project:" + rs.getLong("project_id") + ":view,edit");
                    } else if (name.compareTo("CanView") == 0) {
                        Perms.add("project:" + rs.getLong("project_id") + ":view");
                    }

                    //Can view / edit /delete self user
                    Perms.add("project:" + rs.getLong("project_id") + ":user:" + user.getId() + ":view,edit,delete");
                }
                rs.close();
                tagRoles.close();

                PreparedStatement s = c.prepareStatement("select PROJECT_TAGS.project_id, project_tags_id from PROJECT_USER INNER JOIN PROJECT_USER_TAGS ON (PROJECT_USER.id = PROJECT_USER_TAGS.user_id) INNER JOIN PROJECT_TAGS on (PROJECT_TAGS.id=PROJECT_USER_TAGS.project_tags_id) where PROJECT_USER.user_id = ? and (PROJECT_TAGS.disable_date IS NULL AND PROJECT_USER.disable_date IS NULL)");
                s.setLong(1, user.getId());
                rs = s.executeQuery();

                while (rs.next()) {

                    try {
                        Perms.add("project:" + rs.getLong("project_id") + ":tags:" + rs.getLong("project_tags_id"));
                        Perms.add("project:" + rs.getLong("project_id") + ":tags:" + rs.getLong("project_tags_id") + ":view");

                        if (! hmProjectRolesMapping.containsKey (rs.getLong("project_id")) ) {
                            //In case the user is not assigend any project roles... we at least give him view..
                            Perms.add("project:" + rs.getLong("project_id") + ":view");
                            Perms.add("project:" + rs.getLong("project_id") + ":user:" + user.getId() + ":view,edit,delete");
                        } else {
                            Iterator<String> itrProj = hmProjectRolesMapping.get(rs.getLong("project_id")).iterator();

                            while (itrProj.hasNext()) {
                                String tagName = itrProj.next();
                                if (tagName.compareTo("ProjectAdmin") == 0) {
                                    Perms.add("project:" + rs.getLong("project_id") + ":tags:" + rs.getLong("project_tags_id") + ":edit");
                                } else if (tagName.compareTo("CanEdit") == 0) {
                                    Perms.add("project:" + rs.getLong("project_id") + ":tags:" + rs.getLong("project_tags_id") + ":edit");
                                } else if (tagName.compareTo("CanView") == 0) {
                                    Perms.add("project:" + rs.getLong("project_id") + ":tags:" + rs.getLong("project_tags_id") + ":view");
                                }
                            }
                        }
                    } catch (Exception ee) {
                        ee.printStackTrace();


                    }

                }
                rs.close();


                s.close();

                return Perms;

            //} else {
//                return new HashSet<String>();
  //          }
        } catch (Exception ee) {
            ee.printStackTrace();;
        }
        return new HashSet<String>();
    }
}


