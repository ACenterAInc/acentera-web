

App.ProjectProvidersRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            controller.send('cancelNewProvider');
       }
});

App.ProjectProvidersView = App.BaseView.extend({
       didRender: function() {
          //$("#addCloud").click();
       }
});


App.ProjectProvidersController = Ember.ObjectController.extend({
    needs : [ "application","project"],
    breadcrumbTitle: "Providers",
    selectedProviderType: null,
    new_provider_apikey: "",
    new_provider_secretkey: "",
    content: Ember.computed.alias('controllers.project.project').cacheable(),
    actions: {
            select: function (provider) {
                try {
                    this.set('selectedProviderType',provider);

                    jq("#digitalocean").removeClass("selborder");

                    if (provider != null) {
                        jq("#" + provider).addClass("selborder");
                    }
                } catch (e) {
                }
            },
            cancelNewProvider: function(e) {
                resetValues(this, ['new_provider_tag', 'new_provider_name', 'new_provider_apikey','new_provider_secretkey']);
                var isVisible = $("#createProvider:visible");
                if (isVisible.length > 0) {
                    $("#addCloud").click();
                }

                scrollTop();
            },
            addNewProvider: function(e) {
                var self = this;
                try {

                if ( Ember.View.views['new_provider_name'].validate() && Ember.View.views['new_provider_tag'].validate() &&
                                    Ember.View.views['new_provider_apikey'].validate() &&
                                    Ember.View.views['new_provider_secretkey'].validate() ) {

                            var prov = this.get('store').createRecord('Provider',{});
                            prov.set('name', this.get('new_provider_name'));
                            prov.set('tag', this.get('new_provider_tag'));
                            prov.set('apikey', this.get('new_provider_apikey'));
                            prov.set('secretkey', this.get('new_provider_secretkey'));
                            prov.set('type', App.capitalize(this.get('selectedProviderType')));

                            AppController.setStartLoadingWithDelay();

                            prov.save().then(function(e) {
                                 prov.deleteRecord();
                                 //Object will automatically update the browser... lets just close

                                 self.get('controllers.project.content').reload().then(function (e) {
                                        Ember.run.next(self, function() {
                                          running--;
                                        });
                                 });
                                 self.send('cancelNewProvider');
                                 self.transitionToRoute('project.providers');
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
