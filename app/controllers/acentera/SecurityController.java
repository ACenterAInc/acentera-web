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

import models.db.*;
import models.db.Project;
import models.db.acentera.impl.UserImpl;
import models.web.*;
import net.sf.json.JSONObject;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.ExpiredSessionException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import play.Logger;
import play.api.libs.Crypto;
import play.cache.Cache;
import play.i18n.Messages;
import play.libs.F;
import play.mvc.*;
import scala.Option;
import utils.DatabaseManager;
import utils.HibernateSessionFactory;
import utils.security.TagArrayBasePermission;
import utils.security.TagSingleBasePermission;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.file.Files;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Iterator;

public class SecurityController extends AnonymousSecurityController {

    //public final static String AUTH_TOKEN_HEADER = "X-AUTH-TOKEN";
    public static final String AUTH_TOKEN = "token";
    public static final String AUTHSECRET_TOKEN = "token";
    public static final String DESKTOP_TOKEN = "dtid";
    private Files session;

    public F.Promise<Result> NotAuthorized() {
        //return play.libs.F.Promise.pure((SimpleResult) controllers.Auth.logout());
        return play.libs.F.Promise.pure((Result) FailedMessage("UNAUTHORIZED"));
    }


    public F.Promise<Result> call(final Http.Context ctx) throws Throwable {
        User user = null;
        Logger.debug(" [ SecurityController ] Got Path : " + ctx.request().path());
        try {




            //Get the Session
            //HibernateSessionFactory.getSession();

            boolean isAuthorized = false;
            String cacheValue = getStringCacheValue(ctx, AUTH_TOKEN);

            Logger.debug("GOT CACHE VALUE : " + cacheValue);


            String email = getEmailFromSession(ctx);
            Logger.debug("GOT EMAIL : " + email);
            if (cacheValue != null) {
                if (cacheValue.compareTo(email) == 0) {
                    ctx.args.put("email", email);
                    user = UserImpl.getUserByEmail(email);
                    isAuthorized = true;
                } else {


                    //Stay logged in if hit another server (or in dev by using token secret...)
                    user = UserImpl.getUserByEmail(email);
                    if (user == null) {
                        return NotAuthorized();
                    } else {
                        String k = Crypto.sign(user.getEmail() + "-" + user.getSalt() + "-" + user.getPassword());
                        Logger.debug("the crypto sign was : " + k);
                        Http.Cookie c = ctx.request().cookie("tokensecret");
                        String custom = "";
                        if (c != null) {
                            custom = c.value();
                        }
                        if (k.compareTo(custom) == 0) {
                            //Its all good
                            if (custom.compareTo("") != 0) {
                                isAuthorized = true;
                            }
                        } else {
                            return NotAuthorized();
                        }
                    }
                }
            } else {
                //Stay logged in if hit another server (or in dev by using token secret...)
                user = UserImpl.getUserByEmail(email);
                if (user == null) {
                    return NotAuthorized();
                } else {
                    String k = Crypto.sign(user.getEmail() + "-" + user.getSalt() + "-" + user.getPassword());
                    Logger.debug("the crypto sign was : " + k);
                    if (k.compareTo(ctx._requestHeader().session().get("tokensecret").get()) == 0) {
                        //Its all good
                        isAuthorized = true;
                    } else {
                        return NotAuthorized();
                    }
                }
            }

            Logger.debug("GOT USER : " + user);
            if ((user != null) && (isAuthorized)) {
                ctx.args.put("user", user);
                ctx.args.put("email", user.getEmail());


                String passphrase = play.Play.application().configuration().getString("privatekey");
                MessageDigest digest = MessageDigest.getInstance("SHA");
                digest.update(passphrase.getBytes());
                SecretKeySpec key = new SecretKeySpec(digest.digest(), 0, 16, "AES");

                Cipher aes = Cipher.getInstance("AES/ECB/PKCS5Padding");
                aes.init(Cipher.DECRYPT_MODE, key);
                String pw = null;
                try {

                    byte[] pwHashed = java.util.Base64.getDecoder().decode(getCookieKeyInfo(ctx, "secret_key"));
                    pw = new String(aes.doFinal(pwHashed));

                    //pw = new String(aes.doFinal(((byte[]) Cache.get(user.getEmail() + "_pass"))));
                } catch (Exception ee) {
                    if (play.Play.isDev()) {
                        pw = play.Play.application().configuration().getString("dev_default_user_password");
                    }
                }

                //Because we are stateless we must login each time...
                //TODO: If we impersonnate user (from an admin portal) to simulate we are someone else..
                //we should override the login / user here..
                UsernamePasswordToken tk = new UsernamePasswordToken(user.getEmail(), pw);
                Subject currentUser = null;
                try {
                    currentUser =  new Subject.Builder().buildSubject();
                    tk.setRememberMe(true);
                    currentUser.login(tk);
                } catch (org.apache.shiro.session.UnknownSessionException usession) {
                    currentUser = new Subject.Builder().buildSubject();
                    currentUser.login(tk);
                } catch (Exception ee) {
                }


                if (!currentUser.isAuthenticated()) {

                    ctx.session().remove(SecurityController.AUTH_TOKEN);
                    ctx.session().remove(SecurityController.DESKTOP_TOKEN);
                    ctx.response().discardCookie(SecurityController.AUTH_TOKEN);
                    ctx.response().discardCookie(SecurityController.DESKTOP_TOKEN);


                    redirect("/login");

                    /*
                    if (play.Play.isDev()) {
                        pw = play.Play.application().configuration().getString("dev_default_user_password");
                        tk = new UsernamePasswordToken(user.getEmail(), pw);
                        tk.setRememberMe(true);
                        currentUser.login(tk);
                    } else {
                        return NotAuthorized();
                    }*/
                }

                Session ss = getSession();
                /*if (ss == null) {
                    throw new ExpiredSessionException("Expired");
                }*/
                getSession().setAttribute("user", user);


                String token = uuid(ctx);
                Option<WebSession> currSession = AppObj$.MODULE$.getSession(token);
                ///.getOrElse(null);

                if (currSession.isEmpty()) {
                    //OK Session is null, but.................................
                    WebUser wu = new WebUser(user.getEmail(), user.getPassword(), new UsernamePasswordToken(user.getEmail(), user.getPassword()));
                    AppObj$.MODULE$.addNewSession(token, wu);
                    currSession = AppObj$.MODULE$.getSession(token);
                }


                if (currSession != null) {
                    //Do we have a desktop ? (browser tab..)


                    String dtid = null;
                    try {
                        dtid = ctx._requestHeader().headers().get(DESKTOP_TOKEN).get();
                    } catch (Exception e) {
                        //e.printStackTrace();
                    }
                    Logger.debug("dtid..." + dtid);

                    DesktopObject desktop = null;
                    if (dtid != null) {
                        Logger.debug("get desktop for dtid : " + dtid);
                        desktop = AppObj$.MODULE$.getDesktop(dtid);
                        Logger.debug("desktop is now.. : " + desktop);
                        if (desktop == null) {
                            //We didnt know this session on this web server lets add it..
                            String tmpDesktopId = currSession.get().addDesktopStaticId(dtid);
                            if (tmpDesktopId == null) {
                                //Assume failure duplicate in guid...
                                Logger.debug("GOT DUPLICATE ID IOS ???? ");
                                desktop = new DesktopObject("", null);
                            } else {
                                desktop = AppObj$.MODULE$.getDesktop(tmpDesktopId);
                            }
                        }
                    }


                    if (desktop == null) {
                        if (!(ctx.request().path().compareTo("/create") == 0)) {

                            //temporary hacks... no desktop... it is still fine......

                            /*if (! ( ctx.request().path().startsWith("/payment"))) {
                                if (! ( ctx.request().path().startsWith("/billing"))) {
                                    return NotAuthorized();
                                }
                            }*/
                        } else {

                        }
                    } else {
                        Logger.debug("SET SHIRO USER OF :"  + currentUser);
                        desktop.setShiroSubject(currentUser);
                        //Cache.set(dtid + "_shiro", currentUser );
                    }


                    if (desktop != null) {
                        //we got /create so its ok.. to have no desktoips...
                        //we should modify /create to use something else than securitycontroller
                        getSession().setAttribute("dtid", desktop.getId());
                        getSession().setAttribute("desktop", desktop);
                    }
                    WebSession webSession = currSession.get();
                    getSession().setAttribute("websession", webSession);

                    Logger.debug("DESKTOP IOS : " + desktop);
                    if (desktop != null) {
                        Logger.debug("DESKTOP IOS : " + desktop.getId());


                        ctx.args.put("dtid", desktop.getId());
                        ctx.args.put("desktop", desktop);
                    }

                    ctx.args.put("subject", currentUser);
                    ctx.args.put("token", token);
                    ctx.args.put("websession", webSession);
                    Logger.debug("WILL CALL DELETGATE?");



                    Logger.debug("SHIRO IS : " + currentUser);
                    return processRequest(ctx);
                }
            }
            // }

            return NotAuthorized();
        } catch (org.apache.shiro.session.UnknownSessionException e) {
            //Rollback any changes
            try {
                DatabaseManager.getInstance().rollback();
            } catch (Exception ew) {

            }
            HibernateSessionFactory.rollback();



            return logout(ctx);
        } catch (ExpiredSessionException e) {

            //Rollback any changes
            try {
                DatabaseManager.getInstance().rollback();
            } catch (Exception ew) {

            }
            HibernateSessionFactory.rollback();



            return logout(ctx);
        } catch (Exception e) {
            e.printStackTrace();

            //Rollback any changes
            try {
                DatabaseManager.getInstance().rollback();
            } catch (Exception ew) {


            }
            HibernateSessionFactory.rollback();

        } finally {
            //Commit or close the active session
            try {
                DatabaseManager.getInstance().closeIfConnectionOpen();
            } catch (Exception ew) {

            }
            HibernateSessionFactory.closeSession();
            Logger.debug(" [ SecurityController ] Got Path completed : " + ctx.request().path());
        }
        return NotAuthorized();
    }

