package models.db.acentera.impl;


import models.db.acentera.exceptions.DAOException;
import utils.HibernateSessionFactory;
import models.db.Partner;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import play.Logger;


public class  PartnerImpl extends DAO {

    private Partner dao;

    public PartnerImpl () {
        super();
        this.dao = new Partner();
    }

    public Partner getDao() {
        return this.dao;
    }

    public static Partner getPartnerById(Long partnerId) {

        try {
            Session s = (Session)HibernateSessionFactory.getSession();
            Logger.debug("getPartner : " + partnerId);
            Criteria criteria = s.createCriteria(Partner.class);
            Logger.debug(" partner restriction Id : " + partnerId);
            Partner g = (Partner) criteria.add(Restrictions.eq("id", partnerId)).uniqueResult();
            Logger.debug(" Partner p is : " + g);
            return g;
        } catch (Exception e) {
            e.printStackTrace();
            Logger.debug("Exception getPartner : " + partnerId);
            //OK BAD...
            Session s = (Session)HibernateSessionFactory.getSession();//DatabaseImpl.getEntityManager().getDelegate();

            //s.beginTransaction();
            //////////////////System.out.printlnln("getPartner : " + partnerId);
            Criteria criteria = s.createCriteria(Partner.class);
            Partner g = (Partner) criteria.add(Restrictions.eq("id", partnerId)).uniqueResult();
            return g;
        }
    }


    public static Partner getPartner(Long partnerId) {

        try {
            Session s = (Session)HibernateSessionFactory.getSession();//HibernateSessionFactory.getSession();//DatabaseImpl.getEntityManager().getDelegate();
            Logger.debug("getPartner : " + partnerId);
            Criteria criteria = s.createCriteria(Partner.class);
            Logger.debug(" partner restriction Id : " + partnerId);
            Partner g = (Partner) criteria.add(Restrictions.eq("id", partnerId)).uniqueResult();
            Logger.debug(" Partner p is : " + g);
            return g;
        } catch (Exception e) {
            //Logger.debug("Exception getPartner : " + partnerId);
            //e.printStackTrace();

        }
        return null;
    }


    public Partner savePartner(Partner p) throws DAOException {

        try {
            Logger.debug("Getting session...");
            Session s = (Session)HibernateSessionFactory.getSession();
            Logger.debug("Getting session...save or update ?");
            s.saveOrUpdate(p);
            Logger.debug("Getting session...save or update  done.. : " + s);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return p;
    }


    public static Partner save(Partner p) throws DAOException {

        try {
            Session s = (Session)HibernateSessionFactory.getSession();
            s.saveOrUpdate(p);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return p;
    }


    public Partner updatePartner(Partner p) throws DAOException {

        try {
            Session s = (Session)HibernateSessionFactory.getSession();
            s.update(p);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return p;
    }




    public Partner refresh(Partner partner) throws DAOException {
        try {
            Session s = (Session)HibernateSessionFactory.getSession();//DatabaseImpl.getEntityManager().getDelegate();
            s.refresh(partner);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return partner;
    }

    public Partner getPartnerByApiKey(String partnerAPIKey) {
        Session s = (Session)HibernateSessionFactory.getSession();//DatabaseImpl.getEntityManager().getDelegate();
        //System.out.println("getPartner : " + partnerId);
        Criteria criteria = s.createCriteria(Partner.class);


        byte[] arrayOfValues = new byte[partnerAPIKey.length() / 2];
        int counter = 0;
        for (int i = 0; i < partnerAPIKey.length(); i += 2) {
            String strHex = partnerAPIKey.substring(i, i + 2);
            arrayOfValues[counter] = (byte) Integer.parseInt(strHex, 16);

            counter++;
        }

        Partner g = (Partner) criteria.add(Restrictions.eq("APIKEY", arrayOfValues)).uniqueResult();
        return g;
    }

    public static Partner getPartnerByEmail(String email) {
        Session s = (Session)HibernateSessionFactory.getSession();//DatabaseImpl.getEntityManager().getDelegate();
        Criteria criteria = s.createCriteria(Partner.class);
        Partner g = (Partner) criteria.add(Restrictions.eq("Name", email)).uniqueResult();
        return g;
    }



}


