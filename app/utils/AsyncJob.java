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

import controllers.acentera.msgActor;
import models.web.DesktopObject;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import play.Logger;

/**
 * Created by theace on 2014-05-07.
 */
public abstract class AsyncJob {

    //Good or bad ?
    final Subject currentUser = SecurityUtils.getSubject();

    public void updateModel(JSONObject model) {
        msgActor.sendModelUpdateMessage(((DesktopObject)currentUser.getSession().getAttribute("desktop")), model);
    }
    public AsyncJob() {
          Logger.debug("CREATED AsyncJob with user : " + currentUser);
          Logger.debug("CREATED AsyncJob with user Principal : " + currentUser.getPrincipal());
    }
    public void execute() {
        currentUser.execute(new Runnable() {
            @Override
            public void run() {
                executeJob();
            }
        });
    }

    protected abstract void executeJob();
}
