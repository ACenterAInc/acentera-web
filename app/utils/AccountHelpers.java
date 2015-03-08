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

package utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.db.Partner;
import models.db.User;
import models.db.acentera.impl.PartnerImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import play.Logger;

/**
 * Created by theace on 2014-04-23.
 */
public class AccountHelpers {

    public static JSONObject getUserJson(User u) {
        try {
            Partner partner = PartnerImpl.getPartnerById(u.getPartnerId());
            Gson g = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
            String k = g.toJson(u);
            Logger.debug("JSON : " + k);
            JSONObject jso = JSONObject.fromObject(k);

            jso.put("company", partner.getNiceName());
            jso.put("cloudid", partner.getCloudId());
            jso.put("tosAccepted", true);

            float funds = partner.getFunds();
            float cost = partner.getMonthlycost();


            float totalcost = partner.getTotalcost();
            float minus = funds - totalcost;

            java.text.DecimalFormat twoDigitFormat = new java.text.DecimalFormat("####0.00");
            if (funds - totalcost < 0) {
                jso.put("fundsnegative", 1);
                float neg = java.lang.Float.parseFloat("-1");

                jso.put("funds", twoDigitFormat.format((minus * neg)));
            } else {
                jso.put("fundsnegative", 0);
                jso.put("funds", "" + twoDigitFormat.format((funds - totalcost)));
            }
            jso.put("monthCost", "" + twoDigitFormat.format(cost));

            JSONObject jsoRes = new JSONObject();
            JSONArray jsoArr = new JSONArray();
            jsoArr.add(jso);

            jsoRes.put("account", jsoArr.toString());
            return jsoRes;

        } catch (Exception ee) {
            ee.printStackTrace();
            return new JSONObject();
        }

    }
}
