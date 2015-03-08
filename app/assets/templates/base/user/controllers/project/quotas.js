

App.ProjectQuotasRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            controller.send('cancel');
       }
});

App.ProjectQuotasView = App.BaseView.extend({
       didRender: function() {
          //$("#addCloud").click();
       }
});


App.ProjectQuotasController = Ember.ObjectController.extend({
    needs : [ "application","project"],
    breadcrumbTitle: "Quotas",
    new_provider_name: "",
    content: Ember.computed.alias('controllers.project.project').cacheable(),
    actions: {
            select: function (provider) {
                try {
                    jq("#digitalocean").removeClass("selborder");

                    if (provider != null) {
                        jq("#" + provider).addClass("selborder");
                    }
                } catch (e) {
                }
            },
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

                if ( Ember.View.views['new_quota_name'].validate() ) {

                            var q = this.get('store').createRecord('Quota',{});
                            q.set('name', this.get('new_quota_name'));
                            q.set('compute', this.get('new_quota_compute'));


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
                                 self.transitionToRoute('project.quotas');
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