    protected F.Promise<Result> processRequest(Http.Context ctx) throws Throwable {
        Logger.debug(" [ SecurityController ] - Start ");
        try {

            F.Promise<Result> z = delegate.call(ctx);
            return z;
        } finally {
            try {
                DatabaseManager.getInstance().rollback();
            } catch (Exception z){

            }

            try {
                HibernateSessionFactory.rollback();
            } catch (Exception z){

            }
            Logger.debug(" [ SecurityController ] - Completed ");
        }
    }


    public static WebSession getWebSession() {
        return (WebSession)Http.Context.current().args.get("websession");
    }

    public static DesktopObject getDesktop() {
        try {
            return (DesktopObject) Http.Context.current().args.get("desktop");
        } catch (ClassCastException ee) {
            try {
                return (DesktopObject) SecurityController.getSubject().getSession().getAttribute("desktop");
            } catch (Exception eee) {
                    try {
                        eee.printStackTrace();
                        String dtid = (String) SecurityController.getSubject().getSession().getAttribute("dtid");

                        if (dtid == null || (dtid != null && dtid.trim().compareTo("") == 0)) {
                            dtid = (String) Http.Context.current().args.get("dtid");
                        }
                        Logger.debug("DESKTOP ID IS : " + dtid);
                        DesktopObject desktop = AppObj$.MODULE$.getDesktop(dtid);
                        Logger.debug("desktop is now.. : " + desktop);
                        if (desktop == null) {
                            //We didnt know this session on this web server lets add it..
                            String token = (String) Http.Context.current().args.get("token");
                            Option<WebSession> currSession = AppObj$.MODULE$.getSession(token);
                            String tmpDesktopId = currSession.get().addDesktopStaticId(dtid);
                            Logger.debug("DESKTOP ID IS : " + tmpDesktopId);
                            //String tmpDesktopId = currSession.get().addDesktopStaticId(dtid);
                            if (tmpDesktopId == null) {
                                //Assume failure duplicate in guid...
                                Logger.debug("GOT DUPLICATE ID IOS ???? ");
                                desktop = new DesktopObject("", null);
                            } else {
                                desktop = AppObj$.MODULE$.getDesktop(tmpDesktopId);
                            }
                            Logger.debug("GOT DESKTOP : " + desktop);

                        }

                        return desktop;
                    } catch (Exception expired) {
                            return null;
                    }
            }
        }
    }


