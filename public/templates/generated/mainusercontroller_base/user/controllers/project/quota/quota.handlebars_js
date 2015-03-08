

App.ProjectQuotaIndexRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            resetValues(this, ['errorMsg', 'successMsg']);
       },
       actions: {
              willTransition: function(transition) {
                  if (this.controller.get('content.isDirty')) {
                        //if (this.get('content.isDirty') || this.get('tagChanged')) {
                       /*//should show up a message?
                       if (confirm("You have pending changes, click OK if you want to modify/save them.")) {
                           transition.abort();
                       } else {
                           //cancel changes...
                           this.controller.get('account').rollback();
                       }
                       */
                       //cancel changes...
                      this.controller.get('content').rollback();
                  } else {

                  }
                  return true;
              }
          }
});

App.ProjectQuotaIndexController = Ember.ObjectController.extend({
        needs: ["project"],
        breadcrumbTitle: function() {
            return this.get('content').get('name');
        }.observes('content').property('content'),
        successMsg: null,
        content: null,
        actions: {
            cancel: function() {

                this.get('content').rollback();

                resetValues(this, ['errorMsg', 'successMsg']);
            },
            update: function() {
                     if (this.get('content.isDirty')) {
                         var self = this;
                         AppController.setStartLoadingWithDelay();

                         this.get('content').save().then(function(e) {
                             //On Delete, we do not return any content so it will go into Failure... since no object were returned...
                             //OK GREAT
                             //self.set('tags', e.get('content.tags'));

                             //Refresh of the Projects table...
                             self.get('controllers.project.content').reload().then(function (e) {
                                       Ember.run.next(self, function() {
                                         running--;
                                       });
                             });

                             self.set('successMsg', App.getI18NValue('success_saving_model_to_backend'));
                        }, function(response) {

                           //check of failed msg..
                           if (response.status == 200) {
                           } else {
                                //otherwise non 200 code = errors..
                                self.set('errorMsg', App.getI18NValue('error_saving_model_to_backend'));
                           }
                           running--;
                        });
                     }
            },
            deleteRecord: function() {
                     var self = this;

                     this.get('content').deleteRecord();

                     AppController.setStartLoadingWithDelay();

                     this.get('content').save().then(function(e) {
                         //On Delete, we do not return any content so it will go into Failure... since no object were returned...

                         //Refresh of the Projects table...
                         self.get('controllers.project.content').reload().then(function (e) {
                                  Ember.run.next(self, function() {
                                    self.transitionToRoute('project.quotas');
                                    running--;
                                  });
                         });
                    }, function(response) {

                       //on delete we check if we got a 200 status code (mean it was successfull)
                       if (response.status == 200) {
                                //??? got status object? { "status": .. "message": "??" }
                                //self.set('errorMsg', App.getI18NValue('error_deleting_model_to_backend'));
                       } else {
                            //otherwise non 200 code = errors..
                            self.set('errorMsg', App.getI18NValue('error_deleting_model_to_backend'));
                       }
                       running--;

                    });
            }
        }
});
