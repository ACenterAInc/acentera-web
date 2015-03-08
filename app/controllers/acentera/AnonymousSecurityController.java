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

import models.db.User;
import models.db.acentera.impl.UserImpl;
import models.web.AppObj;
import models.web.AppObj$;
import models.web.DesktopObject;
import models.web.WebSession;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.ExpiredSessionException;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.subject.Subject;
import play.Logger;
import play.api.libs.Crypto;
import play.cache.Cache;
import play.i18n.Messages;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.SimpleResult;
import utils.DatabaseManager;
import utils.HibernateSessionFactory;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;

public class AnonymousSecurityController extends Action.Simple {

    //public final static String AUTH_TOKEN_HEADER = "X-AUTH-TOKEN";
    public static final String AUTH_TOKEN = "token";
    public static final String AUTHSECRET_TOKEN = "token";
    public static final String DESKTOP_TOKEN = "dtid";

    String uuid(Http.Context ctx) {
        Http.Cookie res = ctx.request().cookie(AUTH_TOKEN);
        if (res == null) {
            return "";
        }


        return res.value();
    }

    String getEmailFromSession(Http.Context ctx) {

        Http.Cookie res = ctx.request().cookie("email");
        if (res == null) {
            return "";
        }


        return res.value();
    }

    String getCookieKeyInfo(Http.Context ctx, String key ) {
        try {
            return (String)ctx.request().cookie(key).value();
        } catch (Exception ee) {
            ee.printStackTrace();
            return null;
        }
    }

    String getStringCacheValue ( Http.Context ctx, String key )  {
        try {
            String keyCache = uuid(ctx) + "." + key;
            Logger.debug("CACHE KEY IS : " + keyCache);
            Object data = Cache.get(keyCache);
            if (data == null) {
                return "";
            } else {
                return data.toString();
            }
        } catch (Exception ee) {
            //No cache
        }
        return null;
    }

    Object getCacheObject ( Http.Context ctx, String key )  {
        try {
            String keyCache = uuid(ctx) + "." + key;
            Object data = Cache.get(keyCache);
            if (data == null) {
                return null;
            } else {
                return data;
            }
        } catch (Exception ee) {
            //No cache
        }
        return null;
    }

    void setCacheObject ( Http.Context ctx, String key, String value )  {
        String keyCache = uuid(ctx) + "." + key;
        Cache.set(uuid(ctx) + "." + key, value);
    }




    public static Result FailedMessage(String message) {
        JSONObject jsoUnauthorzed = new JSONObject();
        jsoUnauthorzed.put("status", "failed");
        jsoUnauthorzed.put("message", Messages.get(message));
        return notFound(jsoUnauthorzed.toString()).as("application/json");
    }

    public static Result InternalServerError(String message) {
        return internalServerError().as("application/json");
    }

    public F.Promise<Result> NotAuthorized() {
        //return play.libs.F.Promise.pure((SimpleResult) controllers.Auth.logout());
        return F.Promise.pure((Result) FailedMessage("UNAUTHORIZED"));
    }

    public static F.Promise<Result>  logout(final play.mvc.Http.Context ctx) {
        try {
            ctx.session().remove(SecurityController.AUTH_TOKEN);
            ctx.session().remove(SecurityController.DESKTOP_TOKEN);
            ctx.response().discardCookie(SecurityController.AUTH_TOKEN);
            ctx.response().discardCookie(SecurityController.DESKTOP_TOKEN);

        }catch (Exception ee) {
        }

        try {
            WebSession websession = null;
            websession = SecurityController.getWebSession();

            if (websession != null) {
                websession.removeAllDesktop();
                websession.removeSession();
            }
        } catch (Exception ee){
        }

        try {
            SecurityController.getSubject().logout();
        } catch (Exception ee) {
        }


        return play.libs.F.Promise.pure((Result) redirect("/"));
    }

