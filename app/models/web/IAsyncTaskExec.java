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

package models.web;


import controllers.acentera.Message;
import models.web.DesktopObject;
import net.sf.json.JSONObject;
import play.Logger;

public abstract class IAsyncTaskExec {

    protected boolean canRun = true;
    protected long runInterval = 0;
    protected long lastRunTime = 0;

    protected JSONObject jsoObject = new JSONObject();
    private Object parent;

    protected IAsyncTaskExec() {
       Logger.error("error never call this without constructor");
    }


    public IAsyncTaskExec(Object parent, Long runInterval) {
        this.parent = parent;
        lastRunTime = System.currentTimeMillis() / 1000L;

        //30 seconds minimum
        if (runInterval <= 30) {
            this.runInterval = 30;
        } else {
            this.runInterval = runInterval;
        }
    }

    public boolean canRun(Long currentTime) {
        if (!this.canRun) {
             return false;
        }

        if (lastRunTime + runInterval <= currentTime) {
            return true;
        }

        return false;
    }

    public JSONObject getJsoObject() {
        return this.jsoObject;
    }


    public Message execute(DesktopObject data) {
        this.lastRunTime = System.currentTimeMillis() / 1000L;
        return executePrivate(data);
    }

    protected abstract Message executePrivate(DesktopObject data);

    public void destroy() {
        canRun = false;
    }

    public Object getParent() {
        return this.parent;
    }


}
