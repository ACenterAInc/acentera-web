

App.ProjectRoute = Ember.Route.extend({
       leftmenuTemplate: 'project/leftmenu',
       topbarTemplate: 'dual',
       setupPrivateController: function(controller, model) {
            //Small hack... because of how we use ember..
            //Set project_id parameter for future API Call's

            App.Provider.params = { project_id: model.get('id') };
            App.User.params = { project_id: model.get('id') };
            App.Quota.params = { project_id: model.get('id') };
            App.Role.params = { project_id: model.get('id') };
            App.Project.params = { project_id: model.get('id') };

            controller.set('controllers.application.selectedProject', model);
            controller.set('project', model);
            this.set('leftmenuModel', model);
            running--;
       },
       actions: {
                changeContext: function(e, v) {
                       var self = this;
                       var latestPath = App.Router.router.currentHandlerInfos;
                       latestPath = latestPath[latestPath.length-1].name;
                       try {
                            var store = this.get('controller').get('store');

                            store.find('project', e.get('id')).then(function(project) {
                                //force project reloading to get new users and other security infos
                                project.reload();
                                self.get('controller').transitionToRoute("project.index", project);
                            });

                       } catch (z) {
                       }

                  }
       },
       model: function(params) {
            App.Provider.params = params;//{project_id: param.project_id)};
            App.User.params = params;//{project_id: param.project_id)};
            App.Quota.params = params;//{project_id: param.project_id)};
            App.Role.params = params;//{project_id: param.project_id)};
            App.Project.params = params;//{project_id: param.project_id)};

            this.acenteraModel(params);
            return this.get('store').find('project', params.project_id);
            //alert(self.get('currentModel').project_id);
       }
});


App.ProjectController = Ember.ObjectController.extend({
    roles: [ '', 'ProjectAdmin', 'ReadOnly', 'CanEdit' ],
    breadcrumbVisible: false,
    project: null
});


App.ProjectIndexRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            /*console.error('tt33');
            this
            console.error(model);*/
       }
        /*model: function(param) {
              var self = this;
              //alert(param.project_id);
              var project = this.get('store').find('Project', App.Project.params.project_id);
              return project;
       }*/

});


try {
App.ProjectIndexController = Ember.ObjectController.extend({
    needs : [ "application" ],
    breadcrumbUseParentModel: true,
    breadcrumbTitle: "Project Overview",
    breadcrumbVisible: true,
    project: null,
    actions: {
        accept: function() {
            var self = this;

            var d =  {
                token : this.get('invitetoken'),
                action: 'accept'
            }

            AppController.setStartLoadingWithDelay();
            running++;
            sendPostMessage("project/" + App.Project.params.project_id + "/invite/"+this.get('invitetoken'),JSON.stringify(d), true).then(function(data) {
                 if (data) {
                    self.get('content').reload();

                    try {
                         var proj = self.get('store').all('projects').get('content');
                         var len = proj.length;
                         var prj = null
                         for (var i = 0; i < len && prj == null; i++) {
                            if (proj[i].get('id') == App.Project.params.project_id) {
                                prj = i;
                            }
                         }
                         if (proj[prj] != undefined) {
                            proj[prj].reload();
                         }
                     } catch (zz) {
                     }
                 }
                 running--;
            }, function(z) {running--;});
        },
        reject: function() {
            var self = this;

            var d = {
                token : this.get('invitetoken'),
                action: 'reject'
            }

            AppController.setStartLoadingWithDelay();
            running++;

            sendPostMessage("project/" + App.Project.params.project_id + "/invite/"+this.get('invitetoken'),JSON.stringify(d), true).then(function(data) {

                try {
                     var proj = self.get('store').all('projects').get('content')
                     var len = proj.length;
                     var prj = null
                     for (var i = 0; i < len && prj == null; i++) {
                        if (proj[i].get('id') == App.Project.params.project_id) {
                            prj = i;
                        }
                     }
                     if (proj[prj] != undefined) {
                        proj[prj].reload();
                     }
                 } catch (zz) {
                 }

                 AppController.transitionToRoute('main');
                 running--;
            }, function(z) {


                             try {
                                 var proj = self.get('store').all('projects').get('content');
                                 var len = proj.length;
                                 var prj = null
                                 for (var i = 0; i < len && prj == null; i++) {
                                    if (proj[i].get('id') == App.Project.params.project_id) {
                                        prj = i;
                                    }
                                 }
                                 if (proj[prj] != undefined) {
                                    proj[prj].reload();
                                 }
                                 //proj.removeObject(proj[prj]);
                             } catch (zz) {
                             }

                 AppController.transitionToRoute('main');

                 running--;
            });
        }
    }
});

} catch (ze) {

}
