
App.ProjectProviderIndexRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            //alert('t1');
            try {
                if (model.get('tags') == undefined) {
                           model.set('tags',[]);
                }
                controller.set('backupTags', model.get('tags').slice(0));
                controller.set('tagChanged', false);
                resetValues(this, ['errorMsg', 'successMsg']);
                controller.set('content', model);
            } catch (e) {
            }
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

App.ProjectProviderIndexController = Ember.ObjectController.extend({
        needs: ["project"],
        breadcrumbTitle: function() {
            return this.get('content').get('name');
        }.property('content.name'),
        backupTags: [],
        new_tagChange: function() {
            this.set('tagChanged', true);
        }.observes('new_tag_value'),
        tags: [],
        tagsCheck: function() {
            this.set('tags',[]);
            if (this.get('content.tags') == undefined) {
                this.set('content.tags', []);
            }
            for(var i = 0; i < this.get('content.tags').length; i++ ) {
                this.get('tags').pushObject(this.get('content.tags')[i]);
            }
        }.observes('content.tags.@each'),
        newTags: [],
        tagChanged: false,
        successMsg: null,
        content: null,
        actions: {
            removeLastTag: function() {
                Ember.View.views['new_tag'].set('value','');
                $("#new_tag").removeClass("success").removeClass("error");
            },
            removeTag: function(v) {
                var self = this;
                //this.get('tags').removeObject(v);
                this.get('content.tags').removeObject(v);
                self.set('tagChanged', true);
            },
            addMoreTags: function() {
                try {
                    var self = this;
                    if (Ember.View.views['new_tag'].value  != undefined) {
                        if (Ember.View.views['new_tag'].value.trim() != '') {
                            if (Ember.View.views['new_tag'].validate()) {
                                self.set('tagChanged', true);
                                var tag = {
                                             name: ''
                                };

                                try {
                                    tag['name'] = Ember.View.views['new_tag'].value;
                                } catch (ee) {
                                }

                                this.get('content.tags').pushObject(tag);
                                //this.propertyDidChange("tags");
                                this.send('removeLastTag');
                            }
                        }
                    }
                } catch (e) {
                }
            },
            cancelAPI: function() {

                this.send('removeLastTag');
                this.get('content').rollback();

                //Restore from backup object
                this.set('content.tags',this.get('backupTags').slice(0));


                resetValues(this, ['errorMsg', 'successMsg']);
            },
            updateAPI: function() {
                     if (this.get('content.isDirty') || this.get('tagChanged')) {
                         var self = this;
                         this.send('addMoreTags');
                         try {
                                this.set('content.tags', this.get('tags'));
                         } catch (e) {
                         }
                         AppController.setStartLoadingWithDelay();

                         this.get('content').save().then(function(e) {
                             //On Delete, we do not return any content so it will go into Failure... since no object were returned...
                             //OK GREAT
                             //self.set('content', e);
                             try {
                                self.set('backupTags', self.get('content.tags').slice(0));
                             } catch (ee) {
                             }
                             self.set('tagChanged', false);

                             //self.set('tags', e.get('content.tags'));

                             self.get('controllers.project.content').reload().then(function (e) {
                                     Ember.run.next(self, function() {
                                        self.set('successMsg', App.getI18NValue('success_saving_model_to_backend'));
                                        running--;
                                     });
                             });

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
            deleteAPI: function() {
                     var self = this;

                     this.get('content').deleteRecord();

                     AppController.setStartLoadingWithDelay();

                     this.get('content').save().then(function(e) {
                         //On Delete, we do not return any content so it will go into Failure... since no object were returned...

                         //Refresh of the Projects table...
                         self.get('controllers.project.content').reload().then(function (e) {
                                 Ember.run.next(self, function() {
                                   self.transitionToRoute('project.providers');
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
                            self.set('errorMsg', App.getI18NValue('You_still_have_assigned_servers_to_this_cloud_api_key'));
                       }
                       running--;

                    });
            }
        }
});
