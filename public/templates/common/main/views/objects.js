(function() {
              var template = Ember.Handlebars.template,
                  templates = Ember.TEMPLATES = Ember.TEMPLATES || {};
                         
templates['blank'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    data.buffer.push("<br/>");
}
);


templates['emptyoutlet'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1;
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n");
    return buffer;
}
);


templates['i18n'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    data.buffer.push("tests<br/>");
}
);


templates['index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1;
    data.buffer.push("<div>\n    ");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n</div>\n\n");
    return buffer;
}
);


templates['leftmenu'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push(escapeExpression(helpers.view.call(depth0, {hash:{"templateName":("controller.leftmenuTemplate")}, hashTypes:{"templateName":"STRING"}, hashContexts:{"templateName":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push("\n\n");
    return buffer;
}
);


templates['modal'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, helper, options, escapeExpression = this.escapeExpression, helperMissing = helpers.helperMissing, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <div class=\"alert alert-danger\">\n                        ");
        stack1 = helpers._triageMustache.call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n                </div>\n            ");
        return buffer;
    }
    function program3(depth0, data) {
        data.buffer.push("\n            ");
    }
    function program5(depth0, data) {
        var buffer = "";
        data.buffer.push("\n                ");
        data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.GenericView", {hash:{"content":("view.content"), "getAppElementId":("view.getAppElementId"), "template_name":("view.tpl"), "controllerBinding":("view.controller")}, hashTypes:{"content":"ID", "getAppElementId":"ID", "template_name":"ID", "controllerBinding":"ID"}, hashContexts:{"content":depth0, "getAppElementId":depth0, "template_name":depth0, "controllerBinding":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push("\n            ");
        return buffer;
    }
    function program7(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <p>");
        stack1 = helpers._triageMustache.call(depth0, "view.content", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</p>\n            ");
        return buffer;
    }
    function program9(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{"target":("view")}, hashTypes:{"target":"STRING"}, hashContexts:{"target":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-default\" data-dismiss=\"modal\">");
        stack1 = helpers._triageMustache.call(depth0, "view.cancelText", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</button>\n            ");
        return buffer;
    }
    function program11(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n                <button type=\"button\" ");
        data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{"target":("view")}, hashTypes:{"target":"STRING"}, hashContexts:{"target":depth0}, contexts:[depth0], types:["ID"], data:data})));
        data.buffer.push(" class=\"btn btn-default hidden\" data-dismiss=\"modal\">");
        stack1 = helpers._triageMustache.call(depth0, "view.cancelText", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("</button>\n            ");
        return buffer;
    }
    data.buffer.push("<!-- Modal -->\n\n<div class=\"modal-dialog\"  ");
    data.buffer.push(escapeExpression((helper = helpers.bindStyle || (depth0 && depth0.bindStyle), options = {hash:{"unit":("px"), "width":("view.customWidth")}, hashTypes:{"unit":"STRING", "width":"ID"}, hashContexts:{"unit":depth0, "width":depth0}, contexts:[], types:[], data:data}, helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bindStyle", options))));
    data.buffer.push(">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n            <h4 class=\"modal-title\">");
    stack1 = helpers._triageMustache.call(depth0, "view.title", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("</h4>\n        </div>\n        <div class=\"modal-body row col-lg-12\">\n            ");
    stack1 = helpers["if"].call(depth0, "errorMsg", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(3, program3, data), fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n            ");
    stack1 = helpers["if"].call(depth0, "view.tpl", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(7, program7, data), fn:self.program(5, program5, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n\n            <div class=\"col-lg-12 top42\">\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            ");
    stack1 = helpers["if"].call(depth0, "view.cancelEnabled", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.program(11, program11, data), fn:self.program(9, program9, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n            <button type=\"button\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{"target":("view")}, hashTypes:{"target":"STRING"}, hashContexts:{"target":depth0}, contexts:[depth0], types:["ID"], data:data})));
    data.buffer.push(" class=\"btn btn-primary\">");
    stack1 = helpers._triageMustache.call(depth0, "view.saveText", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("</button>\n        </div>\n    </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->");
    return buffer;
}
);


templates['MustBeCheckedField'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push("<div class=\"\"><input type=\"checkbox\" ");
    data.buffer.push(escapeExpression(helpers["bind-attr"].call(depth0, {hash:{"checked":("view.checked")}, hashTypes:{"checked":"STRING"}, hashContexts:{"checked":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push(" disabled=\"disabled\"></div>\n\n");
    return buffer;
}
);


templates['topbarview'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", escapeExpression = this.escapeExpression;
    data.buffer.push(escapeExpression(helpers.view.call(depth0, {hash:{"templateName":("controller.leftmenuTemplate"), "topbarTemplateBinding":("view.topbarTemplate"), "hasLoadedBinding":("view.hasLoaded")}, hashTypes:{"templateName":"STRING", "topbarTemplateBinding":"ID", "hasLoadedBinding":"ID"}, hashContexts:{"templateName":depth0, "topbarTemplateBinding":depth0, "hasLoadedBinding":depth0}, contexts:[], types:[], data:data})));
    data.buffer.push("\n");
    return buffer;
}
);


templates['components/else-equal'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var buffer = "", stack1, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    stack1 = helpers.unless.call(depth0, "isEqual", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    }
    data.buffer.push("\n");
    return buffer;
}
);


templates['components/else-start-with'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var stack1, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    stack1 = helpers.unless.call(depth0, "startWith", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    } else {
        data.buffer.push("");
    }
}
);


templates['components/if-equal'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var stack1, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n    ");
        stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    stack1 = helpers["if"].call(depth0, "isEqual", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    } else {
        data.buffer.push("");
    }
}
);


templates['components/in-list'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var stack1, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    stack1 = helpers["if"].call(depth0, "inList", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    } else {
        data.buffer.push("");
    }
}
);


templates['components/start-with'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    var stack1, self = this;
    function program1(depth0, data) {
        var buffer = "", stack1;
        data.buffer.push("\n        ");
        stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{}, hashTypes:{}, hashContexts:{}, contexts:[depth0], types:["ID"], data:data});
        if (stack1 || stack1 === 0) {
            data.buffer.push(stack1);
        }
        data.buffer.push("\n");
        return buffer;
    }
    stack1 = helpers["if"].call(depth0, "startWith", {hash:{}, hashTypes:{}, hashContexts:{}, inverse:self.noop, fn:self.program(1, program1, data), contexts:[depth0], types:["ID"], data:data});
    if (stack1 || stack1 === 0) {
        data.buffer.push(stack1);
    } else {
        data.buffer.push("");
    }
}
);


templates['project/index'] = template(
function anonymous(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, ">= 1.0.0"];
    helpers = this.merge(helpers, Ember.Handlebars.helpers);
    data = data || {};
    data.buffer.push("\nCOMMON INDEX");
}
);

})();
