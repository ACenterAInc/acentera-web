
App.ProjectServerCreateStatusRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            //model.reload();
       },
       actions: {
       }
});

App.ProjectServerCreateStatusView = App.BaseView.extend({
      didRender: function() {
         //
      }
});

App.ProjectServerCreateStatusController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        breadcrumbTitle: "Task Status",
        showErrorGoBackButton: false,
        error_route: null,
        error_model: null,
        actions: {
            taskCompleted: function(e) {
                //alert('completed');
                /*var self = this;
                self.get('controllers.project.content').reload().then(function (e) {
                        Ember.run.next(self, function() {
                            self.transitionToRoute('project.servers');
                        });
                 });*/
            },
            taskError: function(e) {
                //alert('task response is error...');
            },
            taskErrorGoBackClick: function(e) {

                var t = {};

                if (App.Project.params.project_id) {
                    t['project_id'] = App.Project.params.project_id;
                }

                if (App.Apps.params.id) {
                   t['apps_id'] = App.Apps.params.id;
                }

             try {              if (App.Apps.params.id) {
                             t['apps_id'] = App.Apps.params.id;
                          }
                          } catch (ee) {}

                          /*if (App.App.params.id) {
                             t['app_id'] = App.App.params.id;
                          }*/
          try {
                          if (App.Appconfig.params.id) {
                             t['appconfig_id'] = App.Appconfig.params.id;
                          }
                          } catch (ee) {}

console.error("GOT T");
                console.error(t);

                if (this.get('error_model') == null) {

                    this.transitionToRoute(this.get('error_route'), t);

                } else {

                    this.transitionToRoute(this.get('error_route'), this.get('error_model'));

                }
            }
        }
});


