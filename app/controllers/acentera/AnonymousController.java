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
import models.web.DesktopObject;
import models.web.WebSession;
import net.sf.json.JSONObject;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import utils.security.PasswordEncoder;

import java.util.Iterator;
import java.util.Map;


public abstract class AnonymousController extends Controller {


    /*public static Result OkEmptyJsonResult() {
        return ok("{ \"status\": true, \"message\":\"Success\" }").as("application/json");
    }*/

    public static Result OkEmptyJsonResult() {
        return noContent().as("application/json");
    }


    public static Result OkCreatedJsonResult(JSONObject jsoRes) {
        return created(jsoRes.toString()).as("application/json");
    }

    public static Result OkCreatedJsonResult(String  res) {
        return created(res).as("application/json");
    }

    public static Result OkJsonResult(String res) {
        return ok(res.toString()).as("application/json");
    }

    public static Result OkJsonResult(JSONObject jsoRes) {
         return ok(jsoRes.toString()).as("application/json");
    }
    //SecurityController

    public static String getEmail() { return SecurityController.getEmail(); }

    public static User getUser() {
        return SecurityController.getUser();
    }

    public static WebSession getWebSession() {
        return SecurityController.getWebSession();
    }

    public static DesktopObject getDesktop() {
        return SecurityController.getDesktop();
    }


    public static Result InternalServerError(String msg) { return SecurityController.InternalServerError(msg);}
    public static Result FailedMessage(String msg) { return SecurityController.FailedMessage(msg);}
    public static Result FailedMessage(String msg, Exception e) { return SecurityController.FailedMessage(msg);}

    public static JSONObject getPostBodyAsJson(String key) {
        try {
            return JSONObject.fromObject(request().body().asJson().get(key).toString());
        } catch (Exception eee) {
            return new JSONObject();
        }
    }
    public static JSONObject getPostBodyAsJson() {
        try {
            return JSONObject.fromObject(request().body().asJson().toString());
        } catch (Exception ee) {
            Map<String, String[]> m = request().body().asFormUrlEncoded();
            if( m != null) {
                if (m.keySet().size() > 0) {
                    Iterator<Map.Entry<String, String[]>> itr = m.entrySet().iterator();
                    JSONObject jso = new JSONObject();
                    while (itr.hasNext()) {
                        Map.Entry<String, String[]> e = itr.next();
                        try {
                            jso.put(e.getKey(), e.getValue()[0]);
                        } catch (Exception error) {

                        }
                    }
                    return jso;
                }
            }
        }



        return new JSONObject();
    }

    public static boolean confirmUserPassword(User u, String password) throws Exception {
        return (PasswordEncoder.getInstance().encode(password, u.getSalt()).compareTo(u.getPassword()) == 0);
    }

}