    public static Subject getSubject() throws org.apache.shiro.session.ExpiredSessionException {
        try {
            Http.Context context = Http.Context.current();

            Subject s = (Subject)context.args.get("subject");
            //Logger.debug("S IS : " + s);
            if (s == null) {
                //Logger.debug("S WAS NULLLLL??");

                s = SecurityUtils.getSubject();
                if ((s == null) || (s.getSession() == null)) {
                    s = new Subject.Builder().buildSubject();
                }
            } else {
                if (s.getPrincipal() != null) {
                    //Logger.debug("A SUBJECT SHIRO SESSIONID USER IS : " + ((User)s.getPrincipal()).getEmail());
                }
            }
            //Logger.debug("A SUBJECT SHIRO SESSIONID IS : " + s.getSession().getId());
            return s;
        } catch (org.apache.shiro.session.UnknownSessionException e) {
            /*Subject s = new Subject.Builder().buildSubject();
            if (s.getSession(true) == null) {
                s = new Subject.Builder().buildSubject();
            }
            return s;*/
            //Logger.debug("SHIRO SESSION IS NOW EXPIRED");
            e.printStackTrace();
            Subject s = new Subject.Builder().buildSubject();
            return s;
        } catch (UnknownAccountException ue) {
            ue.printStackTrace();


            try {
                Subject s = new Subject.Builder().buildSubject();
                return s;
            } catch (UnknownSessionException ss) {
                ss.printStackTrace();
            } catch (ExpiredSessionException ss) {
                ss.printStackTrace();
            } catch (Exception eee) {
                eee.printStackTrace();;
                throw eee;
            }

        } catch (org.apache.shiro.session.ExpiredSessionException ee) {
            Logger.debug("SHIRO SESSION IS NOW EXPIRED");
            throw ee;
        } catch (Exception e) {
            try {
                Subject s = new Subject.Builder().buildSubject();
                return s;
            } catch (UnknownSessionException ss) {
                ss.printStackTrace();
            } catch (ExpiredSessionException ss) {
                ss.printStackTrace();
            } catch (Exception eee) {
                eee.printStackTrace();;
                throw eee;
            }
        }
        //Subject s = new Subject.Builder().buildSubject();
        //return s;
        return null;
    };

