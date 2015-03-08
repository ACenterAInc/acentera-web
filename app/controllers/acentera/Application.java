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

import controllers.AssetsBuilder;
import org.apache.shiro.session.ExpiredSessionException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import play.api.mvc.AnyContent;
import play.api.mvc.Action;
import play.mvc.*;
import play.*;
import play.mvc.*;

import views.html.*;


public class Application extends Controller {

    private static AssetsBuilder delegate = new AssetsBuilder();

    //public static Action<AnyContent> asset(String path, String file) {
    //     return controllers.Assets.at(path, file);
    //}


    @With(AnonymousSecurityController.class)
    public static Result index() {


        if (request().cookie(SecurityController.AUTH_TOKEN) != null) {
            Logger.debug("APPLICATION RETURN INDEX -> " + play.Play.application().configuration().getString("application.env"));
            //Still need to have a subject
            try {
                Subject s = SecurityController.getSubject();

                Session ss = SecurityController.getSession();

                Logger.debug("Principal is : " + s.getPrincipal());

                if (ss == null || s.getPrincipal() == null) {
                    throw new ExpiredSessionException("Expired");
                }

                Logger.debug("AuthtneicateD ? " + s.isAuthenticated());
            } catch (Exception error) {
                //In case we have other exceptions
                SecurityController.logout(ctx());
                return redirect("/");
            }

            return ok(index.render("ACenterA Cloud", 1, play.Play.application().configuration().getString("application.env"), "user"));
        } else {
            return ok(login.render("login", ""));
        }
    }

    @With(SecurityController.class)
    public static Result indexWithPath( String path ) {

        String[] t = request().headers().get("referer");
        String host = request().getHeader("Host");

        response().setHeader("PRAGMA", "no-cache");
        response().setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response().setHeader("EXPIRES", "Sat, 16-Mar-2000 01:11:11 GMT");

        try {
            Subject s = SecurityController.getSubject();

            Session ss = SecurityController.getSession();

            Logger.debug("With Security Principal is : " + s.getPrincipal());
            if (ss == null || s.getPrincipal() == null) {
                throw new ExpiredSessionException("Expired");
            }
            Logger.debug("AuthtneicateD ? " + s.isAuthenticated());
        } catch (Exception error) {
            //In case we have other exceptions
            error.printStackTrace();
            SecurityController.logout(ctx());
            return redirect("/");
        }

        if ((t != null) && (t.length > 0)) {
            String referer = t[0];
            response().setHeader("REDIRECT", "");


            return ok(index.render("ACenterA Cloud", 1, play.Play.application().configuration().getString("application.env"), "user"));

        } else {
            response().setHeader("REDIRECT", "");
            return redirect("/#" + request().path());
        }
    }


}
