App.MainRoute = Ember.Route.extend({
       leftmenuTemplate: 'main/leftmenu',
       topbarTemplate: 'single',
       setupPrivateController: function(controller, model) {
            running++;
            model.projects.then(function(e) {
                  controller.set('projects', e.get('content'));//.get('content'));
                  running--;
            });
       },
       model: function(params) {
        var store = this.get('store');
        var multimodel = {
                projects: store.findAll('projects')
        }
        return multimodel;
       }
});


App.MainIndexController = Ember.ObjectController.extend({
    breadcrumbUseParentModel: true,
    breadcrumbTitle: "Projects",
    breadcrumbVisible: true,
    //projects: [],  //--removed somehow this breaks...
    pendingInvites: function() {
        var pendingProjects = [];
        try {
            var projects = this.get('projects');

            var projectLen = this.get('projects').length;
            for (var i = 0; i < projectLen; i++) {
                if ((projects[i].get('type') == 'invited') && (projects[i].get('invitetoken') != null)) {
                    pendingProjects.push(projects[i]);
                }
            }
        } catch (ee) {
        }
        return pendingProjects;
    }.observes('projects','projects.@each','projects.@each.invitetoken').property('projects.@each','projects.@each.invitetoken'),
    actions: {
        createNewProject: function() {
               var self = this;
               var model = { title: "Create project",  extra : "", content: this.get('content'),
                                 tpl: "main/modal/newproject",
                                 saved: false,
                                 controller: this,
                                 custom_destroy: function(m) {
                                     try {
                                           //Remove added
                                           //Ember.View.views['projectNameText'].remove();
                                      } catch (ee) {
                                      }
                                 },
                                 save: function(m) {
                                     if (Ember.View.views['projectNameText'].validate()) {

                                            try {
                                               var theObj = self.get('store').createRecord('projects', { name : Ember.View.views['projectNameText'].get('value').trim() });
                                               theObj.save().then(function(e,k) {
                                                     //Object will automatically update the browser... lets just close
                                                     m.send('close');
                                               }, function(response) {
                                                   //if failure
                                                   //server responded with {"error":"some custom error message"}
                                                   //BUT HOW TO CATCH THIS AND POSSIBLY REMOVE THE MODEL FROM THE STORE
                                                   if (! response.responseJSON.success) {
                                                      m.set('errorMsg', response.responseJSON.message);
                                                      $("#" + Ember.View.views['projectNameText'].get('elementId')).removeClass("success").addClass("error");

                                                   }
                                                   //m.send('close');
                                                });
                                            } catch (e) {
                                            }
                                     }
                                 }
                }

                this.get('controllers.application').send('openModal',model );
        }
    }
});
