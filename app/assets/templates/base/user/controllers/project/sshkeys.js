

App.ProjectSshkeysRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            controller.send('cancelNewKey');
       }
});

App.ProjectSshkeysView = App.BaseView.extend({
       didRender: function() {
          //$("#addCloud").click();
       }
});


App.ProjectSshkeysController = Ember.ObjectController.extend({
    needs : [ "application","project"],
    breadcrumbTitle: "SSH Keys",
    new_key_name: "",
    new_key_tag: "",
    new_public_key: "",
    content: Ember.computed.alias('controllers.project.project').cacheable(),
    actions: {
            cancelNewKey: function(e) {
                resetValues(this, ['new_key_name', 'new_key_tag', 'new_public_key']);
                var isVisible = $("#createKey:visible");
                if (isVisible.length > 0) {
                    $("#addKey").click();
                }

                scrollTop();
            },
            addNewKey: function(e) {
                var self = this;
                try {

                if ( Ember.View.views['new_key_name'].validate() && Ember.View.views['new_key_tag'].validate() &&
                                    Ember.View.views['new_public_key'].validate()
                                                                                            ) {

                            var k = this.get('store').createRecord('Sshkey',{});
                            k.set('name', this.get('new_key_name'));
                            k.set('tag', this.get('new_key_tag'));
                            k.set('publickey', this.get('new_public_key'));

                            AppController.setStartLoadingWithDelay();

                            k.save().then(function(e) {
                                 k.deleteRecord();
                                 //Object will automatically update the browser... lets just close

                                 self.get('controllers.project.content').reload().then(function (e) {
                                        Ember.run.next(self, function() {
                                          running--;
                                        });
                                 });
                                 self.send('cancelNewKey');
                                 self.transitionToRoute('project.keys');
                            }, function(response) {
                               //if failure
                               //server responded with {"error":"some custom error message"}
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