    public static DesktopObject getDesktop(String desktopId) {
        DesktopObject desktop = AppObj$.MODULE$.getDesktop(desktopId);

        //TODO: Should we validate that the desktop belongs to that user ? (desktop user... vs current logged in user?? bu we want to support impersonating a user too.. so lets ignore for now)
        return desktop;
    }

    public static boolean isTagPermitted(Project p, TagArrayBasePermission db) {
        return isTagPermitted(p.getId(), db);
    }

    public static boolean isTagPermitted(Long id, TagArrayBasePermission db) {
        String tagPrefix = "project:" + id + "tags:";
        boolean isPermitted = false;
        Logger.debug("Will check isTagPermitted of : " + db);
        try {
            Subject subject = getSubject();
            Logger.debug("Will check isTagPermitted of : " +  db + " with subject " + subject);
            if (subject.isAuthenticated()) {
                //always allow project admin..
                Logger.debug("Will check isTagPermitted of : " +  db + " with subject " + subject + " is admin Permitted... " +  subject.isPermitted("project:" + id + ":admin"));
                if (subject.isPermitted("project:" + id + ":admin")) {
                    isPermitted = true;
                }

                if (!isPermitted) {
                    Iterator<String> itrStr = db.getTagPermissions().iterator();
                    while (itrStr.hasNext() && !isPermitted) {
                        String tag = itrStr.next();
                        isPermitted = subject.isPermitted(tagPrefix + tag);
                    }
                }
            }
        } catch (Exception ee) {
            ee.printStackTrace();
        }

        return isPermitted;
    }



