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


import models.db.User;
import models.db.UserForgotKeys;
import models.db.acentera.exceptions.DAOException;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import play.Logger;
import utils.HibernateSessionFactory;


public class UserForgotKeysImpl extends DAO {


    public UserForgotKeysImpl() {
        super();
    }

    public static UserForgotKeys getByIdAndRequest(String token, String newToken, String ip) {
        Session s = (Session)HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserForgotKeys.class);
        UserForgotKeys dbToken = (UserForgotKeys) criteria.add(Restrictions.and(Restrictions.eq("tokenid", token), Restrictions.eq("tokenid_request", newToken), Restrictions.eq("redeemed", 0))).uniqueResult();

        if (dbToken != null) {
            dbToken.setRedeemed(1);
            dbToken.setIp(ip);
            try {
                dbToken = saveOrUpdate(dbToken);
                return dbToken;
            } catch (DAOException e) {
            }
        }

        //COuldn't get token ?
        return null;
    }

    public static UserForgotKeys getByIdAndLock(String token, String newToken, String ip) {

        Session s = (Session)HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserForgotKeys.class);

        UserForgotKeys dbToken = null;

        String sqlWhere = "CREATED > DATE_SUB(curdate(), INTERVAL 1 DAY)";

        Logger.debug("gokenid : " + token + " new tokenid request " + newToken + " ip " + ip);
        try {
            //TODO Validate if DEV MODE... (H2 does not support DATE_SUB)
            //we fix this temporary by play.Play.isDev
            if (play.Play.isDev()) {
                dbToken = (UserForgotKeys) criteria.add(Restrictions.and(Restrictions.eq("tokenid", token), Restrictions.eq("redeemed", 0))).uniqueResult();
            } else {
                dbToken = (UserForgotKeys) criteria.add(Restrictions.and(Restrictions.eq("tokenid", token), Restrictions.eq("tokenid_request", null), Restrictions.eq("redeemed", 0), Restrictions.sqlRestriction(sqlWhere))).uniqueResult();
            }
        } catch (Exception ee) {

            ee.printStackTrace();

        }
        Logger.debug("DB TOKEN IS : " + dbToken);
        if (dbToken != null) {
            dbToken.setTokenid_request(newToken);
            dbToken.setIp(ip);
            try {
                dbToken = saveOrUpdate(dbToken);
                return dbToken;
            } catch (DAOException e) {
                e.printStackTrace();
            }
        }

        //Couldn't get token
        return null;
    }

    public static UserForgotKeys getNewToken(String email, String ip) {

        User u = null;
        try {
            Logger.debug("getUserByEmail : " + email);
            u = UserImpl.getUserByEmail(email);
        } catch (DAOException e) {
            e.printStackTrace();
        }

        Logger.debug("Email is : " + u);
        if (u == null)
            return null;

        Session s = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = s.createCriteria(UserForgotKeys.class);

        UserForgotKeys dbToken = new UserForgotKeys();
        dbToken.setIp(ip);
        dbToken.setTokenid(java.util.UUID.randomUUID().toString());
        dbToken.setUserId(u.getId());
        dbToken.setTokenid_request(null);
        dbToken.setRedeemed(0);

        try {
            dbToken = saveOrUpdate(dbToken);
            return dbToken;
        } catch (DAOException e) {
        }
        return null;
    }


    public static UserForgotKeys saveOrUpdate(UserForgotKeys u) throws DAOException {
        Session s = (Session) HibernateSessionFactory.getSession();
        s.saveOrUpdate(u);
        return u;
    }

}


