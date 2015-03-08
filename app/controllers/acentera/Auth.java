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

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.typesafe.plugin.MailerAPI;
import com.typesafe.plugin.MailerPlugin;
import lombok.Getter;
import lombok.Setter;
import models.db.Partner;
import models.db.User;
import models.db.UserForgotKeys;
import models.db.acentera.impl.PartnerImpl;
import models.db.acentera.impl.UserForgotKeysImpl;
import models.db.acentera.impl.UserImpl;
import models.web.Errors;
import models.web.WebSession;
import models.web.WebUser;
import net.sf.json.JSONObject;
import net.tanesha.recaptcha.ReCaptchaImpl;
import net.tanesha.recaptcha.ReCaptchaResponse;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import play.Logger;
import play.api.libs.Crypto;
import play.api.mvc.Session;
import play.cache.Cache;
import play.data.Form;
import play.data.validation.Constraints;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import plugins.PluginEvent;
import plugins.PluginManager;
import utils.HibernateSessionFactory;
import utils.Utils;
import views.html.forgot;
import views.html.login;

import java.security.SecureRandom;
import java.util.Random;



public class Auth extends Controller {

    // Returns the authentication tokens
    public static class Login {
        @Constraints.Required
        @Constraints.Email
        public @Getter @Setter String email;

        @Constraints.Required
        public @Getter @Setter String password;
    }


    public static Result authenticate() {
        HibernateSessionFactory.getSession();
        try {

            Form<Login> loginForm = Form.form(Login.class).bindFromRequest();

            if (loginForm.hasErrors()) {
                ObjectNode authTokenJson = Json.newObject();
                authTokenJson.put("success", false);
                authTokenJson.put("message", "Invalid Username / Password");
                return ok(authTokenJson);
            }

            String uuid = java.util.UUID.randomUUID().toString();

            Login login = loginForm.get();

            WebUser wu = new WebUser(login.email, login.password, new UsernamePasswordToken(login.email, login.password));

            if (wu.authenticate()) {

                Random rand = new Random();

                // nextInt is normally exclusive of the top value,
                // so add 1 to make it inclusive
                Integer randomNum = rand.nextInt((1990300 - 10) + 1) + 10;

                Logger.debug("AUTH : " + wu);
                Logger.debug("AUTH : " + wu.getUser());
                Logger.debug("AUTH : " + wu.getUser().getEmail());
                String k = Crypto.sign(wu.getUser().getEmail() + "-" + wu.getUser().getSalt() + "-" + wu.getUser().getPassword());

                //Cache.set(uuid + ".webuser", wu);
                Cache.set(uuid + ".token", wu.email());

                Logger.trace("User email is : " + wu.email());

                ObjectNode authTokenJson = Json.newObject();
                authTokenJson.put("success", true);
                authTokenJson.put("url", "/user/");

                response().setCookie(SecurityController.AUTH_TOKEN, uuid);
                response().setCookie("email", wu.email());
                response().setCookie("tokensecret", k);

                session(SecurityController.AUTH_TOKEN, uuid);
                session("email", wu.email());
                session("tokensecret", k);
                return ok(authTokenJson);
            }

            HibernateSessionFactory.rollback();

            ObjectNode authTokenJson = Json.newObject();
            authTokenJson.put("success", false);
            authTokenJson.put("message", Messages.get("INVALID_PASSWORD"));
            return ok(authTokenJson);
        } catch (Exception ew) {
            //ew.printStackTrace();
            HibernateSessionFactory.rollback();

            ObjectNode authTokenJson = Json.newObject();
            authTokenJson.put("success", false);
            authTokenJson.put("message", Messages.get("INVALID_PASSWORD"));
            return ok(authTokenJson);

        } finally {
            HibernateSessionFactory.closeSession();
        }
    }


    public static Result validateEmail(String email) {

        if (WebUser.findByEmail(email)) {
            return ok("true").as("text/html");
        } else {
            return ok("false").as("text/html");
        }
    }




