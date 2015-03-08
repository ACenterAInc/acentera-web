
App.ProjectIamIndexRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            model.reload();

            if (model.get('tags') == undefined) {
                model.set('tags',[]);
            }
            controller.set('backupTags', model.get('tags').slice(0));
            controller.set('tagChanged', false);


            if (model.get('roles') == undefined) {
                model.set('roles',[]);
            }
            controller.set('backupRoles', model.get('roles').slice(0));
            controller.set('rolesChanged', false);

            controller.set('content', model);
            resetValues(this, ['errorMsg', 'successMsg']);
       },
     /*  model: function(params,k) {
            console.error('models ?');
            console.error(params);
            console.error(k);
       },
       serialize: function(model, params) {
           console.error('serialize');
           console.error(model);
           console.error(params);
           return { user_id: model.get('id') };
       },
       */
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




App.ProjectIamIndexView = App.BaseView.extend({
      didRender: function() {
         $('#new_role').removeClass("error").removeClass("success");
      }
});


App.ProjectIamIndexController = Ember.ObjectController.extend({
        needs: ["project"],
        roleList: Ember.computed.alias('controllers.project.roles').cacheable(),
        breadcrumbTitle: function() {
            return this.get('content').get('name');
        }.observes('content').property('content'),

        notCurrentUser: function() {

            if (this.get('controllers.application.account').get('id') == this.get('content').get('id')) {
                return false;
            }
            return true;
        }.property(),
        backupTags: [],
        backupRoles: [],
        new_tag_value: null,
        new_role_value: null,
        new_tagChange: function() {
            this.set('tagChanged', true);
        }.observes('new_tag_value'),
        new_roleChange: function() {
            this.set('rolesChanged', true);
        }.observes('new_role_value'),
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

        roles: [],
        rolesCheck: function() {
            try {

                this.set('roles',[]);
                if (this.get('content.roles') == undefined) {
                    this.set('content.roles', []);
                }
                for(var i = 0; i < this.get('content.roles').length; i++ ) {
                    this.get('roles').pushObject(this.get('content.roles')[i]);
                }
            } catch (ee) {
            }
        }.observes('content.roles.@each'),

        newRoles: [],
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
                    if (Ember.View.views['new_tag'].value != null && Ember.View.views['new_tag'].value.trim() != '') {
                        if (Ember.View.views['new_tag'].validate()) {
                            self.set('tagChanged', true);
                            var tag = {
                                         name: ''
                            };

                            try {
                                tag['name'] = Ember.View.views['new_tag'].value;
                            } catch (ee) {
                            }

                            //console.error(this.get('content.tags'));
                            this.get('content.tags').pushObject(tag);
                            //this.propertyDidChange("tags");
                            this.send('removeLastTag');
                        }
                    }

                } catch (e) {
                }
            },
            removeLastRole: function() {
                if (Ember.View.views['new_role'] != undefined) {
                    Ember.View.views['new_role'].set('value','');
                    $("#new_role").removeClass("success").removeClass("error");
                }
            },
            removeRole:function(v) {
               var self = this;
               this.get('content.roles').removeObject(v);
               self.set('rolesChanged', true);
            },
            addMoreRoles: function() {
                try {
                    var self = this;
                    if ( (this.get('new_role_value') == '') || (this.get('new_role_value') == undefined) ) {
                        //do nothing..
                    } else {
                        if (Ember.View.views['new_role'].validate()) {
                            self.set('rolesChanged', true);
                            var role = {
                                         name: ''
                            };

                            try {
                                role['name'] = this.get('new_role_value');
                            } catch (ee) {
                            }

                            this.get('content.roles').pushObject(role);
                            //this.propertyDidChange("tags");
                            this.send('removeLastRole');

                            this.get('tagChanged',true);
                        }
                    }

                } catch (e) {
                }
            },
            cancel: function() {

                    this.send('removeLastTag');
                    this.send('removeLastRole');

                    this.get('content').rollback();

                    //Restore from backup object
                    this.set('content.tags',this.get('backupTags').slice(0));

                    if (this.get('notCurrentUser')) {
                        this.set('content.roles',this.get('backupRoles').slice(0));
                    }

                    this.set('new_role_value', '');

                    resetValues(this, ['errorMsg', 'successMsg']);
            },
            update: function() {
                     if (this.get('content.isDirty') || this.get('tagChanged')) {
                         var self = this;
                         this.send('addMoreTags');
                         try {
                                this.set('content.tags', this.get('tags'));
                         } catch (e) {
                         }

                            try {
                                 var formIsValid = true;

                                 if (this.get('roles').length <= 0) {
                                    //we do not have any roles.. we should assigned a role to the invited user..
                                    self.send('addMoreRoles');
                                    if (!(Ember.View.views['new_role'].validate())) {
                                        if (this.get('new_role_value') != null) {

                                        } else {
                                            formIsValid = false
                                       }
                                    }
                                 }
                                 if (formIsValid) {
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

                                         try {
                                             self.set('backupRoles', self.get('content.roles').slice(0));
                                         } catch (ee) {
                                         }
                                         self.set('rolesChanged', false);


                                         //self.set('tags', e.get('content.tags'));
                                         self.set('successMsg', App.getI18NValue('success_saving_model_to_backend'));
                                         running--;
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
                            } catch (z) {
                            }
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
                                   self.transitionToRoute('project.iams');
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