    public static boolean isSingleTagPermitted(Project p, TagSingleBasePermission obj) {
        return isSingleTagPermitted(p.getId(), obj);
    }

    public static boolean isSingleTagPermitted(Long id, TagSingleBasePermission obj) {


        String tagPrefix = "project:" + id + "tags:";
        boolean isPermitted = false;

        try {
            Subject subject = getSubject();
            if (subject.isAuthenticated()) {
                //always allow project admin..
                if (subject.isPermitted("project:" + id + ":admin")) {
                    isPermitted = true;
                }


                if (!isPermitted) {
                    String tag = obj.getTag();
                    isPermitted = subject.isPermitted(tagPrefix + tag);
                }
            }
        } catch (Exception expired) {

        }

        return isPermitted;

    }

    public static boolean canViewProject(Project p) {
        return canViewProject(p.getId());
    }

    public static boolean canViewProject(Long id) {
        try {
            Subject subject = getSubject();
            if (subject.isAuthenticated()) {
                if (getSubject().isPermitted("project:" + id + ":admin")) {
                    //we are admin
                    return true;
                }
                Logger.debug("WILL CHECK IF IS PERMIGGED OF : " + "project:" + id + ":view");
                if (subject.isPermitted("project:" + id + ":view")) {
                    return true;
                }
            }
        } catch (Exception expired) {

        }
        return false;
    }

    public static boolean canViewProject(UserProjects userProject) {
        Subject subject = getSubject();
        if (subject.isAuthenticated()) {
            Logger.debug("CAN VIEW OF ... " + getSubject());
            Logger.debug("CAN VIEW OF USERPROJECT... " + userProject);
            Logger.debug("CAN VIEW OF USERPROJECT GET PROJECT ID... " + userProject.getProjectId());
            Logger.debug("CAN VIEW PRINCIPAL ... " + getSubject().getPrincipal());

            if (getSubject().isPermitted("project:" + userProject.getProjectId() + ":admin")) {
                //we are project admin its ok
                return true;
            }
            if (subject.isPermitted("project:" + userProject.getProjectId() + ":view")) {
                return true;
            }
        }
        return false;
    }

