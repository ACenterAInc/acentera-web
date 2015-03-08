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
import net.sf.json.JSONObject;
import play.Logger;
import play.libs.F;
import play.mvc.*;
import utils.security.PasswordEncoder;

public class UserPasswordRequire extends SecurityController {


    @Override
    protected F.Promise<Result> processRequest(Http.Context ctx) throws Throwable {

        Logger.debug(" [ UserPasswordRequire ] - Start ");
        try {
            JSONObject jsonData = getPostBodyAsJson(ctx);
            if (confirmUserPassword(ctx, getUser(ctx), jsonData.getString("password"))) {
                F.Promise<Result> z = delegate.call(ctx);
                return z;
            } else {
                return NotAuthorized();
            }
        } finally {
            Logger.debug(" [ UserPasswordRequire ] - Completed ");
        }
    }


    public F.Promise<Result> NotAuthorized() {
        return play.libs.F.Promise.pure((Result) forbidden("{ \"error\": \"not authorized\" }").as("application/json"));
    }

    public static JSONObject getPostBodyAsJson(Http.Context ctx, String key) {
        return JSONObject.fromObject(ctx.request().body().asJson().get(key).toString());
    }
    public static JSONObject getPostBodyAsJson(Http.Context ctx) {
        return JSONObject.fromObject(ctx.request().body().asJson().toString());
    }

    public static boolean confirmUserPassword(Http.Context ctx, User u, String password) throws Exception {
        return (PasswordEncoder.getInstance().encode(password, u.getSalt()).compareTo(u.getPassword()) == 0);
    }

    public static User getUser(Http.Context ctx) {
        try {
            return (User) Http.Context.current().args.get("user");
        } catch (Exception ee) {
            ee.printStackTrace();
            return (User) getSubject().getSession().getAttribute("user");
        }
    }


}