    public F.Promise<Result> call(final Http.Context ctx) throws Throwable {
        try {



            Subject s = getSubject();


            User user= null;

            //Get the Session
            //HibernateSessionFactory.getSession();

            String cacheValue = getStringCacheValue(ctx, AUTH_TOKEN);
            String email = getEmailFromSession(ctx);

            Logger.debug("GOT EMAIL OF : " + email + " and cache avlue of : " + cacheValue);
            if (email != null && cacheValue != null) {
                if (cacheValue.compareTo(email) == 0) {
                    ctx.args.put("email", email);
                    user = UserImpl.getUserByEmail(email);
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
                            }
                        } else {
                        }
                    }
                }
            } else {
                //Stay logged in if hit another server (or in dev by using token secret...)
                if (email != null) {
                    user = UserImpl.getUserByEmail(email);
                    if (user == null) {
                    } else {
                        String k = Crypto.sign(user.getEmail() + "-" + user.getSalt() + "-" + user.getPassword());
                        Logger.debug("WILL CHECK CRYPTO VALUE OF... k " + k + " vs "  + ctx.request().cookie("tokensecret").value());
                        if (k.compareTo(ctx.request().cookie("tokensecret").value()) == 0) {
                            //Its all good
                            Logger.debug("ITS GOOD.....");
                            ctx.args.put("email", email);
                            user = UserImpl.getUserByEmail(email);
                        } else {
                            //Invalid user... signature recevied not match email..
                            user = null;
                        }
                    }
                }
            }
            Subject currentUser = null;
            Logger.debug("USER IS... " + user);
            if (user != null) {
                //set the subject principals...


                String passphrase = play.Play.application().configuration().getString("privatekey");
                MessageDigest digest = MessageDigest.getInstance("SHA");
                digest.update(passphrase.getBytes());
                SecretKeySpec key = new SecretKeySpec(digest.digest(), 0, 16, "AES");

                Cipher aes = Cipher.getInstance("AES/ECB/PKCS5Padding");
                aes.init(Cipher.DECRYPT_MODE, key);
                String pw = null;
                try {
                    //String k = Crypto.sign(wu.getUser().getEmail() + "-" + wu.getUser().getSalt() + "-" + wu.getUser().getPassword());

                    Logger.debug("WILL CHECK SECRET KEY ?");

                    byte[] pwHashed = java.util.Base64.getDecoder().decode(getCookieKeyInfo(ctx, "secret_key"));
                    pw = new String(aes.doFinal(pwHashed));

                    Logger.debug("GOT PW OF : " + pw);

                    //pw = new String(aes.doFinal(((byte[]) Cache.get(user.getEmail() + "_pass"))));

                } catch (Exception ee) {
                    ee.printStackTrace();
                    if (play.Play.isDev()) {
                        pw = play.Play.application().configuration().getString("dev_default_user_password");
                    }
                }


                //Because we are stateless we must login each time...
                //TODO: If we impersonnate user (from an admin portal) to simulate we are someone else..
                //we should override the login / user here..
                UsernamePasswordToken tk = new UsernamePasswordToken(user.getEmail(), pw);

                try {
                    currentUser = getSubject();
                    tk.setRememberMe(true);
                    currentUser.login(tk);
                } catch (org.apache.shiro.session.UnknownSessionException usession) {
                    currentUser = new Subject.Builder().buildSubject();
                    currentUser.login(tk);
                } catch (Exception ee) {
                    currentUser = new Subject.Builder().buildSubject();
                    currentUser.login(tk);
                }


                //setCacheObject(ctx, "email", user.getEmail());
            }


            ctx.args.put("subject", currentUser);
            return processRequest(ctx);
        } catch (ExpiredSessionException e) {

            e.printStackTrace();

                //Rollback any changes
                try {
                    DatabaseManager.getInstance().rollback();
                } catch (Exception ew) {

                }
                HibernateSessionFactory.rollback();

                Logger.debug(this + " - REDIRECTING TO /login");
                return F.Promise.pure(redirect("/login"));
        } catch (Exception e) {
            //e.printStackTrace();

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
        }

        return NotAuthorized();
    }


    protected F.Promise<Result> processRequest(Http.Context ctx) throws Throwable {
        Logger.debug(" [ AnonymousProcessRequest ] - Start ");
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
            Logger.debug(" [ AnonymousProcessRequest ] - Completed ");
        }
    }

    public static String getEmail() {

        try {
            return (String) Http.Context.current().args.get("email");
        } catch (Exception ee) {
            try {
                return (String)((User)getSubject().getPrincipal()).getEmail();
            } catch (Exception expired) {
                return "";
            }
        }
    }

    public static User getUser() {
        //TODO: Try to get it from cache ???
        try {
            return (User) Http.Context.current().args.get("user");
        } catch (Exception ee) {
            try {
                return (User) getSubject().getSession().getAttribute("user");
            } catch (Exception expired) {
                return null;
            }
        }
    }

    public static WebSession getWebSession() {
        return (WebSession)Http.Context.current().args.get("websession");
    }

    public static DesktopObject getDesktop() {
        try {
            return (DesktopObject) Http.Context.current().args.get("desktop");
        } catch (Exception ee) {
            try {
                return (DesktopObject) getSubject().getSession().getAttribute("desktop");
            } catch (Exception expired) {
                return null;
            }
        }
    }


    public static DesktopObject getDesktop(String desktopId) {
        DesktopObject desktop = AppObj$.MODULE$.getDesktop(desktopId);

        //TODO: Should we validate that the desktop belongs to that user ? (desktop user... vs current logged in user?? bu we want to support impersonating a user too.. so lets ignore for now)
        return desktop;
    }


}