    public static Result login() {
        response().setHeader("PRAGMA", "no-cache");
        response().setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response().setHeader("EXPIRES", "Sat, 16-Mar-2000 01:11:11 GMT");
        response().setHeader("REDIRECT", "");


        //request().
        Logger.debug("Sessoin : " + Http.Context.current()._requestHeader().session());
        Logger.debug("Email  : " + Http.Context.current()._requestHeader().session().get("email"));
        Session s = Http.Context.current()._requestHeader().session();

        if (s.get("email") != null) {
            String email = null;
            try {
                email = s.get("email").get();
            } catch (Exception e) {

            }
            if (email == null) {
                Logger.debug("NONE ???");
                return ok(login.render("login", ""));
            } else {
                Logger.debug("NOT NONE ???");
                return ok(login.render("login", email));
            }
        } else {
            return ok(login.render("login", null));
        }
    }

    public static Result logout() {

        SecurityController.logout(ctx());
        return redirect("/");
    }



    /* Create account */
    /*jsonemail:demo@acentera.com
password:demo
confirm:demo
challenge:03AHJ_VutR3W4lU7wjM0jVIl28hlD6esWrgj04QdI0DjWkKiYrHgDR7P3O3rLdsWOK1knJxD0p7Jh7-fMVOinWGQhffU5IAVNtVX604ADnAaVHsltYHAKwekoZwUAnyP6hB6IC6nZs3aYvlR_4tB878oKY7hgUm0Dx9_dWMBXo_Id4DVMFFBctKqpxAyCLf6vECe7Ix0b9TvaE
captcha*/
    // Returns the authentication tokens
    public static class createAccountForm {

        @Constraints.Required
        @Constraints.Email
        public @Getter @Setter String jsonemail;

        @Constraints.Required
        public @Getter @Setter String password;

        @Constraints.Required
        public @Getter @Setter String confirm;

        @Constraints.Required
        public @Getter @Setter String challenge;

        @Constraints.Required
        public @Getter @Setter String captcha;
    }



