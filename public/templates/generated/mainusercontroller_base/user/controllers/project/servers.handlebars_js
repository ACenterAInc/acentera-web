

App.ProjectServersRoute = Ember.Route.extend({
    setupPrivateController: function(controller, model) {
            controller.set('servers', model);

    },
    model: function(params) {
        this.acenteraModel(params);
        var store = this.get('store');
        var servers = store.find("servers");
        return servers;
    }
});

App.ProjectServersView = App.BaseView.extend({
      didRender: function() {
         //$("#addCloud").click();
      }
});
App.ProjectServersController = Ember.ObjectController.extend({
    needs: [ "project" ],
    breadcrumbTitle: "Servers",
    showTable: true,
    servers: [],
    actions: {
    }
});