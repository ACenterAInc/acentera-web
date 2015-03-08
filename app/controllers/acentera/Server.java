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

import com.fasterxml.jackson.core.JsonProcessingException;
import net.sf.json.JSONObject;
import play.mvc.Result;
import play.mvc.With;
import com.acentera.utils.ProjectsHelpers;


@With(SecurityController.class)
public class Server extends ACenterAController {


    @With(UserPasswordRequire.class)
    public static Result shutdownServer(Long projectId, Long serverId) throws Exception {
        JSONObject jsonData = getPostBodyAsJson();

        String response = ProjectsHelpers.shutdownServer(projectId, serverId);

        return OkJsonResult(response);
    }

    @With(UserPasswordRequire.class)
    public static Result poweronServer(Long projectId, Long serverId) throws Exception {
        JSONObject jsonData = getPostBodyAsJson();

        String response = ProjectsHelpers.poweronServer(projectId, serverId);

        return OkJsonResult(response);
    }

    @With(UserPasswordRequire.class)
    public static Result restartServer(Long projectId, Long serverId) throws Exception {
        JSONObject jsonData = getPostBodyAsJson();

        String response = ProjectsHelpers.restartServer(projectId, serverId);

        return OkJsonResult(response);
    }

    @With(UserPasswordRequire.class)
    public static Result resizeServer(Long projectId, Long serverId) throws Exception {
        JSONObject jsonData = getPostBodyAsJson();

        String response = ProjectsHelpers.resizeServer(projectId, serverId, jsonData.getInt("size_id"));

        return OkJsonResult(response);
    }


    @With(UserPasswordRequire.class)
    public static Result destroyServer(Long projectId, Long serverId) throws Exception {
        JSONObject jsonData = getPostBodyAsJson();

        String response = ProjectsHelpers.destroyServer(projectId, serverId);

        return OkJsonResult(response);
    }

    public static Result updateServer(Long projectId, Long serverId) throws JsonProcessingException {

        JSONObject jsonData = getPostBodyAsJson();

        String response = ProjectsHelpers.updateServer(projectId, serverId, jsonData);

        return OkJsonResult(response);
    }




}
