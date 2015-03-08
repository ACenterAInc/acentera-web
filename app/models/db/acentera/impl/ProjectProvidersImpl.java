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


import models.db.*;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import play.Logger;
import utils.HibernateSessionFactory;

import java.util.*;


public class ProjectProvidersImpl extends DAO {


    public ProjectProvidersImpl() {
        super();
    }


    public static ProjectProviders getProviderById(Long id) {

        Session session = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = session.createCriteria(ProjectProviders.class);
        return (ProjectProviders) criteria.add(Restrictions.and(
                        Restrictions.eq("id", id)
                )
        ).uniqueResult();
    }

    //Not supposed to be called but it was string before
    public static ProjectProviders disableAllRegions(ProjectProviders prov) {

        Session session = (Session) HibernateSessionFactory.getSession();
        Set<ProjectProvidersRegions> regionSet = prov.getRegions();
        if (regionSet != null) {
            Iterator<ProjectProvidersRegions> itrRegion = regionSet.iterator();
            while (itrRegion.hasNext()) {
                itrRegion.next().disable();
            }
        }

        return prov;
    }


    public static Set<ProjectRegions> getRegionsAvailables(Set<ProjectProvidersRegions> regions) {

        Session s = (Session) HibernateSessionFactory.getSession();

        DetachedCriteria msgFromCriteria = DetachedCriteria.forClass(DO_REGIONS.class);
        ProjectionList properties = Projections.projectionList();
        properties.add(Projections.groupProperty("slug"));
        msgFromCriteria.setProjection(properties);

        Criteria criteria = s.createCriteria(DO_REGIONS.class);
        criteria.add(Subqueries.propertiesIn(new String[]{"slug"}, msgFromCriteria));

        List<DO_REGIONS> list = criteria.list();

        HashSet<ProjectRegions> regionsSet = new HashSet<ProjectRegions>();
        Iterator<ProjectProvidersRegions> ppr = regions.iterator();
        while (ppr.hasNext()) {
            ProjectProvidersRegions item = ppr.next();

            boolean bFound = false;
            Iterator<DO_REGIONS> itrReg = list.iterator();
            while(itrReg.hasNext() && !bFound) {
                DO_REGIONS r = itrReg.next();
                try {
                        if (r.getSlug().compareTo(item.getProjectRegions().getSlug()) == 0) {
                            bFound = true;
                        }
                } catch (Exception ew) {
                    ew.printStackTrace();
                }
            }
            if (bFound) {
                regionsSet.add(item.getProjectRegions());
            }
        }
        return regionsSet;

    }

    public static HashMap<Long, ArrayList<Long>> getRegionAvailableSizes(Set<ProjectProvidersRegions> regions) {

        Session s = (Session) HibernateSessionFactory.getSession();
        HashMap<Long, ArrayList<Long>> hmRegionSize = new HashMap<Long, ArrayList<Long>>();

        Criteria c = s.createCriteria(DO_REGIONS.class);
        List<DO_REGIONS> list = c.addOrder(Order.asc("slug")).list();



        HashSet<ProjectRegions> regionsSet = new HashSet<ProjectRegions>();
        Iterator<ProjectProvidersRegions> ppr = regions.iterator();
        HashMap<String, Long> hmSlug = new HashMap<String,Long>();


        while (ppr.hasNext()) {
            ProjectProvidersRegions item = ppr.next();

            boolean bFound = false;
            Iterator<DO_REGIONS> itrReg = list.iterator();
            while(itrReg.hasNext() && !bFound) {
                DO_REGIONS r = itrReg.next();
                //Logger.debug("CHECK REGION OF : " + r.getName() + "-" + r.getSlug());
                if (r.getSlug().compareTo(item.getProjectRegions().getSlug()) == 0) {
                    bFound = true;
                }
            }
            if (bFound) {
                hmSlug.put(item.getProjectRegions().getSlug(), item.getProjectRegions().getId());
                regionsSet.add(item.getProjectRegions());
            }
        }





        Iterator<ProjectRegions> itrPr = regionsSet.iterator();

        Iterator<DO_REGIONS> itrReg = list.iterator();

        while(itrReg.hasNext()) {
            DO_REGIONS r = itrReg.next();
            try {
            Long regionId = hmSlug.get(r.getSlug());

            if (regionId != null) {
                if (!(hmRegionSize.containsKey(regionId))) {
                    hmRegionSize.put(regionId, new ArrayList<Long>());
                }
                hmRegionSize.get(regionId).add(r.getSizeId());
            }
	    } catch (Exception e) {
            }
        }

        return hmRegionSize;

    }

}
