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

package plugins;

import play.Logger;

import java.lang.reflect.Method;

/**
 * Created by theace on 2014-04-17.
 */
public class PluginManager {

    static PluginManager _instance = null;

    private PluginManager() {

    }

    public static PluginManager getInstance() {
        if (_instance == null) {
            synchronized(PluginManager.class) {
                if (_instance == null) {
                    _instance = new PluginManager();
                }
            }
        }
        return _instance;
    }

    public static void registerPlugin(PluginEvent pluginEvent, Object e) throws Exception {

        //TODO: HashMap setup..
    }

    public static void notifyEvent(PluginEvent pluginEvent, Object... a) throws Exception {

        /*
        StackTraceElement[] stacktrace=  Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[2];
        //String methondName = e.getMethodName();
        */

        //TODO Notify.. using an HashMap plugin would register temselves...
        getInstance();


        if (PluginEvent.WEBUSER_PARTNER_CREATED == pluginEvent) {
            try {
                //TODO: Implement private.models.WebUser
                Class customClass = Class.forName("com.acentera.private.models.WebUser");
                Object obj = customClass.newInstance();
                Method method = customClass.getMethod("partnerCreated", a.getClass());
                method.invoke(obj, a);
            } catch (Exception e) {
                Logger.debug("TODO : Implement");
                //e.printStackTrace();
            }
        }

    }

    public static void unloadAll() {
        //TODO: Unload..
        synchronized(PluginManager.class) {
            if (_instance != null) {

                //Perform plugin Cleanup's
                _instance = null;
            }
        }

    }
}
