

App.ProjectIamsRoute = Ember.Route.extend({
    setupPrivateController: function(controller, model) {

    }
});

App.ProjectIamsView = App.BaseView.extend({
      didRender: function() {
         //$("#addCloud").click();
      }
});
App.ProjectIamsController = Ember.ObjectController.extend({
    needs: [ "project" ],
    breadcrumbTitle: "Users",
    users: Ember.computed.alias('controllers.project.users'),
    invite_email: null,
    actions: {
        cancel: function(e) {
            resetValues(this, ['new_quota_name','new_quota_compute']);
            this.set('errorMsg', null);

            var isVisible = $("#create:visible");
            if (isVisible.length > 0) {
                $("#add").click();
            }

            scrollTop();
        },
        add: function(e) {
            var self = this;
            try {

            if ( Ember.View.views['invite_email'].validate() ) {

                        var q = this.get('store').createRecord('ProjectInvite',{});
                        q.set('email', this.get('invite_email'));
                        AppController.setStartLoadingWithDelay();
                        q.save().then(function(e) {
                             q.deleteRecord();
                             //Object will automatically update the browser... lets just close

                             self.get('controllers.project.content').reload().then(function (e) {
                                    Ember.run.next(self, function() {
                                      running--;
                                    });
                             });
                             self.send('cancel');
                             self.transitionToRoute('project.iams');
                        }, function(response) {
                           //if failure
                           //server responded with {"error":"some custom error message"}
                           //alert('ttttFFFFAAAAPPPPP');
                           if (response.status == 200) {
                               if (! response.responseJSON.success) {
                                  self.set('errorMsg', response.responseJSON.message);
                               }
                           } else {

                                self.set('errorMsg', App.getI18NValue('error_saving_model_to_backend'));
                           }
                           running--;
                        });

             } else {
                     self.set('errorMsg', App.getI18NValue('error_invalid_fields_values'));
             }
            } catch (ew) {
            }
        }
    }
});
