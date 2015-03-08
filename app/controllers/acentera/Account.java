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

import models.db.Partner;
import models.db.User;
import models.db.acentera.impl.PartnerImpl;
import models.db.acentera.impl.UserImpl;
import models.web.WebUser;
import net.sf.json.JSONObject;
import play.Logger;
import play.mvc.Result;
import play.mvc.With;
import utils.AccountHelpers;

@With(SecurityController.class)
public class Account extends ACenterAController {

    public static Result getAccount() {
         try {
             return OkJsonResult(AccountHelpers.getUserJson(getUser()));
         } catch (Exception ee) {

             session().remove(SecurityController.AUTH_TOKEN);
             session().remove(SecurityController.DESKTOP_TOKEN);
             response().discardCookie(SecurityController.AUTH_TOKEN);
             response().discardCookie(SecurityController.DESKTOP_TOKEN);

             try {
                 SecurityController.getSubject().logout();
             } catch (Exception ex) {

             }

             return redirect("logout");
         }
    }


    //We could of done two API Functions but since Ember only have a ".save" action, it is easier to do it in 1 item.
    //we used a "fake" - "action" method..
    //Update current logged in account (the ID must match the session ID)
    public static Result updateAccount() throws Exception {

        JSONObject jsonData = getPostBodyAsJson("account");

        User u = getUser();

        Logger.debug("GOT JSON :"  + jsonData);

        //You can only update yourselves...
        //Currently we do not support updating another user account
        if (u.getId() != jsonData.getLong("id")) {

            //TODO: if (checkPermission("superAdmin") ...
            //Super admin could update anyone...
            return FailedMessage("UNAUTHORIZED");
        }

        if (jsonData.getString("action").compareTo("updatePassword") == 0) {
            //End-User want to update its password lets first validate its current password
            if (!(confirmUserPassword(u, jsonData.getString("password_current")))) {
                return FailedMessage("INVALID_PASSWORD");
            } else {
                if (jsonData.getString("password").compareTo(jsonData.getString("password_confirm")) == 0) {
                    //Ok the password matches..
                    if (jsonData.getString("password").compareTo(jsonData.getString("password_current")) == 0) {
                        //Same password do we prevent it or not ?
                    } else {
                        u.setPassword(jsonData.getString("password_confirm"));
                        u = UserImpl.saveOrUpdate(u);
                    }
                    OkJsonResult(AccountHelpers.getUserJson(u));
                } else {
                    FailedMessage("PASSWORD_UPDATE_CONFIRM_PASSWORD_DOES_NOT_MATCH");
                }
            }
        } else if (jsonData.getString("action").compareTo("updateUserAccount") == 0) {
            //End-User want to update its userAccount

            u.setFirstName(jsonData.getString("firstName"));
            u.setLastName(jsonData.getString("lastName"));
            u.setEmail(jsonData.getString("email"));
            u.setLang(jsonData.getString("lang"));


            Partner p = PartnerImpl.getPartner(u.getPartnerId());
            p.setNiceName(jsonData.getString("company"));
            p.setName(jsonData.getString("email"));
            p = PartnerImpl.save(p);
            u = UserImpl.saveOrUpdate(u);

            //JPA.em("default").flush()
            OkJsonResult(AccountHelpers.getUserJson(u));
        } else {
            return FailedMessage("INVALID_OPERATION");
        }
        return OkJsonResult(AccountHelpers.getUserJson(getUser()));
    }



}
