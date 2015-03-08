(function() {
              var template = Ember.Handlebars.template,
                  templates = Ember.TEMPLATES = Ember.TEMPLATES || {};
                         
templates['application'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n <div id=\"wrap\">\n     ");
        data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data}, helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
        data.buffer.push("\n      <div id=\"top\">\n          <!-- .navbar -->\n          <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n              <!-- Brand and toggle get grouped for better mobile display -->\n              <header class=\"navbar-header row col-lg-3\">\n\n                  <div class=\"col-lg-6\">\n                  </div>\n\n                  <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\n                      <span class=\"sr-only\">Toggle navigation</span>\n                      <span class=\"icon-bar\"></span>\n                      <span class=\"icon-bar\"></span>\n                      <span class=\"icon-bar\"></span>\n                  </button>\n                  <div class=\"col-lg-2\">\n                      <a href=\"/#/\" class=\"navbar-brand\">\n                          <div>\n                              <img class=\"logo\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"src":("logo")}, hashTypes:{"src":"STRING"}, hashContexts:{"src":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("/>\n                          </div>\n                      </a>\n                  </div>\n              </header>\n\n\n              <div class=\"topnav\">\n\n                  <div class=\"btn-toolbar\">\n                     ");
        stack1 = helpers["if"].call(depth0, "hasLoaded", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                  </div>\n\n              </div>\n\n\n\n              <!-- /.topnav -->\n\n              <div class=\"navbar-collapse navbar-ex1-collapse collapse\">\n                  <!-- .nav -->\n                  <ul class=\"nav highres navbar-nav text-center\">\n                      <!--\n                      <li>\n                          <a data-placement=\"bottom\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "menu1", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(">\n                              Menu1\n                          </a>\n                      </li>\n                      -->\n                      <!--\n                      <li class=\"row col-lg-3\">\n                          <a data-parent=\"#menu\" data-toggle=\"collapse\" class=\"accordion-toggle collapsed col-lg-2\" data-target=\"#dashboard-top-nav\">\n                                Menu2\n                                <i class=\"icon-angle-down\"></i>\n                          </a>\n                      </li>\n                      <ul class=\"collapse col-lg-4\" id=\"dashboard-top-nav\" style=\"top:40px;height:100px\">\n                      <li class=\"\">\n                          <a id='dashboards_servers_leftmenu' class=\"pointer\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "goto", "serversinfo.index", "context", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "STRING", "ID"], data:data})));
        data.buffer.push("><i class=\"icon-angle-right\"></i> Servers</a>\n                      </li>\n                      <li class=\"\">\n                          <a class=\"pointer\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "goto", "databases", "context", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "STRING", "ID"], data:data})));
        data.buffer.push("><i class=\"icon-angle-right\"></i> Database Activity</a>\n                      </li>\n                      <li class=\"\">\n                        <br/>\n                      </li>\n                    </ul>\n                  -->\n\n                  </ul>\n\n\n                  <ul class=\"nav smalldeviceonly navbar-nav text-center\">\n                      <li>\n                          <a data-placement=\"bottom\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(">\n                              Logout\n                          </a>\n                      </li>\n                  </ul>\n                  <!-- /.nav -->\n              </div>\n\n\n              <div class=\"head col-lg-12\">\n                  ");
        data.buffer.push(escapeExpression((helper = helpers["topbar-view"] || (depth0 && depth0["topbar-view"]), options = {hash:{"template_nameBinding":("controller.topbarView"), "contentBinding":("topbarModel"), "topbarTemplateBinding":("controller.topbarTemplate"), "elementId":("topMenu")}, hashTypes:{"template_nameBinding":"STRING", "contentBinding":"STRING", "topbarTemplateBinding":"STRING", "elementId":"STRING"}, hashContexts:{"template_nameBinding":depth0, "contentBinding":depth0, "topbarTemplateBinding":depth0, "elementId":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "topbar-view", options))));
        data.buffer.push("\n\n                  \n\n              </div>\n              <!-- /.head -->\n          </nav>\n          <!-- /.navbar -->\n      </div>\n      <!-- /#top -->\n\n      <div id=\"left\" class=\"padTop50\">\n          <!-- #menu -->\n          <ul id=\"menu\" class=\"collapse affix\">\n            ");
        stack1 = helpers["if"].call(depth0, "hasLoaded", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n          </ul>\n          <!-- /#menu -->\n      </div>\n      <!-- /#left -->\n\n      <div id=\"content\">\n          <div class=\"outer\">\n              <div id=\"innercontent\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":(":inner selectedProject:havetopbar:notopbar")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" style=\"height:800px\">\n                  <div class=\"col-lg-12\" >\n                      <div id=\"outletcontent\">\n                          <div class=\"container-fluid col-lg-12\">\n                              <div class=\"row row-fluid\">\n                                     ");
        stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                              </div>\n                          </div>\n                      </div>\n                      <div id=\"lastElement\">&nbsp;</div>\n                  </div>\n              </div>\n              <!-- end .inner -->\n          </div>\n          <!-- end .outer -->\n      </div>\n      <!-- end #content -->\n </div>\n <!-- /#wrap -->\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                          <!--\n                              <div class=\"btn-group\">\n                                  <a data-placement=\"bottom\" data-original-title=\"Show / Hide Sidebar\" data-toggle=\"tooltip\" class=\"btn btn-success btn-sm\" id=\"changeSidebarPos\">\n                                      <i class=\"icon-resize-horizontal\"></i>\n                                  </a>\n                              </div>\n                          -->\n\n                          <ul class=\"nav navbar-nav\">\n                              <li><div class=\"whitetext\" style=\"float:left\"><a href=\"/admin/\">Admin</a></div></li>\n                              <li><div class=\"whitetext\" disabled>");
        stack1 = helpers._triageMustache.call(depth0, "account.email", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</div></li>\n                          </ul>\n\n                          <div class=\"btn-group\">\n                              <a data-toggle=\"tooltip\" data-original-title=\"Logout\" data-placement=\"bottom\" class=\"btn btn-metis-5 btn-sm\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" >\n                                  <i class=\"fa fa-2x fa-sign-out\"></i>\n                              </a>\n                          </div>\n                     ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <li class=\"nav-header\">Menu</li>\n                <li class=\"nav-divider\"></li>\n\n                ");
        data.buffer.push(escapeExpression((helper = helpers["leftmenu-view"] || (depth0 && depth0["leftmenu-view"]), options = {hash:{"template_nameBinding":("controller.leftmenuTemplate"), "modelBinding":("controller.leftmenuModel"), "elementId":("leftMenu")}, hashTypes:{"template_nameBinding":"STRING", "modelBinding":"STRING", "elementId":"STRING"}, hashContexts:{"template_nameBinding":depth0, "modelBinding":depth0, "elementId":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "leftmenu-view", options))));
        data.buffer.push("\n\n\n            ");
        return buffer;
    }
    data.buffer.push("<!-- THIS IS THE APPLICATION, By Default we just include a container which is fluid... -->\n<!-- THE JS Will include the proper routing inside the ember outlet -->\n<div class=\"container-fluid\">\n\n <div id=\"hidTransparentDiv\"  class=\"visible\" style=\"background-color:trasnparent;width:100%;height:100%;z-index:3000;position:fixed;top:0px;left:0px;opacity:0.0;filter:alpha(opacity=0); /* For IE8 and earlier */\"></div>\n <div id=\"hidDiv\"  class=\"visible\" style=\"background-color:grey;width:100%;height:100%;z-index:3000;position:fixed;top:0px;left:0px;opacity:0.4;filter:alpha(opacity=40); /* For IE8 and earlier */\"></div>\n <div id=\"hidImg\" class=\"visible\" style=\"z-index:3001;position:fixed;top:40%;left:50%;\"><img src=\"/assets/images/loading.gif\"></div>\n\n");
    stack1 = helpers["if"].call(depth0, "hasLoaded", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n <!-- #helpModal -->\n <div id=\"helpModal\" class=\"modal fade\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\"></h4>\n            </div>\n            <div class=\"modal-body\">\n                <p>\n                </p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n </div><!-- /.modal -->\n <!-- /#helpModal -->\n\n\n <div id=\"footer\">\n     <p>2013 &copy; ACenterA</p>\n </div>\n</div>\n\n\n\n");
    return buffer;
}
);


templates['components'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    data.buffer.push("\n\n");
}
);


templates['servers'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, self = this, helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        data.buffer.push("\n                <i class=\"fa fa-plus fa-2x\" data-original-title=\"Create a new server.\" data-toggle=\"tooltip\"></i>\n                <span>New Server</span>\n            ");
    }
    data.buffer.push("\n\n<div class=\"row\">\n    <div class=\"col-lg-1\">\n    </div>\n    <div class=\"centered col-lg-8 text-center\">\n            ");
    stack1 = (helper = helpers.linkTo || (depth0 && depth0.linkTo), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project", options) : helperMissing.call(depth0, "linkTo", "project", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n    </div>\n\n</div>\n\n\n");
    data.buffer.push(escapeExpression((helper = helpers["projectlist-table"] || (depth0 && depth0["projectlist-table"]), options = {hash:{"dataBinding":("projects"), "isLoaded":("view.loaded"), "tableId":("project_table"), "template_name":("components/table/serverlist"), "clickRoute":("project.index")}, hashTypes:{"dataBinding":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "projectlist-table", options))));
    data.buffer.push("\n\n\n\n\n\n");
    return buffer;
}
);


templates['topbar'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var stack1, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n\n");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("topbarTemplate"), "param2":("single")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("topbarTemplate"), "param2":("dual")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(10, program10, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    <div class=\"main-bar col-lg-12\">\n            <h3><i ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("breadcrumb.icon")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("></i>\n                ");
        stack1 = helpers.each.call(depth0, "v", "in", "breadcrumb", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            </h3>\n    </div>\n\n");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                    ");
        stack1 = helpers["if"].call(depth0, "v.visible", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                        ");
        stack1 = helpers["if"].call(depth0, "v.hasNext", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(8, program8, data), fn:self.program(5, program5, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                    ");
        return buffer;
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                            <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "goto", "v.routename", "v.model", "v.parent", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0, depth0], types:["ID", "ID", "ID", "ID"], data:data})));
        data.buffer.push(">\n                                ");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            </a>\n                            ");
        stack1 = helpers["if"].call(depth0, "v.hasNext", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(6, program6, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        ");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n                                <i class=\"icon-double-angle-right\"></i>\n                            ");
    }
    function program8(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                            ");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        <div class=\"search-bar col-lg-3\">\n            <!--\n                <a data-original-title=\"Show/Hide Menu\" data-placement=\"bottom\" data-tooltip=\"tooltip\" class=\"accordion-toggle btn btn-primary btn-sm visible-xs\" data-toggle=\"collapse\" href=\"#menu\" id=\"menu-toggle\">\n                    <i class=\"icon-sort\"></i>\n                </a>\n             -->\n\n            <div class=\"search-bar-inner text-center\">\n                <div class='dropdown'>\n                    ");
        stack1 = helpers["if"].call(depth0, "hasLoaded", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(11, program11, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            </div>\n        </div><!-- .\"search-bar -->\n        <div class=\"main-bar col-lg-7\">\n            ");
        stack1 = helpers["if"].call(depth0, "hasLoaded", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(17, program17, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        </div>\n");
        return buffer;
    }
    function program11(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n                        ");
        stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(14, program14, data), fn:self.program(12, program12, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 1, "controller.projects.length", options) : helperMissing.call(depth0, "equalObject", 1, "controller.projects.length", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n                    ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                            <div class=\"dropdown-toggle search-bar-dropdown\" >\n                                ");
        stack1 = helpers._triageMustache.call(depth0, "controller.selectedProject.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            </div>\n                        ");
        return buffer;
    }
    function program14(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" style=\"padding-top:8px;padding-left:1px;color: #fff;cursor:pointer;\">\n                                    ");
        stack1 = helpers._triageMustache.call(depth0, "controller.selectedProject.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("<b class=\"caret search-bar-caret\"></b>\n                                </div>\n                                <ul class=\"dropdown-menu dropdown-leftmenu\">\n                                    ");
        stack1 = helpers.each.call(depth0, "v", "in", "controller.projects", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(15, program15, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                                    \n                                </ul>\n                        ");
        return buffer;
    }
    function program15(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                        <li><a style=\"cursor:pointer;\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeContext", "v", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</a></li>\n                                    ");
        return buffer;
    }
    function program17(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <h3><i ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("breadcrumb.icon")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("></i>\n                    ");
        stack1 = helpers.each.call(depth0, "v", "in", "breadcrumb", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(18, program18, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </h3>\n            ");
        return buffer;
    }
    function program18(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n\n\n                        ");
        stack1 = helpers["if"].call(depth0, "v.visible", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(19, program19, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                    ");
        return buffer;
    }
    function program19(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                            ");
        stack1 = helpers["if"].call(depth0, "v.hasNext", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(24, program24, data), fn:self.program(20, program20, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        ");
        return buffer;
    }
    function program20(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                ");
        stack1 = helpers["if"].call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(21, program21, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            ");
        return buffer;
    }
    function program21(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                    <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "goto", "v.routename", "v.model", "v.parent", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0, depth0], types:["ID", "ID", "ID", "ID"], data:data})));
        data.buffer.push(">\n                                            ");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                                    </a>\n                                    ");
        stack1 = helpers["if"].call(depth0, "v.hasNext", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(22, program22, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                                ");
        return buffer;
    }
    function program22(depth0, data) {
        data.buffer.push("\n                                        <i class=\"icon-double-angle-right\"></i>\n                                    ");
    }
    function program24(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                ");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            ");
        return buffer;
    }
    stack1 = helpers["if"].call(depth0, "hasLoaded", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    } else {
        data.buffer.push("");
    }
}
);


templates['components/image_selection'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    <div id=\"distributions\">\n        ");
        stack1 = helpers.each.call(depth0, "distro", "in", "distros", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n    </div>\n  ");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n            <div class=\"distro\">\n                ");
        stack1 = helpers["if"].call(depth0, "distro.selected", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(5, program5, data), fn:self.program(3, program3, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            </div>\n        ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                    <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("distro.name")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectDistro", "distro", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">\n                        ");
        stack1 = helpers._triageMustache.call(depth0, "distro.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        <div class=\"icon selected\"></div>\n                    </a>\n                ");
        return buffer;
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                    <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("distro.name")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectDistro", "distro", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">\n                        ");
        stack1 = helpers._triageMustache.call(depth0, "distro.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        <div class=\"icon\"></div>\n                    </a>\n                ");
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    <div class=\"row smallmargin\">\n    ");
        stack1 = helpers.each.call(depth0, "img", "in", "availableImages", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(8, program8, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    </div>\n");
        return buffer;
    }
    function program8(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("img.distribution"), "param2":("selectedDistro.name"), "v":("view.selectedImage.id")}, hashTypes:{"param1":"ID", "param2":"ID", "v":"ID"}, hashContexts:{"param1":depth0, "param2":depth0, "v":depth0}, inverse:self.noop, fn:self.program(9, program9, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program9(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n                    ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("img.id"), "param2":("view.v")}, hashTypes:{"param1":"ID", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(10, program10, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                    ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("img.id"), "param2":("view.v")}, hashTypes:{"param1":"ID", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(12, program12, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                        <div class=\"col-lg-3 btn btn-primary active smallmargin\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectImage", "img", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">\n                            ");
        stack1 = helpers._triageMustache.call(depth0, "img.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("<br/>\n                        </div>\n                    ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                        <div class=\"col-lg-3 btn btn-inverse-grey smallmargin\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectImage", "img", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">\n                            ");
        stack1 = helpers._triageMustache.call(depth0, "img.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("<br/>\n                        </div>\n                    ");
        return buffer;
    }
    data.buffer.push("\n<div class=\"row col-lg-12 text-left\">\n    <div class=\"col-lg-1 text-left\"></div>\n    <div class=\"col-lg-5 text-center\">\n        <h3>Select your OS</h3>\n    </div>\n</div>\n\n<div class=\"row col-lg-12 text-center\">\n  ");
    stack1 = helpers["if"].call(depth0, "distros", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n</div>\n");
    stack1 = helpers["if"].call(depth0, "availableImages", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    return buffer;
}
);


templates['components/no_databases'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        data.buffer.push("\n        Create a Database\n    ");
    }
    data.buffer.push("<div class=\"row-fluid col-lg-12 text-center\">\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    You do not have any databases created.\n    <br/>\n    <br/>\n\n    ");
    stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("btn btn-primary btn-lg")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.database.create.index", options) : helperMissing.call(depth0, "link-to", "project.database.create.index", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n</div>");
    return buffer;
}
);


templates['components/password_confirm'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"form-group mediumtopmargin\">\n    <label class=\"control-label col-lg-4\">Password</label>\n\n    <div class=\"col-lg-8\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"type":("password"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "valueBinding":("password"), "placeholder":("Enter your password to confirm."), "class":("passwordTextField"), "elementId":("password")}, hashTypes:{"type":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "valueBinding":"STRING", "placeholder":"STRING", "class":"STRING", "elementId":"STRING"}, hashContexts:{"type":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "valueBinding":depth0, "placeholder":depth0, "class":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n    </div>\n    <br/>\n</div>");
    return buffer;
}
);


templates['components/pricing_description'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        data.buffer.push("\n        New York 1\n        ");
    }
    function program3(depth0, data) {
        data.buffer.push("\n        New York 2\n        ");
    }
    function program5(depth0, data) {
        data.buffer.push("\n        San Fransico 1\n        ");
    }
    function program7(depth0, data) {
        data.buffer.push("\n        San Fransico 2\n        ");
    }
    function program9(depth0, data) {
        data.buffer.push("\n        Amsterdam 1\n        ");
    }
    function program11(depth0, data) {
        data.buffer.push("\n        Amsterdam 2\n        ");
    }
    function program13(depth0, data) {
        data.buffer.push("\n        Singapore 1\n        ");
    }
    function program15(depth0, data) {
        data.buffer.push("\n        The Application size :\n        ");
    }
    function program17(depth0, data) {
        data.buffer.push("\n        The Database size :\n        ");
    }
    function program19(depth0, data) {
        data.buffer.push("\n        512MB, 1CPU, 20GB SSD\n\n        <br/>\n        <br/>\n\n\n        ");
    }
    function program21(depth0, data) {
        data.buffer.push("\n        1GB, 1CPU, 30GB SSD\n\n        <br/>\n        <br/>\n\n        ");
    }
    function program23(depth0, data) {
        data.buffer.push("\n        2GB, 2CPU, 40GB SSD\n\n        <br/>\n        <br/>\n\n        ");
    }
    function program25(depth0, data) {
        data.buffer.push("\n        4GB, 2CPU, 60GB SSD\n\n        <br/>\n        <br/>\n\n        ");
    }
    function program27(depth0, data) {
        data.buffer.push("\n        8GB, 4CPU, 80GB SSD\n        <br/>\n        <br/>\n\n        ");
    }
    function program29(depth0, data) {
        data.buffer.push("\n        16GB, 8CPU, 160GB SSD\n        <br/>\n        <br/>\n        ");
    }
    function program31(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n              The monthly cost is ");
        stack1 = helpers._triageMustache.call(depth0, "sizemonthlyCost", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("$/month/server\n        ");
        return buffer;
    }
    data.buffer.push("\n     <div class=\"row\">\n        Current Cluster Region (Master) :\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "nyc1", "region", options) : helperMissing.call(depth0, "equalObject", "nyc1", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "nyc2", "region", options) : helperMissing.call(depth0, "equalObject", "nyc2", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "sfo1", "region", options) : helperMissing.call(depth0, "equalObject", "sfo1", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "sfo2", "region", options) : helperMissing.call(depth0, "equalObject", "sfo2", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(9, program9, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "ams1", "region", options) : helperMissing.call(depth0, "equalObject", "ams1", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(11, program11, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "ams2", "region", options) : helperMissing.call(depth0, "equalObject", "ams2", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n        ");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(13, program13, data), contexts:[depth0, depth0], types:["ID", "ID"], data:data}, helper ? helper.call(depth0, "sgp1", "region", options) : helperMissing.call(depth0, "equalObject", "sgp1", "region", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        <br/>\n        <br/>\n\n\n        ");
    stack1 = helpers["if"].call(depth0, "view.isapp", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(17, program17, data), fn:self.program(15, program15, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("cluster.size"), "param2":(66)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(19, program19, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("cluster.size"), "param2":(63)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(21, program21, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("cluster.size"), "param2":(62)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(23, program23, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("cluster.size"), "param2":(64)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(25, program25, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("cluster.size"), "param2":(65)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(27, program27, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("cluster.size"), "param2":(61)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(29, program29, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        ");
    stack1 = helpers["if"].call(depth0, "showCost", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(31, program31, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n        <br/>\n\n    </div>\n");
    return buffer;
}
);


templates['components/provider_selection'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"row\">\n\n    <br/>\n\n    <div class=\"col-lg-12\">\n\n\n        <div class=\"text-center\">\n            <h3>Select the API Key</h3>\n            <div class=\"col-lg-4\"></div>\n            <div class=\"col-lg-4\">\n                ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SelectTextField", {hash:{"class":("form-control col-lg-6"), "contentBinding":("providers"), "valueBinding":("selected_provider"), "optionValuePath":("content"), "optionLabelPath":("content.name"), "elementId":("selected_provider")}, hashTypes:{"class":"STRING", "contentBinding":"STRING", "valueBinding":"STRING", "optionValuePath":"STRING", "optionLabelPath":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "contentBinding":depth0, "valueBinding":depth0, "optionValuePath":depth0, "optionLabelPath":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n            </div>\n            <div class=\"col-lg-4\"></div>\n        </div>\n\n\n\n    </div>\n\n</div>");
    return buffer;
}
);


templates['components/region_selection'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n                        ");
        stack1 = (helper = helpers.eachIndexed || (depth0 && depth0.eachIndexed), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data}, helper ? helper.call(depth0, "v", "in", "regionsAvailable", options) : helperMissing.call(depth0, "eachIndexed", "v", "in", "regionsAvailable", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                     ");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n                            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("index"), "param2":(3)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("index"), "param2":(6)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("index"), "param2":(9)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                                ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("v.slug"), "param2":("slug")}, hashTypes:{"param1":"ID", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n                                ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("v.slug"), "param2":("slug")}, hashTypes:{"param1":"ID", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            \n                        ");
        return buffer;
    }
    function program3(depth0, data) {
        data.buffer.push("\n                                </div><div class=\"row\">\n                            ");
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                    <a class=\"col-lg-3 text-center quick-btn active\" style=\"height:150px;width:150px\">\n                                        <span>");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</span>\n                                        <br/>\n                                        <span ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("v.slug")}, hashTypes:{"class":"ID"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("></span>\n                                    </a>\n                                ");
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                    <a class=\"col-lg-3 text-center quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectRegion", "v", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(" style=\"height:150px;width:150px\">\n                                        <span>");
        stack1 = helpers._triageMustache.call(depth0, "v.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</span>\n                                        <br/>\n                                        <span ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("v.slug")}, hashTypes:{"class":"ID"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("></span>\n                                    </a>\n                                ");
        return buffer;
    }
    function program9(depth0, data) {
        data.buffer.push("\n                        <div class=\"col-lg-8 text-left\">\n                            <br/>\n                           No regions available for this API Key.\n                        </div>\n                     ");
    }
    data.buffer.push("<div class=\"row\">\n\n    <br/>\n\n    <div class=\"col-lg-12\">\n\n        <div class=\"text-center\">\n            <h3>Select the region</h3>\n        </div>\n\n        <div class=\"row\">\n\n            <div class=\"col-lg-2 text-center\">\n            </div>\n            <div class=\"col-lg-2 text-right\">\n            </div>\n\n        </div>\n        <div class=\"row\">\n\n            <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n                <div class=\"col-lg-12 text-center\">\n                    <div class=\"col-lg-3 text-center\">\n                    </div>\n                    <div class=\"col-lg-8 text-center\">\n\n                     ");
    stack1 = helpers["if"].call(depth0, "regionsAvailable.length", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(9, program9, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n                    </div>\n\n\n\n\n\n                </div>\n\n\n            </div>\n            <br/>\n            <br/>\n            <br/>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['components/region_size'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers["if"].call(depth0, "isInREgion", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(10, program10, data), fn:self.program(2, program2, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "isNotCurrentSize", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(8, program8, data), fn:self.program(3, program3, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(66)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(4, program4, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(66)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(6, program6, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_66\" class=\"quick-btn active\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 66, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("66"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program6(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_66\" class=\"quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 66, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("66"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program8(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <a id=\"size_66\" class=\"quick-btn disabled disable\" data-original-title=\"This is the current cluster size\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("66"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n            </a>\n        ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a id=\"size_66\" class=\"quick-btn disabled disable\" data-original-title=\"Size currently disabled to ensure performance\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n            ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("66"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n        </a>\n    ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers["if"].call(depth0, "isInREgion", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(21, program21, data), fn:self.program(13, program13, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program13(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "isNotCurrentSize", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(19, program19, data), fn:self.program(14, program14, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program14(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(65)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(15, program15, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(65)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(17, program17, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        ");
        return buffer;
    }
    function program15(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_65\" class=\"quick-btn active\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 65, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("65"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program17(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_65\" class=\"quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 65, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("65"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program19(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <a id=\"size_65\" class=\"quick-btn disabled disable\" data-original-title=\"This is the current cluster size\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("65"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n            </a>\n        ");
        return buffer;
    }
    function program21(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a id=\"size_65\" class=\"quick-btn disabled disable\" data-original-title=\"Size currently disabled to ensure performance\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n            ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("65"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n        </a>\n    ");
        return buffer;
    }
    function program23(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers["if"].call(depth0, "isInREgion", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(32, program32, data), fn:self.program(24, program24, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program24(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "isNotCurrentSize", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(30, program30, data), fn:self.program(25, program25, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program25(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(64)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(26, program26, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(64)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(28, program28, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        ");
        return buffer;
    }
    function program26(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_64\" class=\"quick-btn active\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 64, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("64"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program28(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_64\" class=\"quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 64, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("64"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program30(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <a id=\"size_64\" class=\"quick-btn disabled disable\" data-original-title=\"This is the current cluster size\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("64"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n            </a>\n        ");
        return buffer;
    }
    function program32(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a id=\"size_64\" class=\"quick-btn disabled disable\" data-original-title=\"Size currently disabled to ensure performance\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n            ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("64"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n        </a>\n    ");
        return buffer;
    }
    function program34(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers["if"].call(depth0, "isInREgion", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(43, program43, data), fn:self.program(35, program35, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program35(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "isNotCurrentSize", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(41, program41, data), fn:self.program(36, program36, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program36(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(62)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(37, program37, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(62)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(39, program39, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        ");
        return buffer;
    }
    function program37(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_62\" class=\"quick-btn active\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 62, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("62"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program39(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_62\" class=\"quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 62, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("62"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program41(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <a id=\"size_62\" class=\"quick-btn disabled disable\" data-original-title=\"This is the current cluster size\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("62"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n            </a>\n        ");
        return buffer;
    }
    function program43(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a id=\"size_62\" class=\"quick-btn disabled disable\" data-original-title=\"Size currently disabled to ensure performance\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n            ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("62"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n        </a>\n    ");
        return buffer;
    }
    function program45(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers["if"].call(depth0, "isInREgion", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(54, program54, data), fn:self.program(46, program46, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program46(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "isNotCurrentSize", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(52, program52, data), fn:self.program(47, program47, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program47(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(63)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(48, program48, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(63)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(50, program50, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        ");
        return buffer;
    }
    function program48(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_63\" class=\"quick-btn active\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 63, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("63"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program50(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_63\" class=\"quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 63, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("63"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program52(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <a id=\"size_63\" class=\"quick-btn disabled disable\" data-original-title=\"This is the current cluster size\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("63"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n            </a>\n        ");
        return buffer;
    }
    function program54(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a id=\"size_63\" class=\"quick-btn disabled disable\" data-original-title=\"Size currently disabled to ensure performance\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n            ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("63"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n        </a>\n    ");
        return buffer;
    }
    function program56(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers["if"].call(depth0, "isInREgion", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(65, program65, data), fn:self.program(57, program57, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program57(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "isNotCurrentSize", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(63, program63, data), fn:self.program(58, program58, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program58(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(61)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(59, program59, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("view.selsize"), "param2":(61)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(61, program61, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        ");
        return buffer;
    }
    function program59(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_61\" class=\"quick-btn active\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 61, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("61"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program61(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                <a id=\"size_61\" class=\"quick-btn\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectSize", 61, {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "INTEGER"], data:data})));
        data.buffer.push(" style=\"height:170px;width:170px\">\n                    ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("61"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n                </a>\n            ");
        return buffer;
    }
    function program63(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <a id=\"size_61\" class=\"quick-btn disabled disable\" data-original-title=\"This is the current cluster size\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("61"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n            </a>\n        ");
        return buffer;
    }
    function program65(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a id=\"size_61\" class=\"quick-btn disabled disable\" data-original-title=\"Size currently disabled to ensure performance\" data-toggle=\"tooltip\" style=\"height:170px;width:170px\">\n            ");
        data.buffer.push(escapeExpression((helper = helpers["sizetextbox-view"] || (depth0 && depth0["sizetextbox-view"]), options = {hash:{"size":("61"), "selsizeBinding":("view.selsize")}, hashTypes:{"size":"STRING", "selsizeBinding":"STRING"}, hashContexts:{"size":depth0, "selsizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sizetextbox-view", options))));
        data.buffer.push("\n        </a>\n    ");
        return buffer;
    }
    data.buffer.push("\n");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 66, "content", options) : helperMissing.call(depth0, "equalObject", 66, "content", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n\n");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(12, program12, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 65, "content", options) : helperMissing.call(depth0, "equalObject", 65, "content", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n\n");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(23, program23, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 64, "content", options) : helperMissing.call(depth0, "equalObject", 64, "content", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(34, program34, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 62, "content", options) : helperMissing.call(depth0, "equalObject", 62, "content", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(45, program45, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 63, "content", options) : helperMissing.call(depth0, "equalObject", 63, "content", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n\n");
    stack1 = (helper = helpers.equalObject || (depth0 && depth0.equalObject), options = {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(56, program56, data), contexts:[depth0, depth0], types:["INTEGER", "ID"], data:data}, helper ? helper.call(depth0, 61, "content", options) : helperMissing.call(depth0, "equalObject", 61, "content", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n");
    return buffer;
}
);


templates['components/regionsize_selection'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", helper, options, helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"row\">\n\n    <br/>\n\n    <div class=\"col-lg-12\">\n\n        <div class=\"text-center col-lg-8\">\n            <h3>Select Size</h3>\n        </div>\n\n        <div class=\"row\">\n\n            <div class=\"col-lg-2 text-center\">\n            </div>\n            <div class=\"col-lg-2 text-right\">\n            </div>\n\n        </div>\n        <div class=\"row\">\n\n\n            <div class=\"row col-lg-12 text-center\">\n                    ");
    data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("66"), "type":("do"), "currsizeBinding":("view.currSize"), "selsizeBinding":("view.selectedSize"), "availableSizesBinding":("view.availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
    data.buffer.push("\n\n                    ");
    data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("63"), "type":("do"), "currsizeBinding":("view.currSize"), "selsizeBinding":("view.selectedSize"), "availableSizesBinding":("view.availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
    data.buffer.push("\n\n                    ");
    data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("62"), "type":("do"), "currsizeBinding":("view.currSize"), "selsizeBinding":("view.selectedSize"), "availableSizesBinding":("view.availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
    data.buffer.push("\n            </div>\n            <br/>\n            <div class=\"row col-lg-12  text-center\">\n                    ");
    data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("64"), "type":("do"), "currsizeBinding":("view.currSize"), "selsizeBinding":("view.selectedSize"), "availableSizesBinding":("view.availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
    data.buffer.push("\n\n                    ");
    data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("65"), "type":("do"), "currsizeBinding":("view.currSize"), "selsizeBinding":("view.selectedSize"), "availableSizesBinding":("view.availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
    data.buffer.push("\n\n                    ");
    data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("61"), "type":("do"), "currsizeBinding":("view.currSize"), "selsizeBinding":("view.selectedSize"), "availableSizesBinding":("view.availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
    data.buffer.push("\n            </div>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['components/regiontextbox'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression;
    data.buffer.push("<label class=\"form-control quick-btn quick-btn-nohover\" style=\"height:150px;width:150px\">\n    <span>");
    stack1 = helpers._triageMustache.call(depth0, "view.region_name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("</span>\n    <br>\n    <span ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("view.slug")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ></span>\n</label>");
    return buffer;
}
);


templates['components/sizetextbox'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        data.buffer.push("\n<span class=\"memory_and_cpu\">\n                                <strong>512MB</strong>\n                                / 1 CPU\n                                </span>\n<span class=\"disk\">\n                                <strong>20GB</strong>\n                                SSD Disk\n                                </span>\n<span class=\"bandwidth\">\n                                <strong>1TB</strong>\n                                Transfer\n                                </span>\n");
    }
    function program3(depth0, data) {
        data.buffer.push("\n<span class=\"memory_and_cpu\">\n                                <strong>8GB</strong>\n                                / 4 CPU\n                                </span>\n<span class=\"disk\">\n                                <strong>80GB</strong>\n                                SSD Disk\n                                </span>\n<span class=\"bandwidth\">\n                                <strong>5TB</strong>\n                                Transfer\n                                </span>\n");
    }
    function program5(depth0, data) {
        data.buffer.push("\n<span class=\"memory_and_cpu\">\n                                <strong>4GB</strong>\n                                / 2 CPU\n                                </span>\n<span class=\"disk\">\n                                <strong>60GB</strong>\n                                SSD Disk\n                                </span>\n<span class=\"bandwidth\">\n                                <strong>4TB</strong>\n                                Transfer\n                                </span>\n");
    }
    function program7(depth0, data) {
        data.buffer.push("\n\n<span class=\"memory_and_cpu\">\n                                <strong>2GB</strong>\n                                / 2 CPU\n                                </span>\n<span class=\"disk\">\n                                <strong>40GB</strong>\n                                SSD Disk\n                                </span>\n<span class=\"bandwidth\">\n                                <strong>3TB</strong>\n                                Transfer\n                                </span>\n");
    }
    function program9(depth0, data) {
        data.buffer.push("\n<span class=\"memory_and_cpu\">\n                                    <strong>1GB</strong>\n                                    / 1 CPU\n                                    </span>\n<span class=\"disk\">\n                                    <strong>30GB</strong>\n                                    SSD Disk\n                                    </span>\n<span class=\"bandwidth\">\n                                    <strong>2TB</strong>\n                                    Transfer\n                                    </span>\n");
    }
    function program11(depth0, data) {
        data.buffer.push("\n<span class=\"memory_and_cpu\">\n                                    <strong>16GB</strong>\n                                    / 8 CPU\n                                    </span>\n<span class=\"disk\">\n                                    <strong>160GB</strong>\n                                    SSD Disk\n                                    </span>\n<span class=\"bandwidth\">\n                                    <strong>6TB</strong>\n                                    Transfer\n                                    </span>\n");
    }
    data.buffer.push("\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.size"), "param2":(66)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.size"), "param2":(65)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.size"), "param2":(64)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.size"), "param2":(62)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.size"), "param2":(63)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(9, program9, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("view.size"), "param2":(61)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(11, program11, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n<br>\n\n\n<table class=\"col-lg-12 text-center\">\n    <tr>\n        <td>\n            <span class=\"period\">Monthly</span>\n        </td>\n        <td>\n            <span class=\"period\">Hourly</span>\n        </td>\n    </tr>\n    <tr>\n        <td>\n            <span class=\"period\">$");
    stack1 = helpers._triageMustache.call(depth0, "monthlyPricing", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("</span>\n        </td>\n        <td>\n            <span class=\"period\">$");
    stack1 = helpers._triageMustache.call(depth0, "hourlyPricing", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("</span>\n        </td>\n    </tr>\n</table>");
    return buffer;
}
);


templates['components/sshkey_selection'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    <div class=\"row smallmargin\">\n\n    ");
        stack1 = helpers.each.call(depth0, "key", "in", "availableKeys", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    </div>\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("key.id"), "param2":("view.selectedKey.id")}, hashTypes:{"param1":"ID", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("key.id"), "param2":("view.selectedKey.id")}, hashTypes:{"param1":"ID", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"col-lg-3 btn btn-primary active smallmargin\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "unselectKey", "key", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">\n                    ");
        stack1 = helpers._triageMustache.call(depth0, "key.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("<br/>\n                </div>\n            ");
        return buffer;
    }
    function program5(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"col-lg-3 btn btn-inverse-grey smallmargin\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectKey", "key", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(">\n                    ");
        stack1 = helpers._triageMustache.call(depth0, "key.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("<br/>\n                </div>\n            ");
        return buffer;
    }
    function program7(depth0, data) {
        data.buffer.push("\n    The root password will be sent by Email. <br/> <br/>\n    You may ask your administrator to add your public ssh key informations\n    <br/>\n");
    }
    data.buffer.push("\n<div class=\"row col-lg-12 text-left\">\n    <div class=\"col-lg-1 text-left\"></div>\n    <div class=\"col-lg-5 text-center\">\n        <h3>Select a SSH Key</h3>\n    </div>\n</div>\n\n");
    stack1 = helpers["if"].call(depth0, "availableKeys", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(7, program7, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    return buffer;
}
);


templates['components/task_status'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression, self = this;
    function program1(depth0, data) {
        data.buffer.push("\n\n    <div class=\"row col-lg-12 text-center mediumtopmargin\">\n        All tasks are completed, you will be redirected shortly.<br/>\n        <br/>\n        <br/>\n\n    </div>\n\n");
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n    ");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("error"), "param2":("content.action_status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(4, program4, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n    ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("error"), "param2":("content.action_status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(6, program6, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <div id='status' class=\"row col-lg-12 text-center mediumtopmargin\">\n\n                <div class=\"row col-lg-12 text-center\">\n                    Please stand by while the process completes, <br/>\n                    <br/>you may close the window at any time the process will still complete.\n                    <br/>\n                    <br/>\n\n                </div>\n\n                <div id=\"statusready\" class=\"row col-lg-12\">\n                    <div class=\"progress progress-striped\">\n                        \n                        <div id=\"progressBar\" class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" ");
        data.buffer.push(escapeExpression((helper = helpers.bindStyle || (depth0 && depth0.bindStyle), options = {hash:{"width":("current_percentage"), "width-unit":("%")}, hashTypes:{"width":"ID", "width-unit":"STRING"}, hashContexts:{"width":depth0, "width-unit":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindStyle", options))));
        data.buffer.push(">\n                        </div>\n                    </div>\n\n                    <div id=\"timer01\" style=\"text-align:center\">\n                    </div>\n                </div>\n        </div>\n    ");
        return buffer;
    }
    function program6(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        <div id='statuserror' class=\"row col-lg-12 mediumtopmargin\">\n\n            <div class=\"row col-lg-12 text-center\">\n                Sorry, the operation have failed...\n                <br/>\n                <br/>\n                <br/>\n\n                ");
        stack1 = helpers["if"].call(depth0, "showErrorGoBackButton", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            </div>\n        </div>\n    ");
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "taskErrorGoBackClick", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-primary btn-lg\">\n                        Go Back.\n                    </a>\n                ");
        return buffer;
    }
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("100"), "param2":("current_percentage")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":(100), "param2":("current_percentage")}, hashTypes:{"param1":"INTEGER", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    return buffer;
}
);


templates['components/table/iamroletable'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Role Name</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['components/table/iamuserstable'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Name</th>\n                    <th>Email</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['components/table/keytable'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12 mediumtopmargin\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Name</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n");
    return buffer;
}
);


templates['components/table/projectlist'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Name</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['components/table/providertable'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12 mediumtopmargin\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Name</th>\n                    <th>Key</th>\n                    <th>Cloud</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n");
    return buffer;
}
);


templates['components/table/quotatable'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12 mediumtopmargin\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Tag</th>\n                    <th>Max Servers</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n");
    return buffer;
}
);


templates['components/table/serverlist'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12 mediumtopmargin\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Name</th>\n                    <th>IP Address</th>\n                    <th>Status</th>\n                    <th>Memory</th>\n                    <th>Disks</th>\n                    <th>Provider</th>\n                    <th>Region</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n");
    return buffer;
}
);


templates['components/table/serverstable'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12\">\n    <div class=\"none\">\n        <div id=\"collapse4\" class=\"body\">\n            <table ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"id":("view.tableId")}, hashTypes:{"id":"ID"}, hashContexts:{"id":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"height":("view.height")}, hashTypes:{"height":"ID"}, hashContexts:{"height":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"width":("100%")}, hashTypes:{"width":"STRING"}, hashContexts:{"width":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" class=\"table table-bordered sortableTable table-condensed table-hover table-striped\">\n                <thead>\n                <tr>\n                    <th>Id</th>\n                    <th>Image</th>\n                    <th>Name</th>\n                    <th>IP Address</th>\n                    <th>Status</th>\n                    <th>Memory</th>\n                    <th>Disk</th>\n                    <th>Region</th>\n                    <th>Action</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['main/account'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, self = this, helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        <div class=\"alert alert-danger\">\n            <strong>Error updating!</strong> ");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        </div>\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers["if"].call(depth0, "accountUpdated", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program4(depth0, data) {
        data.buffer.push("\n            <div class=\"alert alert-info\">\n                <strong>Saved!</strong> Your account information has been updated.\n            </div>\n        ");
    }
    function program6(depth0, data) {
        data.buffer.push("\n        <div class=\"alert\">\n        </div>\n        ");
    }
    function program8(depth0, data) {
        data.buffer.push("\n                <div class=\"alert alert-info\">\n                    <strong>Saved!</strong> Your account has been updated.\n                </div>\n            ");
    }
    function program10(depth0, data) {
        data.buffer.push("\n                <div class=\"alert\">\n                </div>\n            ");
    }
    function program12(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"alert alert-danger\">\n                    <strong>Error updating!</strong> ");
        stack1 = helpers._triageMustache.call(depth0, "passworderrorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program14(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                ");
        stack1 = helpers["if"].call(depth0, "passwordMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(17, program17, data), fn:self.program(15, program15, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        return buffer;
    }
    function program15(depth0, data) {
        data.buffer.push("\n                    <div class=\"alert alert-info\">\n                        <strong>Saved!</strong> Your password has been updated.\n                    </div>\n                ");
    }
    function program17(depth0, data) {
        data.buffer.push("\n                    <br/>\n                    <br/>\n                    <br/>\n                ");
    }
    data.buffer.push("\n<div class=\"row col-lg-12 hidden\">\n    <br/>\n    ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n</div>\n\n<div class=\"col-lg-12\">\n    <div class=\"box\">\n        <header>\n            <div class=\"icons\"><i class=\"icon-ok\"></i></div>\n            <h5>Account Information</h5>\n            <div class=\"toolbar\">\n                <ul class=\"nav\">\n                    <li>\n                        <div class=\"btn-group hide\">\n                            <a class=\"accordion-toggle btn btn-xs minimize-box\" data-toggle=\"collapse\" href=\"#collapse3\">\n                                <i class=\"icon-chevron-up\"></i>\n                            </a>\n                            <button class=\"btn btn-xs btn-danger close-box\"><i class=\"icon-remove\"></i></button>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n\n        </header>\n        <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n\n\n            ");
    stack1 = helpers["if"].call(depth0, "accountMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(10, program10, data), fn:self.program(8, program8, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n            <form class=\"form-horizontal\" id=\"inline-validate\" novalidate=\"novalidate\">\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "first_name", options) : helperMissing.call(depth0, "i18n", "first_name", options))));
    data.buffer.push("</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("account.firstName"), "elementId":("account_first_name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "last_name", options) : helperMissing.call(depth0, "i18n", "last_name", options))));
    data.buffer.push("</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("account.lastName"), "elementId":("account_last_name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">Company Name</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.OptionalTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("account.company"), "elementId":("account_company")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">E-mail ( Login username )</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmailTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("account.email"), "elementId":("account_email")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">Preferred Language</label>\n\n                    <div class=\"col-lg-3\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SelectTextField", {hash:{"class":("form-control col-lg-6"), "contentBinding":("languages"), "valueBinding":("account.lang"), "elementId":("account_lang")}, hashTypes:{"class":"STRING", "contentBinding":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "contentBinding":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">I Aggree to the ToS</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, {hash:{"templateName":("MustBeCheckedField"), "name":("agree"), "class":("col-lg-2"), "checkedBinding":("account.tosAccepted"), "valueBinding":("true"), "elementId":("billing_tosAgree")}, hashTypes:{"templateName":"STRING", "name":"STRING", "class":"STRING", "checkedBinding":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"templateName":depth0, "name":depth0, "class":depth0, "checkedBinding":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n\n\n                <div class=\"form-actions\">\n                    <div style=\"height:35px\">\n                        <div class=\"col-lg-10\">\n                        </div>\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelUserUpdateAccount", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Cancel\" style=\"float:right\" class=\"btn btn-default\"/>\n                        </div>\n                        <div class=\"col-lg-1\">\n                        </div>\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateUserAccount", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Save\" style=\"float:right\" class=\"btn btn-primary\"/>\n                        </div>\n                    </div>\n                </div>\n\n\n            </form>\n        </div>\n    </div>\n</div>\n\n\n\n\n\n<div class=\"col-lg-12\">\n    <div class=\"box\">\n        <header>\n            <div class=\"icons\"><i class=\"icon-ok\"></i></div>\n            <h5>Change Password</h5>\n            <div class=\"toolbar\">\n                <ul class=\"nav\">\n                    <li>\n                        <div class=\"btn-group hide\">\n                            <a class=\"accordion-toggle btn btn-xs minimize-box\" data-toggle=\"collapse\" href=\"#collapse3\">\n                                <i class=\"icon-chevron-up\"></i>\n                            </a>\n                            <button class=\"btn btn-xs btn-danger close-box\"><i class=\"icon-remove\"></i></button>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n\n        </header>\n        <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n            ");
    stack1 = helpers["if"].call(depth0, "passworderrorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(14, program14, data), fn:self.program(12, program12, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n            <form class=\"form-horizontal\" id=\"inline-validate\" novalidate=\"novalidate\">\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">Current Password</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("account.password_current"), "type":("password"), "elementId":("currentPassword")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "type":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "type":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">New Password</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("account.password"), "type":("password"), "elementId":("newPassword")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "type":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "type":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">Confirm Password</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyEqualRefTextField", {hash:{"class":("form-control col-lg-6"), "refBinding":("account.password"), "valueBinding":("account.password_confirm"), "type":("password"), "elementId":("newConfirmPassword")}, hashTypes:{"class":"STRING", "refBinding":"STRING", "valueBinding":"STRING", "type":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "refBinding":depth0, "valueBinding":depth0, "type":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-actions\">\n                    <div style=\"height:35px\">\n                        <div class=\"col-lg-10\">\n                        </div>\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelUserPassword", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Cancel\" style=\"float:right\" class=\"btn btn-default\">\n                        </div>\n                        <div class=\"col-lg-1\">\n                        </div>\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateUserPassword", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Save\" style=\"float:right\" class=\"btn btn-primary\">\n                        </div>\n                    </div>\n                </div>\n\n            </form>\n        </div>\n    </div>\n</div>\n\n");
    return buffer;
}
);


templates['main/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "createNewProject", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("  class=\"btn btn-danger btn-lg\"  ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">New Project</a>\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "createNewProject", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("  class=\"btn btn-danger btn-lg\"  ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_first_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">Create Project</a>\n    ");
        return buffer;
    }
    function program5(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n    <div class=\"mediumtopmargin\">\n        <h2>You have pending invitations...</h2>\n\n        ");
        data.buffer.push(escapeExpression((helper = helpers["projectlist-table"] || (depth0 && depth0["projectlist-table"]), options = {hash:{"dataBinding":("pendingInvites"), "type":("pendingInvite"), "isLoaded":("view.loaded"), "tableId":("project_invite_table"), "template_name":("components/table/projectlist"), "clickRoute":("project.index")}, hashTypes:{"dataBinding":"STRING", "type":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "type":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "projectlist-table", options))));
        data.buffer.push("\n\n    </div>\n");
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n    <div class=\"mediumtopmargin\">\n\n        ");
        data.buffer.push(escapeExpression((helper = helpers["projectlist-table"] || (depth0 && depth0["projectlist-table"]), options = {hash:{"dataBinding":("projects"), "type":("accepted"), "isLoaded":("view.loaded"), "tableId":("project_table"), "template_name":("components/table/projectlist"), "clickRoute":("project.index")}, hashTypes:{"dataBinding":"STRING", "type":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "type":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "projectlist-table", options))));
        data.buffer.push("\n    </div>\n\n");
        return buffer;
    }
    data.buffer.push("\n\n\n<div class=\"col-lg-12\">\n    ");
    stack1 = helpers["if"].call(depth0, "projects.length", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n    \n</div>\n\n\n\n<div ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":(":mediumtopmargin projects.length:hidden:visible")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(">\n    Create your first project.\n</div>\n\n");
    stack1 = helpers["if"].call(depth0, "pendingInvites", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("projects.length"), "param2":(0)}, hashTypes:{"param1":"ID", "param2":"INTEGER"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n");
    return buffer;
}
);


templates['main/leftmenu'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "";
        data.buffer.push("\n        <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Projects</a>\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "";
        data.buffer.push("\n        <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Account</a>\n    ");
        return buffer;
    }
    data.buffer.push("<div id=\"menu\">\n\n\n    ");
    stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "main.index", options) : helperMissing.call(depth0, "link-to", "main.index", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n    ");
    stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "main.account", options) : helperMissing.call(depth0, "link-to", "main.account", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n</div>");
    return buffer;
}
);


templates['main/modal/newproject'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12\">\n    Enter project name :\n</div>\n\n<div class=\"col-lg-12 top15\">\n    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "placeholder":("Enter a project name"), "elementId":("projectNameText")}, hashTypes:{"class":"STRING", "placeholder":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "placeholder":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n</div>\n");
    return buffer;
}
);


templates['project/account'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<!--TODO: Add an API Key section\n\n<br/>A User could create its own Application Key's to be used. Potentially add keys too\n<br/>Add the user to which groups / level he's subscribed to for this project...\n\n-->\n<br/>\n\n\n\n\n");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, {hash:{"templateName":("main/account"), "controllerBinding":("controller"), "contentBinding":("controller.content"), "accountBinding":("controller.account")}, hashTypes:{"templateName":"STRING", "controllerBinding":"STRING", "contentBinding":"STRING", "accountBinding":"STRING"}, hashContexts:{"templateName":depth0, "controllerBinding":depth0, "contentBinding":depth0, "accountBinding":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push("\n\n");
    return buffer;
}
);


templates['project/custom'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    data.buffer.push("This is a custom view...");
}
);


templates['project/iams'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n");
        stack1 = helpers["if"].call(depth0, "controllers.project.ProjectAdmin", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n    <div class=\"row col-lg-12\">\n    <div class=\"col-lg-1\">\n        <a id=\"add\" class=\"btn btn-danger btn-lg\"  data-target=\"#create\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.invite_user_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"collapse\">\n            <i class=\"fa fa-plus\"></i>\n            Invite User\n        </a>\n    </div>\n\n    <div class=\"col-lg-1\">&nbsp;</div>\n    \n    </div>\n\n    <div id=\"create\" class=\"collapse text-grey mediumtopmargin\">\n        <div class=\"row\">\n            ");
        stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(5, program5, data), fn:self.program(3, program3, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        </div>\n        <div class=\"row row-fluid col-lg-12\">\n            <div class=\"row col-lg-8 text-center\">\n                <table class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"\"></th>\n                    </thead>\n                    <tr>\n                        <td>\n                            ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.invite_email", options) : helperMissing.call(depth0, "i18n", "project.invite_email", options))));
        data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.invite_email_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmailTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.invite_email_placeholder"), "valueBinding":("invite_email"), "elementId":("invite_email")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                        </td>\n                    </tr>\n                </table>\n\n                <div class=\"row smalltopmargin col-lg-12 text-grey smallleftpad text-center\" >\n                    ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.email_invite_text", options) : helperMissing.call(depth0, "i18n", "project.email_invite_text", options))));
        data.buffer.push("\n                </div>\n\n                <div class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n\n                    <div class=\"form-actions row col-lg-12\">\n                        <div class=\"col-lg-4\">\n                            &nbsp;\n                        </div>\n                        <input ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" type=\"button\" class=\"btn btn-default\"  data-target=\"#create\" data-toggle=\"collapse\" value=\"Cancel\"/>\n\n                        <input  ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-primary\" type=\"button\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"value":("project.send_invite")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push("/>\n                    </div>\n\n\n                </div>\n\n\n            </div>\n        </div>\n\n    </div>\n\n\n\n    \n\n\n    \n");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n                <div class=\"col-lg-2\">\n                </div>\n                <div class=\"alert alert-danger col-lg-8\">\n                    <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n                    <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program5(depth0, data) {
        data.buffer.push("\n                <div class=\"alert\">&nbsp;</div>\n            ");
    }
    stack1 = helpers["if"].call(depth0, "controllers.project", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n<h2>Users</h2>\n<div class=\"mediumtopmargin\">\n    ");
    data.buffer.push(escapeExpression((helper = helpers["iamuser-table"] || (depth0 && depth0["iamuser-table"]), options = {hash:{"dataBinding":("users"), "isLoaded":("view.loaded"), "tableId":("users_table"), "template_name":("components/table/iamuserstable"), "clickRoute":("project/iam/useredit")}, hashTypes:{"dataBinding":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "iamuser-table", options))));
    data.buffer.push("\n</div>\n\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n");
    return buffer;
}
);


templates['project/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "";
        data.buffer.push("\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <br/>\n    <div class=\"col-lg-12 text-center meidumtopmargin\">\n        <div class=\"row col-lg-12\">\n            Do you accept to join the following project ?\n        </div>\n        <br/>\n        <br/>\n        <br/>\n        <div class=\"row col-lg-12 meidumtopmargin\">\n            <div class=\"col-lg-3\">\n            </div>\n            <div class=\"col-lg-3\">\n\n                <a id=\"accept\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "accept", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("  class=\"btn btn-success btn-lg\"  data-original-title=\"Accept Invitation\" data-toggle=\"collapse\">\n                    Accept\n                </a>\n\n            </div>\n            <div class=\"col-lg-3\">\n\n                <a id=\"refuse\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "reject", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-danger btn-lg\"  data-original-title=\"Refuse Invitation\" data-toggle=\"collapse\">\n                    Refuse\n                </a>\n\n            </div>\n            <div class=\"col-lg-3\">\n            </div>\n        </div>\n\n    </div>\n\n\n");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n\n\n  ");
        stack1 = helpers["if"].call(depth0, "content.isConfigured", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(9, program9, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n\n\n\n");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n    Project Overview of ");
        stack1 = helpers._triageMustache.call(depth0, "content.name", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    <br/>\n    <br/>\n\n\n    <div class=\"text-center\">\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.servers.index", options) : helperMissing.call(depth0, "link-to", "project.servers.index", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.databases.index", options) : helperMissing.call(depth0, "link-to", "project.databases.index", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n    </div>\n  ");
        return buffer;
    }
    function program5(depth0, data) {
        data.buffer.push("\n            <i class=\"fa fa-info-circle fa-2x\"></i>\n            <span>Servers</span>\n        ");
    }
    function program7(depth0, data) {
        data.buffer.push("\n            <i class=\"fa fa-info-circle fa-2x\"></i>\n            <span>Databases</span>\n        ");
    }
    function program9(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n\n    ");
        stack1 = helpers["if"].call(depth0, "content.ProjectAdmin", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(12, program12, data), fn:self.program(10, program10, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n  ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.admin_must_enable", options) : helperMissing.call(depth0, "i18n", "project.admin_must_enable", options))));
        data.buffer.push("\n    ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.admin_project_must_configure", options) : helperMissing.call(depth0, "i18n", "project.admin_project_must_configure", options))));
        data.buffer.push("\n    ");
        return buffer;
    }
    stack1 = helpers["if"].call(depth0, "content.invitetoken", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    return buffer;
}
);


templates['project/leftmenu'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n        <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "leftmenu.project_list", options) : helperMissing.call(depth0, "i18n", "leftmenu.project_list", options))));
        data.buffer.push("</a>\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n        <div data-parent=\"#menu\" data-toggle=\"collapse\" class=\"btn-metis-5\" >\n            Dashboards\n                <span class=\"pull-right\">\n                <!--<i class=\"icon-angle-left\"></i>-->\n                    </span>\n        </div>\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(4, program4, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.index", options) : helperMissing.call(depth0, "link-to", "project.index", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        <div data-parent=\"#menu\" data-toggle=\"collapse\" class=\"btn-metis-5\" >\n            Settings\n        <span class=\"pull-right\">\n            <!--<i class=\"icon-angle-left\"></i>-->\n        </span>\n        </div>\n\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(6, program6, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.servers", options) : helperMissing.call(depth0, "link-to", "project.servers", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(8, program8, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.custom", options) : helperMissing.call(depth0, "link-to", "project.custom", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n    ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Overview</a>\n        ");
        return buffer;
    }
    function program6(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Servers</a>\n        ");
        return buffer;
    }
    function program8(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Custom</a>\n        ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(11, program11, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.providers", options) : helperMissing.call(depth0, "link-to", "project.providers", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(13, program13, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.sshkeys", options) : helperMissing.call(depth0, "link-to", "project.sshkeys", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(15, program15, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.quotas", options) : helperMissing.call(depth0, "link-to", "project.quotas", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(17, program17, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.iams", options) : helperMissing.call(depth0, "link-to", "project.iams", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    ");
        return buffer;
    }
    function program11(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Cloud Providers</a>\n        ");
        return buffer;
    }
    function program13(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>SSH Keys</a>\n        ");
        return buffer;
    }
    function program15(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Quotas</a>\n        ");
        return buffer;
    }
    function program17(depth0, data) {
        var buffer = "";
        data.buffer.push("\n            <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>IAM</a>\n        ");
        return buffer;
    }
    function program19(depth0, data) {
        var buffer = "";
        data.buffer.push("\n        <a ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"href":("view.href")}, hashTypes:{"href":"STRING"}, hashContexts:{"href":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push("><i class=\"\"></i>Account</a>\n    ");
        return buffer;
    }
    data.buffer.push("<div id=\"menu\">\n\n    ");
    stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "main.index", options) : helperMissing.call(depth0, "link-to", "main.index", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n    ");
    stack1 = helpers["if"].call(depth0, "view.model.isConfigured", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n    <div data-parent=\"#menu\" data-toggle=\"collapse\" class=\"btn-metis-5\" >\n        Administration\n            <span class=\"pull-right\">\n                <!--<i class=\"icon-angle-left\"></i>-->\n            </span>\n    </div>\n\n    ");
    stack1 = helpers["if"].call(depth0, "view.model.ProjectAdmin", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(10, program10, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n    ");
    stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(19, program19, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.account", options) : helperMissing.call(depth0, "link-to", "project.account", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n</div>");
    return buffer;
}
);


templates['project/providers'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n");
        stack1 = helpers["if"].call(depth0, "controllers.project.ProjectAdmin", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(14, program14, data), fn:self.program(2, program2, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n    <a id=\"addCloud\" class=\"btn btn-danger btn-lg\"  data-target=\"#createProvider\" data-original-title=\"Add a cloud provider\" data-toggle=\"collapse\">\n        <i class=\"fa fa-plus\"></i>\n        Add Cloud\n    </a>\n\n    <div id=\"createProvider\" class=\"collapse text-grey mediumtopmargin\">\n\n        ");
        stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        <table class=\"row provider_list row-fluid col-lg-12 smallleftpad\">\n\n        <tr>\n            <td class=\"col-lg-3 text-grey\">\n                Provider:\n            </td>\n            <td>\n                <div ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "select", "digitalocean", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "STRING"], data:data})));
        data.buffer.push(">\n                    <img id=\"digitalocean\" src=\"https://www.digitalocean.com/assets/images/logos-badges/png/DO_Logo_Vertical_Blue-75e0d68b.png\" class=\"smalllogo canclick\"/>\n                </div>\n            </td>\n        </tr>\n        </table>\n\n\n        ");
        stack1 = helpers["if"].call(depth0, "selectedProviderType", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(7, program7, data), fn:self.program(5, program5, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n        <div class=\"row row-fluid col-lg-12\">\n            <div class=\"row col-lg-8 text-center\">\n                ");
        stack1 = helpers["if"].call(depth0, "selectedProviderType", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(9, program9, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n                <div class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n                    <input ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelNewProvider", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" type=\"button\" class=\"btn btn-default\"  data-target=\"#createProvider\" data-original-title=\"Add a cloud provider\" data-toggle=\"collapse\" value=\"Cancel\">\n                    </input>\n                    ");
        stack1 = helpers["if"].call(depth0, "selectedProviderType", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(12, program12, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n\n\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"mediumtopmargin\">\n        ");
        data.buffer.push(escapeExpression((helper = helpers["provider-table"] || (depth0 && depth0["provider-table"]), options = {hash:{"dataBinding":("providers"), "isLoaded":("view.loaded"), "tableId":("providers_table"), "template_name":("components/table/providertable"), "clickRoute":("project/provider")}, hashTypes:{"dataBinding":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "provider-table", options))));
        data.buffer.push("\n    </div>\n\n    ");
        stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            <div class=\"col-lg-2\">\n            </div>\n            <div class=\"alert alert-danger col-lg-8\">\n                <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n                <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            </div>\n        ");
        return buffer;
    }
    function program5(depth0, data) {
        data.buffer.push("\n        ");
    }
    function program7(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n            <div class=\"row provider_list row-fluid col-lg-12 smallleftpad \">\n                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.provider_select", options) : helperMissing.call(depth0, "i18n", "project.provider_select", options))));
        data.buffer.push("\n            </div>\n        ");
        return buffer;
    }
    function program9(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n                    <table class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n                        <thead>\n                        <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                        <th class=\"col-lg-1 text-right\"></th>\n                        <th class=\"\"></th>\n                        </thead>\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "name", options) : helperMissing.call(depth0, "i18n", "name", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_name_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyNoSpaceTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.displayname_input_placeholder"), "valueBinding":("new_provider_name"), "elementId":("new_provider_name")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "tag", options) : helperMissing.call(depth0, "i18n", "tag", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_tag_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.displaytag_input_placeholder"), "valueBinding":("new_provider_tag"), "elementId":("new_provider_tag")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                ");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("selectedProviderType"), "param2":("digitalocean")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(10, program10, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("digitalocean.clientid_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.publickey_input_placeholder"), "valueBinding":("new_provider_apikey"), "elementId":("new_provider_apikey")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </td>\n                        </tr>\n\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "apisecretkey", options) : helperMissing.call(depth0, "i18n", "apisecretkey", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("digitalocean.clientid_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.privatekey_input_placeholder"), "valueBinding":("new_provider_secretkey"), "elementId":("new_provider_secretkey")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </td>\n                        </tr>\n                    </table>\n\n                ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                                    ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "digitalocean.clientid", options) : helperMissing.call(depth0, "i18n", "digitalocean.clientid", options))));
        data.buffer.push("\n                                ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                        <input  ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "addNewProvider", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-primary\" type=\"button\" value=\"Save\">\n                        </input>\n                    ");
        return buffer;
    }
    function program14(depth0, data) {
        data.buffer.push("\n    <div class=\"collapse text-grey mediumtopmargin\">\n        <div class=\"row row-fluid col-lg-12\">\n            <div class=\"row col-lg-8 text-center\">\n                You do not have permission to view this ressource.\n            </div>\n        </div>\n    </div>\n");
    }
    stack1 = helpers["if"].call(depth0, "controllers.project", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    return buffer;
}
);


templates['project/quotas'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n\n");
        stack1 = helpers["if"].call(depth0, "controllers.project.ProjectAdmin", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(7, program7, data), fn:self.program(2, program2, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    function program2(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n    <a id=\"add\" class=\"btn btn-danger btn-lg\"  data-target=\"#create\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_quota_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"collapse\">\n        <i class=\"fa fa-plus\"></i>\n        Add Quota\n    </a>\n    <br/>\n    <div class=\"row row-fluid col-lg-12\">\n        <div class=\"row col-lg-8 text-center\">\n            PREVIEW ONLY, THIS IS NOT FULLY IMPLEMENTED\n        </div>\n    </div>\n\n\n    <div id=\"create\" class=\"collapse text-grey mediumtopmargin\">\n        <div class=\"row\">\n        ");
        stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(5, program5, data), fn:self.program(3, program3, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        </div>\n        <div class=\"row row-fluid col-lg-12\">\n            <div class=\"row col-lg-8 text-center\">\n                    <table class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n                        <thead>\n                        <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                        <th class=\"col-lg-1 text-right\"></th>\n                        <th class=\"\"></th>\n                        </thead>\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "quota.tag", options) : helperMissing.call(depth0, "i18n", "quota.tag", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("quota.tag_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyNoSpaceTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("quota.tag_input_placeholder"), "valueBinding":("new_quota_name"), "elementId":("new_quota_name")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "quota.compute", options) : helperMissing.call(depth0, "i18n", "quota.compute", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("quota.compute_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NumberTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "valueBinding":("new_quota_compute"), "check":("positiveOnly"), "elementId":("new_quota_compute")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "valueBinding":"STRING", "check":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "valueBinding":depth0, "check":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </td>\n                        </tr>\n                    </table>\n\n                <div class=\"row smalltopmargin col-lg-12 text-grey smallleftpad text-center\" >\n                    ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "quota.quota_limit_text", options) : helperMissing.call(depth0, "i18n", "quota.quota_limit_text", options))));
        data.buffer.push("\n                </div>\n\n                <div class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n\n                    <div class=\"form-actions row col-lg-12\">\n                            <div class=\"col-lg-4\">\n                                &nbsp;\n                            </div>\n                                <input ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" type=\"button\" class=\"btn btn-default\"  data-target=\"#create\" data-toggle=\"collapse\" value=\"Cancel\"/>\n\n                                <input  ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-primary\" type=\"button\" value=\"Save\"/>\n                    </div>\n\n\n                </div>\n\n\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"mediumtopmargin\">\n        ");
        data.buffer.push(escapeExpression((helper = helpers["quota-table"] || (depth0 && depth0["quota-table"]), options = {hash:{"dataBinding":("quotas"), "isLoaded":("view.loaded"), "tableId":("quotas_table"), "template_name":("components/table/quotatable"), "clickRoute":("project/quota")}, hashTypes:{"dataBinding":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "quota-table", options))));
        data.buffer.push("\n    </div>\n\n    ");
        stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n            <div class=\"col-lg-2\">\n            </div>\n            <div class=\"alert alert-danger col-lg-8\">\n                <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n                <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            </div>\n        ");
        return buffer;
    }
    function program5(depth0, data) {
        data.buffer.push("\n            <div class=\"alert\">&nbsp;</div>\n        ");
    }
    function program7(depth0, data) {
        data.buffer.push("\n    <div class=\"collapse text-grey mediumtopmargin\">\n        <div class=\"row row-fluid col-lg-12\">\n            <div class=\"row col-lg-8 text-center\">\n                You do not have permission to view this ressource.\n            </div>\n        </div>\n    </div>\n");
    }
    stack1 = helpers["if"].call(depth0, "controllers.project", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n");
    return buffer;
}
);


templates['project/server'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1;
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n");
    return buffer;
}
);


templates['project/servers'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, self = this, helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression;
    function program1(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n<div class=\"row col-lg-12\">\n    <div class=\"col-lg-1\">\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("btn btn-danger btn-lg")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(2, program2, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.server.create", options) : helperMissing.call(depth0, "link-to", "project.server.create", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    </div>\n</div>\n\n<div class=\"mediumtopmargin\">\n    ");
        data.buffer.push(escapeExpression((helper = helpers["servers-table"] || (depth0 && depth0["servers-table"]), options = {hash:{"dataBinding":("servers"), "isLoaded":("view.loaded"), "tableId":("servers_table"), "template_name":("components/table/serverstable"), "clickRoute":("project/servers/index")}, hashTypes:{"dataBinding":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "servers-table", options))));
        data.buffer.push("\n</div>\n\n");
        return buffer;
    }
    function program2(depth0, data) {
        data.buffer.push("\n            <i class=\"fa fa-plus\"></i>\n            Create\n        ");
    }
    function program4(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n    <div class=\"row col-lg-12 text-center\">\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(5, program5, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.server.index", options) : helperMissing.call(depth0, "link-to", "project.server.index", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(7, program7, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.server.reboot", options) : helperMissing.call(depth0, "link-to", "project.server.reboot", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(9, program9, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.server.resize", options) : helperMissing.call(depth0, "link-to", "project.server.resize", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        ");
        stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("a"), "class":("quick-btn")}, hashTypes:{"tagName":"STRING", "class":"STRING"}, hashContexts:{"tagName":depth0, "class":depth0}, inverse:self.noop, fn:self.program(11, program11, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "project.server.destroy", options) : helperMissing.call(depth0, "link-to", "project.server.destroy", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n    </div>\n\n");
        return buffer;
    }
    function program5(depth0, data) {
        data.buffer.push("\n            <i class=\"fa fa-info-circle fa-2x\"></i>\n            <span>Overview</span>\n        ");
    }
    function program7(depth0, data) {
        data.buffer.push("\n            <i class=\"fa fa-power-off fa-2x\"></i>\n            <span>Power</span>\n        ");
    }
    function program9(depth0, data) {
        data.buffer.push("\n            <i class=\"fa icon-resize-full fa-2x\"></i>\n            <span>Resize</span>\n        ");
    }
    function program11(depth0, data) {
        data.buffer.push("\n            <i class=\"fa icon-remove fa-2x\"></i>\n            <span>Destroy</span>\n        ");
    }
    data.buffer.push("\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("controllers.application.currentPath"), "param2":("user.project.servers.index")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("controllers.application.currentPath"), "param2":("user.project.servers.index")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(4, program4, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    return buffer;
}
);


templates['project/sshkeys'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n        <div class=\"row\">\n            <div class=\"col-lg-2\">\n            </div>\n            <div class=\"alert alert-danger col-lg-8\">\n                <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n                <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            </div>\n        </div>\n    ");
        return buffer;
    }
    function program3(depth0, data) {
        data.buffer.push("\n        <div class=\"alert\">\n        </div>\n    ");
    }
    data.buffer.push("<a id=\"addKey\" class=\"btn btn-danger btn-lg\"  data-target=\"#createKey\" data-original-title=\"Add a new SSH Key\" data-toggle=\"collapse\">\n    <i class=\"fa fa-plus\"></i>\n    Add New Key\n</a>\n\n<div id=\"createKey\" class=\"collapse text-grey mediumtopmargin\">\n\n    ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n    <div class=\"row row-fluid col-lg-12\">\n        <div class=\"row col-lg-8 text-center\">\n                <table class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"col-lg-7 text-left\"></th>\n                    </thead>\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "name", options) : helperMissing.call(depth0, "i18n", "name", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_key_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.displayname_input_placeholder"), "valueBinding":("new_key_name"), "elementId":("new_key_name")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "tag", options) : helperMissing.call(depth0, "i18n", "tag", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_tag_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyNoSpaceTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.displaytag_input_placeholder"), "valueBinding":("new_key_tag"), "elementId":("new_key_tag")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                           ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "public_key", options) : helperMissing.call(depth0, "i18n", "public_key", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "placeholderTranslate":("project.publickey_input_placeholder"), "valueBinding":("new_public_key"), "elementId":("new_public_key")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n\n                </table>\n\n\n            <div class=\"row smalltopmargin col-lg-12 text-grey smallleftpad\" >\n                <input ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelNewKey", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" type=\"button\" class=\"btn btn-default\"  data-target=\"#createKey\" data-toggle=\"collapse\" value=\"Cancel\">\n                </input>\n                <input  ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "addNewKey", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" class=\"btn btn-primary\" type=\"button\" value=\"Save\">\n                </input>\n            </div>\n\n        </div>\n    </div>\n\n</div>\n\n<div class=\"mediumtopmargin\">\n    ");
    data.buffer.push(escapeExpression((helper = helpers["key-table"] || (depth0 && depth0["key-table"]), options = {hash:{"dataBinding":("sshkeys"), "isLoaded":("view.loaded"), "tableId":("keys_table"), "template_name":("components/table/keytable"), "clickRoute":("project/sshkeys")}, hashTypes:{"dataBinding":"STRING", "isLoaded":"ID", "tableId":"STRING", "template_name":"STRING", "clickRoute":"STRING"}, hashContexts:{"dataBinding":depth0, "isLoaded":depth0, "tableId":depth0, "template_name":depth0, "clickRoute":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "key-table", options))));
    data.buffer.push("\n</div>\n\n");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n");
    return buffer;
}
);


templates['project/iam/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"alert alert-danger\">\n                    <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                    <strong>Error updating!</strong> ");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                ");
        stack1 = helpers["if"].call(depth0, "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    <div class=\"alert alert-info\">\n                        <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                        <strong>Saved!</strong> The new informations has been saved.\n                    </div>\n                ");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n                    <div class=\"alert\">\n                    &nbsp;\n                    </div>\n                ");
    }
    function program8(depth0, data) {
        data.buffer.push("\n\n            This user is either disabled or have not been invited for this project.\n\n");
    }
    function program10(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n            <form class=\"form-horizontal col-lg-12\" id=\"inline-validate\" novalidate=\"novalidate\">\n\n                <table class=\"row smalltopmargin col-lg-8 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"col-lg-6 text-left\"></th>\n                    </thead>\n                    <tr>\n                        <td>\n                            ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "email", options) : helperMissing.call(depth0, "i18n", "email", options))));
        data.buffer.push("\n                        </td>\n                        <td>\n                        </td>\n                        <td>\n                            ");
        data.buffer.push(escapeExpression((helper = helpers["ReadOnly-TextField"] || (depth0 && depth0["ReadOnly-TextField"]), options = {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.email"), "elementId":("email")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ReadOnly-TextField", options))));
        data.buffer.push("\n                        </td>\n                    </tr>\n                </table>\n                <br/>\n\n                <div class=\"row\">\n                <table class=\"row smalltopmargin col-lg-8 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-3 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"col-lg-6 text-left\"></th>\n                    <th class=\"col-lg-1 text-left\"></th>\n                    <th class=\"text-left\"></th>\n                    </thead>\n\n                    ");
        stack1 = helpers["if"].call(depth0, "roles.length", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(16, program16, data), fn:self.program(11, program11, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </table>\n                </div>\n\n               <div class=\"form-actions row col-lg-12\">\n                <table class=\"row smalltopmargin col-lg-8 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"col-lg-6 text-left\"></th>\n                    </thead>\n                ");
        stack1 = helpers["if"].call(depth0, "tags.length", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(21, program21, data), fn:self.program(18, program18, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </table>\n              </div>\n\n\n                <div class=\"form-actions row col-lg-12 smalltopmargin\">\n                    <div>\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRecord", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" value=\"Delete\" class=\"btn btn-danger\">\n                        </div>\n                        <div class=\"col-lg-8\">\n                            &nbsp;\n                        </div>\n                        <div class=\"col-lg-3 text-right\">\n\n                            <input type=\"submit\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" value=\"Cancel\" class=\"btn btn-default\">\n\n                            <input type=\"submit\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "update", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" value=\"Save\" class=\"btn btn-primary\">\n\n                        </div>\n                    </div>\n                </div>\n\n            </form>\n\n");
        return buffer;
    }
    function program11(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "roles", options) : helperMissing.call(depth0, "i18n", "roles", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.user_roles")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n\n                            ");
        stack1 = helpers["if"].call(depth0, "roles", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(12, program12, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        </tr>\n                    ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                \n                                ");
        stack1 = helpers.each.call(depth0, "v", "in", "roles", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(13, program13, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                            ");
        return buffer;
    }
    function program13(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                                    <td>\n                                        <div class=\"col-lg-7\">\n                                            ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ReadOnlyTextField", {hash:{"class":("form-control"), "valueBinding":("v.name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                                        </div>\n                                        <div class=\"col-lg-1\">\n                                            ");
        stack1 = helpers["if"].call(depth0, "notCurrentUser", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(14, program14, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                                        </div>\n                                    </td>\n                                    <td></td>\n                                    <td></td>\n                                ");
        return buffer;
    }
    function program14(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                                                <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeRole", "v", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.remove_roles")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                                            ");
        return buffer;
    }
    function program16(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "roles", options) : helperMissing.call(depth0, "i18n", "roles", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.user_roles")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n\n                            <td>\n                                <div class=\"col-lg-7\">\n                                    ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SelectTextField", {hash:{"class":("form-control"), "contentBinding":("roleList"), "valueBinding":("new_role_value"), "elementId":("new_role")}, hashTypes:{"class":"STRING", "contentBinding":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "contentBinding":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeLastRole", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.remove_roles")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "addMoreRoles", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.add_more_roles")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">+</button>\n                                </div>\n                            </td>\n                            <td>\n                            </td>\n                            <td></td>\n\n                        </tr>\n                    ");
        return buffer;
    }
    function program18(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n                    <tr>\n                        <td>\n                            ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "Tags", options) : helperMissing.call(depth0, "i18n", "Tags", options))));
        data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("quotas_tags_limit")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            <div class=\"col-lg-5\">\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("new_tag_value"), "elementId":("new_tag")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </div>\n                            <div class=\"col-lg-1\">\n                                <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeLastTag", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("remove_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                            </div>\n                            <div class=\"col-lg-1\">\n                                <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "addMoreTags", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("add_more_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">+</button>\n                            </div>\n\n                        </td>\n                    </tr>\n\n                    ");
        stack1 = helpers.each.call(depth0, "v", "in", "tags", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(19, program19, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n\n                ");
        return buffer;
    }
    function program19(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                        <tr>\n                            <td colspan=\"2\"></td>\n                            <td>\n                                <div class=\"col-lg-5\">\n                                    ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ReadOnlyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("v.name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeTag", "v", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("remove_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                                </div>\n                            </td>\n                        </tr>\n                    ");
        return buffer;
    }
    function program21(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n\n                    <tr>\n                        <td>\n                            ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "Tags (Quota/Groups)", options) : helperMissing.call(depth0, "i18n", "Tags (Quota/Groups)", options))));
        data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("quotas_tags_limit")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            <div class=\"col-lg-5\">\n                                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("new_tag_value"), "elementId":("new_tag")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                            </div>\n                            <div class=\"col-lg-1\">\n                                <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeLastTag", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("remove_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                            </div>\n                            <div class=\"col-lg-1\">\n                                <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "addMoreTags", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("add_more_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">+</button>\n                            </div>\n\n                        </td>\n                    </tr>\n                ");
        return buffer;
    }
    data.buffer.push("\n\n<div class=\"col-lg-12\">\n    <div class=\"box\">\n        <header>\n            <div class=\"icons\"><i class=\"icon-ok\"></i></div>\n            <h5>Users</h5>\n            <div class=\"toolbar\">\n                <ul class=\"nav\">\n                    <li>\n                        <div class=\"btn-group hide\">\n                            <a class=\"accordion-toggle btn btn-xs minimize-box\" data-toggle=\"collapse\" href=\"#collapse3\">\n                                <i class=\"icon-chevron-up\"></i>\n                            </a>\n                            <button class=\"btn btn-xs btn-danger close-box\"><i class=\"icon-remove\"></i></button>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n\n        </header>\n        <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n            ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n\n\n");
    stack1 = helpers["if"].call(depth0, "disable", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(10, program10, data), fn:self.program(8, program8, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['project/modal/newprovider'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"col-lg-12\">\n    Enter project name :\n</div>\n\n<div class=\"col-lg-12 top15\">\n    ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control focus"), "placeholder":("Enter a project name"), "elementId":("projectNameText")}, hashTypes:{"class":"STRING", "placeholder":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "placeholder":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n</div>\n\n\n<div class=\"row mediumtopmargin row-fluid col-lg-12\">\n    <div class=\"row col-lg-12 text-center\">\n        <div class=\"row col-lg-6 text-left\">\n            <div class=\"col-lg-5 text-grey\">\n                API / Access Key\n            </div>\n            <div class=\"col-lg-1 text-grey text-right\">\n                <i class=\"fa fa-question-circle\" data-original-title=\"Configure this project\" data-toggle=\"tooltip\"></i>\n            </div>\n            <div class=\"col-lg-6\">\n                <hr/>\n            </div>\n        </div>\n        <div class=\"col-lg-1 text-left\">\n            <a ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "showChangeAppName", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" href=\"#\">Edit</a>\n        </div>\n        <div class=\"col-lg-4\">\n        </div>\n        <br/>\n    </div>\n</div>\n\n\n");
    return buffer;
}
);


templates['project/provider/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"alert alert-danger\">\n                    <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                    <strong>Error updating!</strong> ");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                ");
        stack1 = helpers["if"].call(depth0, "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    <div class=\"alert alert-info\">\n                        <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                        <strong>Saved!</strong> The new informations has been saved.\n                    </div>\n                ");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n                    <div class=\"alert\">\n                    &nbsp;\n                    </div>\n                ");
    }
    function program8(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "digitalocean.clientid", options) : helperMissing.call(depth0, "i18n", "digitalocean.clientid", options))));
        data.buffer.push("\n                            ");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "api_key", options) : helperMissing.call(depth0, "i18n", "api_key", options))));
        data.buffer.push("\n                            ");
        return buffer;
    }
    function program12(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "Quotas", options) : helperMissing.call(depth0, "i18n", "Quotas", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("quotas_tags_limit")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                <div class=\"col-lg-5\">\n                                    ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("new_tag_value"), "elementId":("new_tag")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeLastTag", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("remove_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "addMoreTags", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("add_more_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">+</button>\n                                </div>\n\n                            </td>\n                        </tr>\n\n                        ");
        stack1 = helpers.each.call(depth0, "v", "in", "tags", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(13, program13, data), contexts:[depth0, depth0, depth0], types:["ID", "ID", "ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n\n                    ");
        return buffer;
    }
    function program13(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n                            <tr>\n                                <td colspan=\"2\"></td>\n                                <td>\n                                    <div class=\"col-lg-5\">\n                                        ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ReadOnlyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("v.name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                                     </div>\n                                     <div class=\"col-lg-1\">\n                                        <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeTag", "v", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0], types:["ID", "ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("remove_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                                     </div>\n                                </td>\n                            </tr>\n                        ");
        return buffer;
    }
    function program15(depth0, data) {
        var buffer = "", helper, options;
        data.buffer.push("\n\n                        <tr>\n                            <td>\n                                ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "Quotas", options) : helperMissing.call(depth0, "i18n", "Quotas", options))));
        data.buffer.push("\n                            </td>\n                            <td>\n                                <i class=\"fa fa-question-circle\" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("quotas_tags_limit")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\"></i>\n                            </td>\n                            <td>\n                                <div class=\"col-lg-5\">\n                                    ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("new_tag_value"), "elementId":("new_tag")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeLastTag", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("remove_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\" >-</button>\n                                </div>\n                                <div class=\"col-lg-1\">\n                                    <button ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "addMoreTags", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" ");
        data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("add_more_tag")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
        data.buffer.push(" data-toggle=\"tooltip\">+</button>\n                                </div>\n\n                            </td>\n                        </tr>\n                    ");
        return buffer;
    }
    data.buffer.push("\n\n<div class=\"col-lg-12\">\n    <div class=\"box\">\n        <header>\n            <div class=\"icons\"><i class=\"icon-ok\"></i></div>\n            <h5>API Key</h5>\n            <div class=\"toolbar\">\n                <ul class=\"nav\">\n                    <li>\n                        <div class=\"btn-group hide\">\n                            <a class=\"accordion-toggle btn btn-xs minimize-box\" data-toggle=\"collapse\" href=\"#collapse3\">\n                                <i class=\"icon-chevron-up\"></i>\n                            </a>\n                            <button class=\"btn btn-xs btn-danger close-box\"><i class=\"icon-remove\"></i></button>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n\n        </header>\n        <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n            ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n            <form class=\"form-horizontal col-lg-12\" id=\"inline-validate\" novalidate=\"novalidate\">\n\n                <table class=\"row smalltopmargin col-lg-8 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"col-lg-6 text-left\"></th>\n                    </thead>\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "name", options) : helperMissing.call(depth0, "i18n", "name", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_name_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.name"), "elementId":("name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "tag", options) : helperMissing.call(depth0, "i18n", "tag", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_tag_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.tag"), "elementId":("tag")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "cloud", options) : helperMissing.call(depth0, "i18n", "cloud", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers["ReadOnly-TextField"] || (depth0 && depth0["ReadOnly-TextField"]), options = {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.type"), "elementId":("cloud")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ReadOnly-TextField", options))));
    data.buffer.push("\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            ");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("content.type"), "param2":("Digitalocean")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(8, program8, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n                            ");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("content.type"), "param2":("Digitalocean")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(10, program10, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("digitalocean.clientid_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "refBinding":("content.apikey"), "valueBinding":("content.apikey"), "elementId":("apikey")}, hashTypes:{"class":"STRING", "refBinding":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "refBinding":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n\n\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "secret_key", options) : helperMissing.call(depth0, "i18n", "secret_key", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <!--<i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("digitalocean.clientid_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>-->\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.EmptyTextField", {hash:{"class":("form-control col-lg-6"), "refBinding":("content.secretkey"), "placeholderTranslate":("leave_empty_if_you_do_not_want_to_change_it"), "valueBinding":("content.secretkey"), "elementId":("secretkey")}, hashTypes:{"class":"STRING", "refBinding":"STRING", "placeholderTranslate":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "refBinding":depth0, "placeholderTranslate":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n\n\n                    ");
    stack1 = helpers["if"].call(depth0, "tags.length", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(15, program15, data), fn:self.program(12, program12, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n                </table>\n\n\n\n                    <div class=\"form-group\">\n                        <label class=\"control-label col-lg-4\">\n\n                        </label>\n\n                        <div class=\"col-lg-8\">\n\n                        </div>\n                    </div>\n\n\n\n                <div class=\"form-actions row col-lg-12\">\n                    <div style=\"height:35px\">\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteAPI", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Delete\" class=\"btn btn-danger\">\n                        </div>\n                        <div class=\"col-lg-8\">\n                            &nbsp;\n                        </div>\n                        <div class=\"col-lg-3 text-right\">\n\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAPI", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Cancel\" class=\"btn btn-default\">\n\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateAPI", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Save\" class=\"btn btn-primary\">\n\n                        </div>\n                    </div>\n                </div>\n\n            </form>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['project/quota/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"alert alert-danger\">\n                    <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                    <strong>Error updating!</strong> ");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                ");
        stack1 = helpers["if"].call(depth0, "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    <div class=\"alert alert-info\">\n                        <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                        <strong>Saved!</strong> The new informations has been saved.\n                    </div>\n                ");
        return buffer;
    }
    function program6(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    \n                ");
        return buffer;
    }
    data.buffer.push("\n\n<div class=\"col-lg-12\">\n    <div class=\"box\">\n        <header>\n            <div class=\"icons\"><i class=\"icon-ok\"></i></div>\n            <h5>Quotas</h5>\n            <div class=\"toolbar\">\n                <ul class=\"nav\">\n                    <li>\n                        <div class=\"btn-group hide\">\n                            <a class=\"accordion-toggle btn btn-xs minimize-box\" data-toggle=\"collapse\" href=\"#collapse3\">\n                                <i class=\"icon-chevron-up\"></i>\n                            </a>\n                            <button class=\"btn btn-xs btn-danger close-box\"><i class=\"icon-remove\"></i></button>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n\n        </header>\n        <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n            ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n            <form class=\"form-horizontal col-lg-12\" id=\"inline-validate\" novalidate=\"novalidate\">\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "quota.tag", options) : helperMissing.call(depth0, "i18n", "quota.tag", options))));
    data.buffer.push("</label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.name"), "elementId":("name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"control-label col-lg-4\">\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "quota.compute", options) : helperMissing.call(depth0, "i18n", "quota.compute", options))));
    data.buffer.push("\n                    </label>\n\n                    <div class=\"col-lg-8\">\n                        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NumberTextField", {hash:{"class":("form-control col-lg-6 focus"), "isValidOnFocusOutFeedbackMsgBinding":("errorMsg"), "valueBinding":("content.compute"), "check":("positiveOnly"), "elementId":("compute")}, hashTypes:{"class":"STRING", "isValidOnFocusOutFeedbackMsgBinding":"STRING", "valueBinding":"STRING", "check":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "isValidOnFocusOutFeedbackMsgBinding":depth0, "valueBinding":depth0, "check":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                    </div>\n                </div>\n\n\n\n                <div class=\"form-actions row col-lg-12\">\n                    <div>\n                        <div class=\"col-lg-1\">\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRecord", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Delete\" class=\"btn btn-danger\">\n                        </div>\n                        <div class=\"col-lg-8\">\n                            &nbsp;\n                        </div>\n                        <div class=\"col-lg-3 text-right\">\n\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Cancel\" class=\"btn btn-default\">\n\n                            <input type=\"submit\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "update", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" value=\"Save\" class=\"btn btn-primary\">\n\n                        </div>\n                    </div>\n                </div>\n\n            </form>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);


templates['project/server/create'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n    <div class=\"row mediumtopmargin\">\n        <div class=\"col-lg-2\">\n        </div>\n        <div class=\"alert alert-danger col-lg-8\">\n            <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n            <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        </div>\n    </div>\n");
        return buffer;
    }
    data.buffer.push("\n");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n\n\n\n<div class=\"row mediumtopmargin\">\n    <div class=\"col-lg-2 text-center\">\n    </div>\n    <div class=\"col-lg-3 text-right\">\n        <h2 class=\"text-primary\">Hostname</h2>\n    </div>\n    <div class=\"col-lg-5 text-left\">\n        ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"type":("text"), "value":("shortHostName"), "placeholder":("Enter your desired short hostname"), "style":("width: 100%;height: 40px;color: #428bca;border: 0px;border-bottom: dotted;border-bottom: aliceblu;"), "elementId":("shortHostName")}, hashTypes:{"type":"STRING", "value":"ID", "placeholder":"STRING", "style":"STRING", "elementId":"STRING"}, hashContexts:{"type":depth0, "value":depth0, "placeholder":depth0, "style":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n    </div>\n    <br/>\n    <br/>\n</div>\n\n\n\n");
    data.buffer.push(escapeExpression((helper = helpers["providerselection-view"] || (depth0 && depth0["providerselection-view"]), options = {hash:{"selected_providerBinding":("selected_provider")}, hashTypes:{"selected_providerBinding":"STRING"}, hashContexts:{"selected_providerBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "providerselection-view", options))));
    data.buffer.push("\n\n");
    data.buffer.push(escapeExpression((helper = helpers["regionselection-view"] || (depth0 && depth0["regionselection-view"]), options = {hash:{"regionsAvailableBinding":("regionsAvailable"), "slugBinding":("slug")}, hashTypes:{"regionsAvailableBinding":"STRING", "slugBinding":"STRING"}, hashContexts:{"regionsAvailableBinding":depth0, "slugBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "regionselection-view", options))));
    data.buffer.push("\n\n\n\n<div class=\"row mediumtopmargin\">\n        <div class=\"col-lg-3\"></div>\n        <div class=\"col-lg-9\">\n        ");
    data.buffer.push(escapeExpression((helper = helpers["regionsizeselection-view"] || (depth0 && depth0["regionsizeselection-view"]), options = {hash:{"selectedSizeBinding":("selected_size"), "availableSizeBinding":("regionsSizeAvailable")}, hashTypes:{"selectedSizeBinding":"STRING", "availableSizeBinding":"STRING"}, hashContexts:{"selectedSizeBinding":depth0, "availableSizeBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "regionsizeselection-view", options))));
    data.buffer.push("\n        </div>\n</div>\n\n<div class=\"row col-lg-12 mediumtopmargin\">\n\n    <div class=\"col-lg-3\"></div>\n    <div class=\"col-lg-9\">\n        ");
    data.buffer.push(escapeExpression((helper = helpers["imageselection-view"] || (depth0 && depth0["imageselection-view"]), options = {hash:{"selectedImageBinding":("selected_image"), "availableImagesBinding":("availableImages"), "distroBinding":("distros"), "selectedDistroBinding":("selectedDistro")}, hashTypes:{"selectedImageBinding":"STRING", "availableImagesBinding":"STRING", "distroBinding":"STRING", "selectedDistroBinding":"STRING"}, hashContexts:{"selectedImageBinding":depth0, "availableImagesBinding":depth0, "distroBinding":depth0, "selectedDistroBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "imageselection-view", options))));
    data.buffer.push("\n    </div>\n</div>\n\n\n<div class=\"row mediumtopmargin\">\n\n    <div class=\"col-lg-3\"></div>\n    <div class=\"col-lg-9\">\n        ");
    data.buffer.push(escapeExpression((helper = helpers["sshkeyselection-view"] || (depth0 && depth0["sshkeyselection-view"]), options = {hash:{"selectedKeyBinding":("selected_key"), "availableKeysBinding":("availableKeys")}, hashTypes:{"selectedKeyBinding":"STRING", "availableKeysBinding":"STRING"}, hashContexts:{"selectedKeyBinding":depth0, "availableKeysBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "sshkeyselection-view", options))));
    data.buffer.push("\n    </div>\n\n</div>\n\n\n\n<div class=\"row mediumtopmargin\">\n    <div class=\"col-lg-3\"></div>\n    <div class=\"col-lg-6 centered text-center btn btn-success\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "createServer", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(">Create Server</div>\n</div>\n");
    return buffer;
}
);


templates['project/server/destroy'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        data.buffer.push("\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        We apologize but someone have deleted this server.\n        <br/>\n        <br/>\n        <br/>\n\n    </div>\n\n");
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n\n    ");
        stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        ");
        stack1 = helpers["if"].call(depth0, "type", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(10, program10, data), fn:self.program(8, program8, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n    </div>\n\n");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n        <div class=\"col-lg-2\">\n        </div>\n        <div class=\"alert alert-danger col-lg-8\">\n            <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n            <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        </div>\n    ");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n        <div class=\"alert\">&nbsp;</div>\n    ");
    }
    function program8(depth0, data) {
        data.buffer.push("\n                <br/><br/><br/><br/><br/>\n                This is not enabled for managed servers from here, as it would cause downtime.\n                <br/><br/>\n                Please use an operations from the proper manage section ie: \"Database\"\n                <br/>\n                If you have any questions, feel free to create a support ticket.\n                <br/>\n                Regards,\n                The ACenterA Team.\n        ");
    }
    function program10(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <br/>\n                <br/>\n                <br/>\n                <div class=\"alert alert-warning\"><strong>Warning!</strong>&nbsp;&nbsp;This will destroy your server and all of its data.</div>\n                <br/>\n                <br/>\n                <br/>\n                <br/>\n                <p>We recommend that you ensure to have taken backups of your files.</p>\n                <br/>\n                Do you wish to proceed?\n                <br/>\n\n                ");
        stack1 = helpers._triageMustache.call(depth0, "passwordconfirm-view", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n                <div class=\"row\" style=\"float:right\">\n                    <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "destroyServer", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"mediumtopmargin btn btn-primary btn-lg\" style=\"float:left\" >Destroy Server</a>\n                </div>\n        ");
        return buffer;
    }
    data.buffer.push("\n<br/>\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n");
    return buffer;
}
);


templates['project/server/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        data.buffer.push("\n    Archive..\n");
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n<div class=\"col-lg-12\">\n    <div class=\"box dark\">\n        <header>\n            <div class=\"\"><i class=\"icon-none\"></i></div>\n            <h5>Server Informations</h5>\n        </header>\n        <div id=\"div-1\" class=\"accordion-body collapse in body\">\n            <div class=\"row\">\n\n                <div class=\"form-group\">\n\n                    <label class=\"control-label col-lg-4\">Status</label>\n\n                    <div class=\"col-lg-8\">\n                        <label ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"class":("alertClass")}, hashTypes:{"class":"STRING"}, hashContexts:{"class":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(">\n                            ");
        stack1 = helpers._triageMustache.call(depth0, "content.status", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                        </label>\n                    </div>\n\n                    <label class=\"control-label col-lg-4\">Server Hostname</label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.name")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n\n\n                    <label class=\"control-label col-lg-4\">Memory <i class=\"hidden fa fa-question-circle tooltipasync\" style=\"cursor: help\"></i></label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.size.name")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n\n                    <label class=\"control-label col-lg-4\">Disk <i class=\"hidden  fa fa-question-circle tooltipasync\" style=\"cursor: help\"></i></label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.size.diskGb")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n\n\n                    <label class=\"control-label col-lg-4\">CPU</label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.size.cpu")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n\n\n\n\n                    <label class=\"control-label col-lg-4\">OS</label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.image_name")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n\n                    <label class=\"control-label col-lg-4\">IP Address</label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.ipAddress")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n                    <label class=\"control-label col-lg-4\">Private IP Address</label>\n\n                    <div class=\"col-lg-8\">\n                        <label class=\"form-control\">\n                            <input type=\"text\" class=\"noborder col-lg-12\" width=\"100%\" ");
        data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"value":("content.privateIpAddress")}, hashTypes:{"value":"STRING"}, hashContexts:{"value":depth0}, contexts:[], types:[], data:data})));
        data.buffer.push(" readonly/>\n                        </label>\n                    </div>\n\n                    <label class=\"control-label col-lg-4\">Region</label>\n\n\n                    <div class=\"col-lg-8\">\n                        ");
        data.buffer.push(escapeExpression((helper = helpers["regiontextbox-view"] || (depth0 && depth0["regiontextbox-view"]), options = {hash:{"slugBinding":("content.region_slug"), "region_nameBinding":("content.region_name")}, hashTypes:{"slugBinding":"STRING", "region_nameBinding":"STRING"}, hashContexts:{"slugBinding":depth0, "region_nameBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "regiontextbox-view", options))));
        data.buffer.push("\n                    </div>\n\n                    <!-- TODO: add group Tags ... -->\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>\n");
        return buffer;
    }
    data.buffer.push("\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    return buffer;
}
);


templates['project/server/reboot'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        data.buffer.push("\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        We apologize but someone have deleted this server.\n        <br/>\n        <br/>\n        <br/>\n\n    </div>\n\n");
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n");
        stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("content.status"), "param2":("off")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(8, program8, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("content.status"), "param2":("off")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(10, program10, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n    <div class=\"col-lg-2\">\n    </div>\n    <div class=\"alert alert-danger col-lg-8\">\n        <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n        <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    </div>\n");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n    <div class=\"alert\">&nbsp;</div>\n");
    }
    function program8(depth0, data) {
        var buffer = "";
        data.buffer.push("\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        Your server is currently offline.\n        <br/>\n        <br/>\n        <br/>\n        This will power on your server.\n        <br/>\n\n        <div class=\"form-group mediumtopmargin\">\n            <label class=\"control-label col-lg-4\">Password</label>\n\n            <div class=\"col-lg-8\">\n                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"type":("password"), "isValidOnFocusOutCallbackBinding":("errorMsg"), "valueBinding":("password"), "placeholder":("Enter your password to confirm."), "class":("passwordTextField"), "elementId":("password")}, hashTypes:{"type":"STRING", "isValidOnFocusOutCallbackBinding":"STRING", "valueBinding":"STRING", "placeholder":"STRING", "class":"STRING", "elementId":"STRING"}, hashContexts:{"type":depth0, "isValidOnFocusOutCallbackBinding":depth0, "valueBinding":depth0, "placeholder":depth0, "class":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n            </div>\n            <br/>\n        </div>\n\n        <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "powerOn", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"mediumtopmargin btn btn-primary btn-lg\" style=\"float:right\" >Power On</a>\n\n    </div>\n\n");
        return buffer;
    }
    function program10(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        Your server is currently powered on.\n        <br/>\n        <br/>\n        <br/>\n        ");
        stack1 = helpers["if"].call(depth0, "type", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(13, program13, data), fn:self.program(11, program11, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n        <br/>\n        <p>We recommend rebooting your droplet through the command line, as this action is the same as hard resetting the server and may cause data corruption.</p>\n        <br/>\n        Do you wish to proceed?\n        <br/>\n\n        ");
        stack1 = helpers._triageMustache.call(depth0, "passwordconfirm-view", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n        <div class=\"row\" style=\"float:right\">\n            ");
        stack1 = helpers["if"].call(depth0, "type", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(17, program17, data), fn:self.program(15, program15, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n            <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "reboot", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"leftmargin mediumtopmargin btn btn-default btn-lg\" style=\"float:right\" >Reboot</a>\n        </div>\n\n    </div>\n\n");
        return buffer;
    }
    function program11(depth0, data) {
        data.buffer.push("\n            <p>This will force a hard reboot of your server.</p>\n            <div class=\"alert alert-danger\">\n                You should only use this as last resort as it could cause data corruptions.\n            </div>\n        ");
    }
    function program13(depth0, data) {
        data.buffer.push("\n            <p>This will power off your server.</p>\n        ");
    }
    function program15(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                \n            ");
        return buffer;
    }
    function program17(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "powerOff", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"mediumtopmargin btn btn-primary btn-lg\" style=\"float:left\" >Power Off</a>\n            ");
        return buffer;
    }
    data.buffer.push("\n\n<br/>\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n");
    return buffer;
}
);


templates['project/server/resize'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        data.buffer.push("\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        We apologize but someone have deleted this server.\n        <br/>\n        <br/>\n        <br/>\n\n    </div>\n\n");
    }
    function program3(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n\n\n\n<br/>\n");
        stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n\n\n");
        stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("content.status"), "param2":("off")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(8, program8, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n");
        stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("content.status"), "param2":("off")}, hashTypes:{"param1":"ID", "param2":"STRING"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(13, program13, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n    <div class=\"col-lg-2\">\n    </div>\n    <div class=\"alert alert-danger col-lg-8\">\n        <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push(" class=\"close\">\xd7</button>\n        <strong> ");
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "error_alert_prefix", options) : helperMissing.call(depth0, "i18n", "error_alert_prefix", options))));
        data.buffer.push("&nbsp;&nbsp;</strong>");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n    </div>\n");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n    <div class=\"alert\">&nbsp;</div>\n");
    }
    function program8(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n    <div class=\"col-lg-6\">\n\n        ");
        stack1 = helpers["if"].call(depth0, "type", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(11, program11, data), fn:self.program(9, program9, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n    </div>\n\n    <div class=\"col-lg-3\">\n        &nbsp;\n    </div>\n\n");
        return buffer;
    }
    function program9(depth0, data) {
        data.buffer.push("\n            Fast-Resize\n            <br/><br/>\n            This is not enabled from here for managed servers since it would cause downtime.\n            <br/><br/>\n            Please use an operations from the proper manage section ie: \"Database\"\n            <br/>\n            If you have any questions, feel free to create a support ticket.\n            <br/>\n            Regards,\n            The ACenterA Team.\n        ");
    }
    function program11(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n            Fast-Resize\n            <br/><br/>\n            Will allocate the upgraded RAM and Cores for your virtual server without making any disk size changes. 1 Minute downtime.\n            <br/><br/>\n            Please poweroff your server from the command line first before initiating a resize.\n            <br/><br/>\n\n            ");
        stack1 = helpers._triageMustache.call(depth0, "passwordconfirm-view", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n\n\n            <div class=\"row\" style=\"float:right\">\n\n                <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "powerOff", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"mediumtopmargin btn btn-primary btn-lg\" style=\"float:left\" >Power Off</a>\n\n            </div>\n        ");
        return buffer;
    }
    function program13(depth0, data) {
        var buffer = "", stack1, helper, options;
        data.buffer.push("\n   <div class=\"row col-lg-12 text-left\">\n       <div class=\"row col-lg-3\">\n           &nbsp;\n       </div>\n       <div class=\"row col-lg-6\">\n        Fast-Resize\n        <br/><br/>\n        Will allocate the upgraded RAM and Cores for your virtual server without making any disk size changes. 1 Minute downtime.\n        <br/><br/>\n\n        Great lets do it!\n        <br/><br/>\n        After the resize is finished Boot it from the control panel: \"Power\" > \"Power On\"\n        <br/>\n        <br/>\n      </div>\n       <div class=\"row col-lg-3\">\n           &nbsp;\n       </div>\n   </div>\n\n        <div class=\"row col-lg-12 text-center\">\n            <div class=\"col-lg-2 \">&nbsp;</div>\n            <div class=\"col-lg-7 \">\n\n                ");
        data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("66"), "type":("do"), "currsizeBinding":("content.size.id"), "selsizeBinding":("selectedSize"), "availableSizesBinding":("availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
        data.buffer.push("\n\n                ");
        data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("63"), "type":("do"), "currsizeBinding":("content.size.id"), "selsizeBinding":("selectedSize"), "availableSizesBinding":("availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
        data.buffer.push("\n\n                ");
        data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("62"), "type":("do"), "currsizeBinding":("content.size.id"), "selsizeBinding":("selectedSize"), "availableSizesBinding":("availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
        data.buffer.push("\n            </div>\n            <div class=\"col-lg-3 \">&nbsp;</div>\n        </div>\n        <br/>\n        <div class=\"row col-lg-12  text-center\">\n            <div class=\"col-lg-2 \">&nbsp;</div>\n            <div class=\"col-lg-7 \">\n                ");
        data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("64"), "type":("do"), "currsizeBinding":("content.size.id"), "selsizeBinding":("selectedSize"), "availableSizesBinding":("availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
        data.buffer.push("\n\n                ");
        data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("65"), "type":("do"), "currsizeBinding":("content.size.id"), "selsizeBinding":("selectedSize"), "availableSizesBinding":("availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
        data.buffer.push("\n\n                ");
        data.buffer.push(escapeExpression((helper = helpers["doregionsize-view"] || (depth0 && depth0["doregionsize-view"]), options = {hash:{"content":("61"), "type":("do"), "currsizeBinding":("content.size.id"), "selsizeBinding":("selectedSize"), "availableSizesBinding":("availableSize")}, hashTypes:{"content":"STRING", "type":"STRING", "currsizeBinding":"STRING", "selsizeBinding":"STRING", "availableSizesBinding":"STRING"}, hashContexts:{"content":depth0, "type":depth0, "currsizeBinding":depth0, "selsizeBinding":depth0, "availableSizesBinding":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "doregionsize-view", options))));
        data.buffer.push("\n            </div>\n            <div class=\"col-lg-3 \">&nbsp;</div>\n        </div>\n\n       <div class=\"row col-lg-12  text-center\">\n           <div class=\"col-lg-2 \">&nbsp;</div>\n           <div class=\"col-lg-7 \">\n                ");
        stack1 = helpers._triageMustache.call(depth0, "passwordconfirm-view", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n           </div>\n       </div>\n\n       <div class=\"row col-lg-12  text-center\">\n           <div class=\"col-lg-2 \">&nbsp;</div>\n           <div class=\"col-lg-5 \" style=\"float:right\">\n                   <a ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "resize", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"mediumtopmargin btn btn-primary btn-lg\" style=\"float:left\" >Resize</a>\n           </div>\n       </div>\n\n");
        return buffer;
    }
    data.buffer.push("\n\n<br/>\n");
    stack1 = (helper = helpers["if-equal"] || (depth0 && depth0["if-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "if-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    stack1 = (helper = helpers["else-equal"] || (depth0 && depth0["else-equal"]), options = {hash:{"param1":("archive"), "param2":("content.status")}, hashTypes:{"param1":"STRING", "param2":"ID"}, hashContexts:{"param1":depth0, "param2":depth0}, inverse:self.noop, fn:self.program(3, program3, data), contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "else-equal", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n");
    return buffer;
}
);


templates['project/server/create/status'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var stack1;
    stack1 = helpers._triageMustache.call(depth0, "taskstatus-view", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    } else {
        data.buffer.push("");
    }
}
);


templates['project/sshkey/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"alert alert-danger\">\n                    <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                    <strong>Error updating!</strong> ");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program3(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                ");
        stack1 = helpers["if"].call(depth0, "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(6, program6, data), fn:self.program(4, program4, data), contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n            ");
        return buffer;
    }
    function program4(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    <div class=\"alert alert-info\">\n                        <button type=\"button\" class=\"close\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "clear", "controller", "successMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0, depth0, depth0], types:["ID", "ID", "STRING"], data:data})));
        data.buffer.push("\">\xd7</button>\n                        <strong>Saved!</strong> The new informations has been saved.\n                    </div>\n                ");
        return buffer;
    }
    function program6(depth0, data) {
        data.buffer.push("\n                    <div class=\"alert\">\n                    &nbsp;\n                    </div>\n                ");
    }
    function program8(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                    <div class=\"form-actions row col-lg-12\">\n                        <div style=\"height:35px\">\n                            <div class=\"col-lg-1\">\n                                <input type=\"submit\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteRecord", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" value=\"Delete\" class=\"btn btn-danger\">\n                            </div>\n                            <div class=\"col-lg-8\">\n                                &nbsp;\n                            </div>\n                            <div class=\"col-lg-3 text-right\">\n\n                                <input type=\"submit\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" value=\"Cancel\" class=\"btn btn-default\">\n\n                                <input type=\"submit\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "update", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" value=\"Save\" class=\"btn btn-primary\">\n\n                            </div>\n                        </div>\n                    </div>\n                ");
        return buffer;
    }
    data.buffer.push("\n\n<div class=\"col-lg-12\">\n    <div class=\"box\">\n        <header>\n            <div class=\"icons\"><i class=\"icon-ok\"></i></div>\n            <h5>SSH Key</h5>\n            <div class=\"toolbar\">\n                <ul class=\"nav\">\n                    <li>\n                        <div class=\"btn-group hide\">\n                            <a class=\"accordion-toggle btn btn-xs minimize-box\" data-toggle=\"collapse\" href=\"#collapse3\">\n                                <i class=\"icon-chevron-up\"></i>\n                            </a>\n                            <button class=\"btn btn-xs btn-danger close-box\"><i class=\"icon-remove\"></i></button>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n\n        </header>\n        <div id=\"collapse3\" class=\"accordion-body collapse in body\">\n            ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n            <form class=\"form-horizontal col-lg-12\" id=\"inline-validate\" novalidate=\"novalidate\">\n\n                <table class=\"row smalltopmargin col-lg-8 text-grey smallleftpad\" >\n                    <thead>\n                    <th class=\"row smalltopmargin col-lg-2 text-left\"></th>\n                    <th class=\"col-lg-1 text-right\"></th>\n                    <th class=\"col-lg-6 text-left\"></th>\n                    </thead>\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "name", options) : helperMissing.call(depth0, "i18n", "name", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_name_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.name"), "elementId":("name")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "tag", options) : helperMissing.call(depth0, "i18n", "tag", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                            <i class=\"fa fa-question-circle\" ");
    data.buffer.push(escapeExpression((helper = helpers["bind-attr-i18n"] || (depth0 && depth0["bind-attr-i18n"]), options = {hash:{"data-original-title":("project.create_tag_tooltip")}, hashTypes:{"data-original-title":"STRING"}, hashContexts:{"data-original-title":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bind-attr-i18n", options))));
    data.buffer.push(" data-toggle=\"tooltip\"></i>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyNoSpaceTextField", {hash:{"class":("form-control col-lg-6"), "valueBinding":("content.tag"), "elementId":("tag")}, hashTypes:{"class":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "public_key", options) : helperMissing.call(depth0, "i18n", "public_key", options))));
    data.buffer.push("\n                        </td>\n                        <td>\n                        </td>\n                        <td>\n                            ");
    data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NotEmptyTextField", {hash:{"class":("form-control col-lg-6"), "refBinding":("content.publickey"), "valueBinding":("content.publickey"), "elementId":("publickey")}, hashTypes:{"class":"STRING", "refBinding":"STRING", "valueBinding":"STRING", "elementId":"STRING"}, hashContexts:{"class":depth0, "refBinding":depth0, "valueBinding":depth0, "elementId":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push("\n                        </td>\n                    </tr>\n\n                </table>\n\n\n\n                    <div class=\"form-group\">\n                        <label class=\"control-label col-lg-4\">\n\n                        </label>\n\n                        <div class=\"col-lg-8\">\n\n                        </div>\n                    </div>\n\n\n\n                ");
    stack1 = helpers["if"].call(depth0, "canEditKey", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(8, program8, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n            </form>\n        </div>\n    </div>\n</div>");
    return buffer;
}
);

})();
