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

import models.web.DesktopObject;
import models.web.WebSession;
import net.sf.json.JSONObject;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;


//User must be authenticated to access the Comet servlet
@With(SecurityController.class)
public class CometJavaServlet extends Controller {


    public static Result create () {
        Logger.debug(" GOT CREATE ");
        WebSession webSession = SecurityController.getWebSession();

        String dtid =  webSession.addDesktop();

        JSONObject jsoRes = new JSONObject();
        jsoRes.put("success", true);
        jsoRes.put(SecurityController.DESKTOP_TOKEN, dtid);

        ctx().response().setHeader("Access-Control-Allow-Origin", "*");

        Logger.debug("[ Comet ] - Created [  desktop : " + dtid + ",  " + SecurityController.getWebSession().getToken() + " ]");
        return ok(jsoRes.toString()).as("application/json");
    }


    public static Result destroy(String desktopId) {
        DesktopObject dobj = SecurityController.getDesktop();

        dobj.destroy();

        Logger.debug("Destroy [  desktop : " + desktopId + ",  " + SecurityController.getWebSession().getToken() + " ]");


        JSONObject jsoRes = new JSONObject();
        jsoRes.put("success", true);
        jsoRes.put(SecurityController.DESKTOP_TOKEN, "");

        ctx().response().setHeader("Access-Control-Allow-Origin", "*");
        return ok(jsoRes.toString()).as("application/json");
    }

}
