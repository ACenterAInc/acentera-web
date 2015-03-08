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
        data.buffer.push("\n                          <!--\n                              <div class=\"btn-group\">\n                                  <a data-placement=\"bottom\" data-original-title=\"Show / Hide Sidebar\" data-toggle=\"tooltip\" class=\"btn btn-success btn-sm\" id=\"changeSidebarPos\">\n                                      <i class=\"icon-resize-horizontal\"></i>\n                                  </a>\n                              </div>\n                          -->\n\n                          <ul class=\"nav navbar-nav\">\n                              <li><div class=\"whitetext\" disabled>");
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


templates['main/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", helper, options, helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression;
    data.buffer.push("\n<div class=\"col-lg-12\">\n\n</div>\n\n\n\n");
    data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "admin", options) : helperMissing.call(depth0, "i18n", "admin", options))));
    data.buffer.push("\n\n\n");
    return buffer;
}
);


templates['main/leftmenu'] = template(
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
        data.buffer.push(escapeExpression((helper = helpers.i18n || (depth0 && depth0.i18n), options = {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "admin", options) : helperMissing.call(depth0, "i18n", "admin", options))));
        data.buffer.push("</a>\n    ");
        return buffer;
    }
    data.buffer.push("<div id=\"menu\">\n\n\n    ");
    stack1 = (helper = helpers["link-to"] || (depth0 && depth0["link-to"]), options = {hash:{"tagName":("li")}, hashTypes:{"tagName":"STRING"}, hashContexts:{"tagName":depth0}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["STRING"], data:data}, helper ? helper.call(depth0, "main.index", options) : helperMissing.call(depth0, "link-to", "main.index", options));
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n</div>");
    return buffer;
}
);

})();
