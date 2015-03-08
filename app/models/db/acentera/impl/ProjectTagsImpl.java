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


import models.db.Project;
import models.db.ProjectTags;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import utils.HibernateSessionFactory;


public class ProjectTagsImpl extends DAO {


    public ProjectTagsImpl() {
        super();
    }

    //Not supposed to be called but it was string before
    public static ProjectTags getOrCreateTags(Project p, String tag, String type) {
        if (tag == null) {
            return null;
        }

        Session session = (Session) HibernateSessionFactory.getSession();
        Criteria criteria = session.createCriteria(ProjectTags.class);
        ProjectTags g = (ProjectTags) criteria.add(
                                    Restrictions.and(
                                            Restrictions.eq("project",p),
                                            Restrictions.eq("name", tag),
                                            Restrictions.eq("type", type)
                                    )
                                ).uniqueResult();
        if ( g == null ) {
            g = new ProjectTags();
            g.setProject(p);
            g.setType(type);
            g.setName(tag);
        }
        return g;
    }

}