    public static Result createAccount(String email) throws Exception {
        HibernateSessionFactory.getSession();
        try {


            boolean userExists = WebUser.findByEmail(email);

            JSONObject jsonObject = new JSONObject();
            if (userExists) {
                jsonObject.put("success", false);
                jsonObject.put("message", "");
                return  ok(jsonObject.toString()).as("application/json");
            } else {
                Logger.debug("Create Account Started Validation");
                Form<createAccountForm> createAccountFrm = Form.form(createAccountForm.class).bindFromRequest();
                boolean error = false;
                String address = request().remoteAddress();

                Logger.debug("Create Account Started hasErrors " + createAccountFrm.hasErrors());
                if (createAccountFrm.hasErrors()) {
                    error = true;
                    jsonObject.put("success", false);
                    jsonObject.put("message", "Missing parameters [ " + createAccountFrm.globalError().message() + "]");
                    return ok(jsonObject.toString()).as("application/json");
                }

                createAccountForm createAccount = createAccountFrm.get();


                Logger.debug("Create Account validate Captcha");

                ReCaptchaImpl reCaptcha = new ReCaptchaImpl();

                //Fix HTTPS Google..
                reCaptcha.setRecaptchaServer("https://www.google.com/recaptcha/api");

                reCaptcha.setPrivateKey(play.Play.application().configuration().getString("recaptcha.privatekey"));

                ReCaptchaResponse reCaptchaResponse = reCaptcha.checkAnswer(address, createAccount.challenge, createAccount.captcha);

                String errcode = null;
                String errmsg = null;

                if (reCaptchaResponse.isValid() == false) {
                    Logger.debug("Create Account invalid Captcha");
                    error = true;
                    errcode = Errors.INVALID_CAPTCHA_RESPONSE;
                } else {

                    Logger.debug("Create Account invalid Password Compare");
                    if (createAccount.password.compareTo(createAccount.confirm) != 0) {
                        error = true;
                        errcode = Errors.INVALID_PASSWORD_CONFIRMATION;
                    }

                }

                if (error) {
                    Logger.debug("Create Account GOT ERROR");
                    jsonObject.put("success", false);
                    jsonObject.put("code", errcode);
                    jsonObject.put("message", Messages.get(errmsg));
                    return ok(jsonObject.toString()).as("application/json");
                } else {
                    WebUser u = create(createAccount.jsonemail, createAccount.password);
                    jsonObject.put("success", true);
                    jsonObject.put("message", "");
                    return ok(jsonObject.toString()).as("application/json");
                }
            }
        } catch (Exception ew) {
            Logger.debug("Create Account GOT EXCEPTION ");
            ew.printStackTrace();

            HibernateSessionFactory.rollback();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("success", false);
            jsonObject.put("message", "We apologize, new subscription is currently disabled. Please try later.");
            return ok(jsonObject.toString()).as("application/json");
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }


    private static WebUser create(String email, String password) throws Exception {
        UsernamePasswordToken upToken = new UsernamePasswordToken(email, password);

        //Get potential Existing Partner..
        Partner partner = PartnerImpl.getPartnerByEmail(email);

        if (partner == null) {
            //Must Create
            partner = new Partner();
            SecureRandom mySecureRand = new SecureRandom();
            Long secureInitializer = mySecureRand.nextLong();

            String API = Utils.getRandomGUID();
            String SALT = Utils.getRandomGUID();
            partner.setNiceName("");
            partner.setAPIKEY(Utils.hexStringToByteArray(API));
            partner.setName(email);
            partner.setSALT(SALT);
            partner.generateKeys();

            // Usually this can be a field rather than a method variable
            Random rand = new Random();

            // nextInt is normally exclusive of the top value,
            // so add 1 to make it inclusive
            Integer randomNum = rand.nextInt((1990300 - 10) + 1) + 10;

            PartnerImpl.save(partner);
            PluginManager.notifyEvent(PluginEvent.WEBUSER_PARTNER_CREATED, partner);
        }

        Long pid = partner.getId();

        SecureRandom mySecureRand = new SecureRandom();
        Long secureInitializer = mySecureRand.nextLong();

        String API = Utils.getRandomGUID();
        String SALT = Utils.getRandomGUID();

        // Usually this can be a field rather than a method variable
        Random rand = new Random();

        // nextInt is normally exclusive of the top value,
        // so add 1 to make it inclusive
        Integer randomNum = rand.nextInt((1990300 - 10) + 1) + 10;


        User theUser = UserImpl.getUserByEmail(email);

        if (theUser == null) {
            theUser = new User();
        }

        //Set null...
        theUser.setType(null);

        theUser.setLang("en");
        theUser.setEmail(email);
        theUser.setPassword(password);
        theUser.setPartner(partner);


        UserImpl.saveOrUpdate(theUser);

        PluginManager.notifyEvent(PluginEvent.WEBUSER_USER_CREATED, theUser);

        WebUser wu = new WebUser(theUser.getEmail(), theUser.getPassword(), new UsernamePasswordToken(theUser.getEmail(), theUser.getPassword()));
        if (wu.authenticate()) {
            return wu;
        } else {
            return null;
        }
    }



    public static class RecoverUpdate {

        /*
        token:5c5c1d8b-6532-40a8-92b4-8c99b99e6587
new_token:0fb6e3d3-25d5-40d4-b5fb-51e65b487d79
password:demo1
confirm:demo1

         */
        @Constraints.Required
        public @Getter @Setter String token;

        @Constraints.Required
        public @Getter @Setter String new_token;

        @Constraints.Required
        public @Getter @Setter String password;

        @Constraints.Required
        public @Getter @Setter String confirm;

    }

    public static Result recoverByEmailUpdate() throws Exception {
            try {
                Form<RecoverUpdate> recoverUpdateFrm = Form.form(RecoverUpdate.class).bindFromRequest();
                String address = request().remoteAddress();

                if (recoverUpdateFrm.hasErrors()) {
                    return notFound("");
                }
                RecoverUpdate recoverUpdate = recoverUpdateFrm.get();


                UserForgotKeys userKeys = UserForgotKeysImpl.getByIdAndRequest(recoverUpdate.token, recoverUpdate.new_token, address);

                if (userKeys == null) {
                    return SecurityController.FailedMessage("INVALID_TOKEN");
                } else {
                    //This is not needed but who knows someone may change the recoverUpdateForm
                    if (recoverUpdate.password.compareTo(recoverUpdate.confirm) == 0) {
                        //great its valid... we need to update the user now..
                        User u = UserImpl.getUserById(userKeys.getUserId());
                        u.setPassword(recoverUpdate.password);
                        u = UserImpl.saveOrUpdate(u);

                        if (u == null) {
                            return SecurityController.FailedMessage("INVALID_TOKEN");
                        } else {
                            JSONObject jsoRes = new JSONObject();
                            jsoRes.put("success", "true");
                            jsoRes.put("email", u.getEmail());
                            return ok(jsoRes.toString()).as("application/json");
                        }
                    } else {
                        return SecurityController.FailedMessage("INVALID_TOKEN");
                    }

                }
            } catch (Exception ee) {
                ee.printStackTrace();
                return SecurityController.FailedMessage("INVALID_TOKEN");
         } finally {
                HibernateSessionFactory.closeSession();
        }
    }



    public static class RecoverToken {

        @Constraints.Required
        public @Getter @Setter String token;
    }

    public static Result recoverByEmail() throws Exception {
        try {
            String token = request().getQueryString("token");
            String address = request().remoteAddress();

            if (token == null) {
                return notFound("");
            }

            String uuid = java.util.UUID.randomUUID().toString();
            if (UserForgotKeysImpl.getByIdAndLock(token, uuid, address) == null) {
                return ok(views.html.recover.render(token, ""));
            } else {
                return ok(views.html.recover.render(token, uuid));
            }
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }

    public static class Recover  {

        @Constraints.Required
        @Constraints.Email
        public @Getter @Setter String email;
    }

    public static Result recover() throws Exception {
        try {
                Form<Recover> recoverFrm = Form.form(Recover.class).bindFromRequest();
                String address = request().remoteAddress();

                if (recoverFrm.hasErrors()) {
                    return notFound("");
                }

                Recover recover = recoverFrm.get();

                UserForgotKeys token = UserForgotKeysImpl.getNewToken(recover.email, address);
                Logger.debug("WILL TOKEN IS  : " + token);
                if (token == null) {
                    return ok(forgot.render("",""));
                } else {
                    //send email
                    String tokenid = token.getTokenid();

                    Logger.debug("TOKEN ID IS : " + tokenid);

                    MailerAPI mail = play.Play.application().plugin(MailerPlugin.class).email();


                    mail.setSubject(Messages.get("EMAIL_RESET_SUBJECT"));
                    Logger.debug("WILL SEND EMAIL TO : " + recover.email);
                    mail.addRecipient(recover.email);

                    //or use a list
                    mail.addFrom("ACenterA Support <noreply@acentera.com>");
                    //sends both text and html

                    //TODO: SHould load .yml file instead using yml freemarker templating..
                    mail.send(
                            Messages.get("EMAIL_RESET_PLAIN_HEAD") + "\r\n" +
                                    Messages.get("EMAIL_RESET_PLAIN_PHRASE1") + "\r\n" +
                                    Messages.get("EMAIL_RESET_PLAIN_PHRASE2") + "\r\n" +
                                    Messages.get("EMAIL_RESET_PLAIN_LINKPHRASE_BEFORE") + " " + "https://" + request().host() + "/recoveremail?token=" + tokenid + " " + Messages.get("EMAIL_RESET_PLAIN_LINKPHRASE_AFTER") + "\r\n" +
                                    Messages.get("EMAIL_RESET_PLAIN_PHRASE3") + "\r\n" +
                                    Messages.get("EMAIL_RESET_PLAIN_PHRASE4") + "\r\n" +
                                    Messages.get("EMAIL_RESET_PLAIN_FOOTER") + "\r\n"
                            ,
                            "<html>" +
                                    Messages.get("EMAIL_RESET_HTML_HEAD") + "\r\n" +
                                    Messages.get("EMAIL_RESET_HTML_PHRASE1") + "\r\n" +
                                    Messages.get("EMAIL_RESET_HTML_PHRASE2") + "\r\n" +
                                    Messages.get("EMAIL_RESET_HTML_LINKPHRASE_BEFORE") + "&nbsp;" + "<a href='https://" + request().host() + "/recoveremail?token=" + tokenid + "'>https://" + request().host() + "/recoveremail?token=" + tokenid + "</a>&nbsp;" + Messages.get("EMAIL_RESET_PLAIN_LINKPHRASE_AFTER") + "\r\n" +
                                    Messages.get("EMAIL_RESET_HTML_PHRASE3") + "\r\n" +
                                    Messages.get("EMAIL_RESET_HTML_PHRASE4") + "\r\n" +
                                    Messages.get("EMAIL_RESET_HTML_FOOTER") + "\r\n" +
                                    "</html>"
                    );

                    return ok(forgot.render("",""));
                }
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }


}
