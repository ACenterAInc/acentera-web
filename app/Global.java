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

//import com.newrelic.api.agent.NewRelic;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.*;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.util.Factory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import play.Application;
import play.GlobalSettings;
import play.Logger;
import play.Play;
import play.api.mvc.Result;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.SimpleResult;
import utils.DatabaseManager;
import utils.HibernateSessionFactory;
import utils.security.PlayShiroCache;
import utils.security.SampleRealm;

import java.lang.reflect.InvocationTargetException;
import java.util.Collection;
import java.util.Iterator;

public class Global extends GlobalSettings {
    //ApplicationContext ctx = null;
    static SampleRealm sampleRealm;
    private class ActionWrapper extends Action.Simple {
        public ActionWrapper(Action<?> action) {
            this.delegate = action;
        }


        @Override
        public F.Promise<play.mvc.Result> call(final Http.Context ctx) throws Throwable {
            try {
                Logger.debug("GOT CALL... : " + "/" + ctx.request().path());
                //NewRelic.setTransactionName(null, "/" + ctx.request().path());
                F.Promise<play.mvc.Result> result = this.delegate.call(ctx);
                Http.Response response = ctx.response();
                response.setHeader("Access-Control-Allow-Origin", "*");       // Need to add the correct domain in here!!
                response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");   // Only allow POST
                response.setHeader("Access-Control-Max-Age", "86400");          // Cache response for 5 minutes
                response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, email, dtid, token, tokensecret");         // Ensure this header is also allowed!
                return result;
            } catch (Exception ee) {
                //ee.printStackTrace();
                return null;
            } finally {
                //Get the Session
                try {
                    DatabaseManager.getInstance().closeIfConnectionOpen();
                } catch (Exception ee) {

                }
                try {
                    HibernateSessionFactory.closeSession();
                } catch (Exception ee) {

                }

            }
        }
    }

    @Override
    public Action<?> onRequest(Http.Request request, java.lang.reflect.Method actionMethod) {
        return new ActionWrapper(super.onRequest(request, actionMethod));
    }

    @Override
    public void onStart(Application application) {
        // load the demo data in dev mode
        /*if (Play.isDev() && (User.find.all().size() == 0)) {
            DemoData.loadDemoData();
        }*/

        System.setProperty("jmagick.systemclassloader","false");
        Logger.debug("DOING ON START");

        Thread.currentThread().setContextClassLoader(Play.application().classloader());

        java.security.Security.setProperty("networkaddress.cache.ttl" , "10");
        java.security.Security.setProperty("networkaddress.cache.negative.ttl" , "10");

        DatabaseManager dbManager = DatabaseManager.getInstance();
        dbManager.initialize("default");


        ShiroConfig.initialize();

        super.onStart(application);


    }

    @Override
    public void onStop(Application application) {


        Logger.debug("DOING ON STOP");

        HibernateSessionFactory.closeSession();
        HibernateSessionFactory.unloadAll();
        DatabaseManager dbManager = DatabaseManager.getInstance();
        dbManager.initialize("default");
        dbManager.closeIfConnectionOpen();
        dbManager.unloadAll();

        RealmSecurityManager mgr =
                (RealmSecurityManager) SecurityUtils.getSecurityManager();

        Collection<Realm> realmCollection = mgr.getRealms();
        realmCollection.clear();


        /*
        Iterator<Realm> i = realmCollection.iterator();

        //There should be only one realm?
        while(i.hasNext()) {

            try {
                SampleRealm r = (SampleRealm) i.next();

                r.invalidateUser(SecurityUtils.getSubject().getPrincipals());
            } catch (Exception ee) {

            }

        }*/

        mgr.destroy();

        super.onStop(application);
    }


}

class ShiroConfig {

    public static void initialize() {


        SampleRealm sampleRealm = new SampleRealm();
        sampleRealm.ini();
        Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro.ini");
        DefaultSecurityManager securityManager = (DefaultSecurityManager)factory.getInstance();

        //DefaultSecurityManager securityManager = new DefaultSecurityManager();


        //securityManager.setRealm(sampleRealm);
        /*try {
            PropertyUtils.getNestedProperty(securityManager, "-1");
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }*/

        // Turn off session storage for better "stateless" management.
                // https://shiro.apache.org/session-management.html#SessionManagement-StatelessApplications%2528Sessionless%2529
        DefaultSubjectDAO subjectDAO = (DefaultSubjectDAO) securityManager.getSubjectDAO();
        DefaultSessionStorageEvaluator sessionStorageEvaluator = (DefaultSessionStorageEvaluator) subjectDAO.getSessionStorageEvaluator();

        sessionStorageEvaluator.setSessionStorageEnabled(false);


        //securityManager.setCacheManager(new PlayShiroCache());
        //securityManager.setCacheManager(org.apache.shir/o

        org.apache.shiro.SecurityUtils.setSecurityManager(securityManager);
    }

}