    public static void checkPermission(Project p) {
        try {
            if (!(getSubject().isPermitted("project:" + p.getId() + ":admin"))) {
                //Not admin? wem ust be able to view this..
                getSubject().checkPermission("project:" + p.getId() + ":view");
            }
        } catch (Exception expired) {
            throw new org.apache.shiro.authz.AuthorizationException("");
        }

    }


    public static boolean isPermitted(Project p, String model_name) {

            try {
                if (getSubject().isPermitted("project:" + p.getId() + ":admin")) {
                    //admin is fine..
                    return true;
                }

                if (getSubject().isPermitted("project:" + p.getId() + ":" + model_name + ":view")) {
                    return true;
                }

            } catch (Exception ee) {
                throw new org.apache.shiro.authz.AuthorizationException("Expired");
            }
        return false;
    }

    public static boolean isPermitted(Project p, Object ps) {
        if (ps instanceof TagArrayBasePermission) {
            return isTagPermitted(p.getId(), (TagArrayBasePermission)ps);
        } else if (ps instanceof TagSingleBasePermission) {
            return isSingleTagPermitted(p.getId(), (TagSingleBasePermission) ps);
        }
        return false;
    }


    public static boolean canViewUser(Long projectId, Long userId) {

        if (getSubject().isPermitted("project:" + projectId + ":admin")) {
            return true;
        }

        if (getSubject().isPermitted("project:" + projectId + ":user:" + userId + ":view")) {
            return true;
        }

        return false;
    }

    public static boolean canDeleteUser(Long projectId, Long userId) {

        if (getSubject().isPermitted("project:" + projectId + ":admin")) {
            return true;
        }

        if (getSubject().isPermitted("project:" + projectId + ":user:" + userId + ":delete")) {
            return true;
        }

        return false;
    }

    public static boolean isProjectAdmin(Long projectId) {

        if (getSubject().isPermitted("project:" + projectId + ":admin")) {
            return true;
        }

        return false;
    }

    public static boolean canViewUser(UserProjects userProject, User user) {
        return canViewUser(userProject.getProjectId(), user.getId());
    }

    public static boolean canEditKey(ProjectSshKey projectSshKey) {
        if (getSubject().isPermitted("project:" + projectSshKey.getProjects().getId() + ":admin")) {
            return true;
        }

        //Can always edit self created key....
        if (projectSshKey.getUser().getId().longValue() == getUser().getId().longValue()) {
            return true;
        }

        //TODO: We should check if user "canEdit" what he can really do as things...

        return false;
    }

    public static boolean canEditKey(Long projectId, Long sshKeyId) {
        if (isProjectAdmin(projectId)) {
            return true;
        }

        //TODO: Should we also have project:X:keys:Y:exit permission ?

        return false;
    }

    public static boolean canEditUsers(Long projectId) {
        if (isProjectAdmin(projectId)) {
            return true;
        }

        if (getSubject().isPermitted("project:" + projectId + ":users:edit")) {
            return true;
        }

        return false;
    }

    public static void checkIsAdmin(Long projectId) {
        getSubject().checkPermission("project:" + projectId + ":admin");
    }


    public static void checkPermission(Long projectId) {
        if ( ! isProjectAdmin(projectId) ) {
            //Not admin? wem ust be able to view this..
            getSubject().checkPermission("project:" + projectId + ":view");
        }
    }

    public static void checkPermission(Long projectId, String type, Long id, String action) {
        getSubject().checkPermission("project:" + projectId + ":" + type + ":" + action);
    }

    public static boolean isPermitted(Long projectId, String type, Long id, String action) {
        return getSubject().isPermitted("project:" + projectId + ":" + type + ":" + action);
    }

    public static Session getSession() {
        return getSubject().getSession(true);
    }
}
