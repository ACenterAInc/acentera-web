
App.ProjectServerRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            //model.reload();
            console.log(model);
       },
       actions: {
       }
});

App.ProjectServerView = App.BaseView.extend({
      didRender: function() {
         //
      }
});

App.ProjectServerController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        breadcrumbTitle: function() {
            return this.get('content').get('name');
        }.observes('content').property('content'),
        actions: {
        }
});

App.ProjectServerIndexController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        breadcrumbVisible: false,
        alertClass: function() {
            if ( (this.get('content.status') == 'off') || (this.get('content.status') == 'Off') ) {
                return "col-lg-12 alert alert-danger";
            } else if ( (this.get('content.status') == 'archive') || (this.get('content.status') == 'archive') ) {
                return "col-lg-12 alert alert-warning";
            } else if ( (this.get('content.status') == 'active') ) {
                return "col-lg-12 alert alert-success";
            } else if ( (this.get('content.status') == 'new') ) {
                return "col-lg-12 alert alert-info";
            }
        }.property('content.status')
});


App.ProjectServerResizeController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        selectedSize: null,
        breadcrumbTitle: function() {
            return "Resize";
        }.observes('content').property('content'),

        availableSize: function() {
                   this.set('availableSize', this.get('provider').get('region_sizes')[this.get('provider_region')]);
        }.observes('content.provider').property('content.provider'),
        actions: {
            selectSize: function(e) {
                 if (! jq("#size_" + e).hasClass("disable") ) {
                            //this is ugly..
                            for(var i = 50; i < 90;i++) {
                               jq("#size_" + i).removeClass("active");
                            }
                            this.set('selectedSize', e);
                            jq("#size_" + "" + e).addClass("active");
                }

               //we must find the one that is active..
               if (this.get('selectedSize') != null) {
                  this.set('errorMsg', false)
               }
               jq("#resizeBtn").attr('disabled',null);

               //this.updateMonthlyCost();
           },
           resize: function() {
                var self = this;

                if (! ( Ember.View.views['password'].validate() )) {
                    return;
                }

                var d = {
                    password: this.get('password'),
                    size_id: this.get('selectedSize')
                };

                AppController.setStartLoadingWithDelay();

                resetValues(this, ['password']);

                sendPostMessage("project/" + App.Project.params.project_id + "/server/" + this.get('content.id') + "/resize",JSON.stringify(d), false).then(function(data) {
                          try {
                               if (data.success) {
                                     var store = self.get('store');

                                     store.find('task', data.task_id ).then(function(task) {
                                             task.set('complete_redirect_route','project.server.resize');
                                             task.set('redirect_model', self.get('content'));
                                             self.transitionToRoute("project.server.create.status", task);
                                             running--;
                                     });

                                     running--;
                               } else {
                                   self.set("errorMsg", App.getI18NValue("project.error_resize_server"));
                                   running--;
                               }

                           }catch (e) {
                                self.set("errorMsg", App.getI18NValue("project.error_resize_server"));
                                running--;
                           }
                }, function(data) {
                         try {
                         if (data.status == 403) {
                             self.set("errorMsg", App.getI18NValue("invalid_password"));

                             jq('#' + Ember.View.views['password'].elementId).removeClass('success').addClass('error');

                         } else {
                             self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                        }
                        }catch (ee) {
                        }

                        running--;
                });
           }
        }
});



App.ProjectServerRebootController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        selectedSize: null,
        password: null,
        breadcrumbTitle: function() {
            return "Power On/Off";
        }.observes('content').property('content'),
        actions: {
            powerOn: function() {

                    if (! ( Ember.View.views['password'].validate() )) {
                        return;
                    }
                    var d = {
                         password: this.get('password')
                    };

                    AppController.setStartLoadingWithDelay();

                    var self = this;

                    resetValues(this, ['password']);

                    sendPostMessage("project/" + App.Project.params.project_id + "/server/" + this.get('content.id') + "/poweron",JSON.stringify(d), false).then(function(data) {
                          try {
                               if (data.success) {
                                     var store = self.get('store');

                                     store.find('task', data.task_id ).then(function(task) {
                                             task.set('complete_redirect_route','project.server.reboot');
                                             task.set('redirect_model', self.get('content'));
                                             self.transitionToRoute("project.server.create.status", task);
                                             running--;
                                     });

                                     running--;
                               } else {
                                   self.set("errorMsg", App.getI18NValue("project.error_shutdown_server"));
                                   running--;
                               }

                           }catch (e) {
                                self.set("errorMsg", App.getI18NValue("project.error_shutdown_server"));
                                running--;
                           }
                   }, function(data) {
                             try {
                             if (data.status == 403) {
                                 self.set("errorMsg", App.getI18NValue("invalid_password"));

                                 jq('#' + Ember.View.views['password'].elementId).removeClass('success').addClass('error');

                             } else {
                                 self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                            }
                            }catch (ee) {
                            }

                            running--;
                   });

            },
            powerOff: function() {

                    if (! ( Ember.View.views['password'].validate() )) {
                       return;
                    }

                    var d = {
                         password: this.get('password')
                    };

                    AppController.setStartLoadingWithDelay();

                    var self = this;

                    resetValues(this, ['password']);

                    sendPostMessage("project/" + App.Project.params.project_id + "/server/" + this.get('content.id') + "/shutdown",JSON.stringify(d), false).then(function(data) {
                          try {
                               if (data.success) {
                                     var store = self.get('store');

                                     store.find('task', data.task_id ).then(function(task) {
                                             task.set('complete_redirect_route','project.server.reboot');
                                             task.set('redirect_model', self.get('content'));
                                             self.transitionToRoute("project.server.create.status", task);
                                             running--;
                                     });

                                     running--;
                               } else {
                                   self.set("errorMsg", App.getI18NValue("project.error_shutdown_server"));
                                   running--;
                               }

                           }catch (e) {
                                self.set("errorMsg", App.getI18NValue("project.error_shutdown_server"));
                                running--;
                           }
                   }, function(data) {
                          try {
                          if (data.status == 403) {
                              self.set("errorMsg", App.getI18NValue("invalid_password"));

                              jq('#' + Ember.View.views['password'].elementId).removeClass('success').addClass('error');

                          } else {
                              self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                         }
                         }catch (ee) {
                         }

                         running--;
                  });
            },
            reboot: function() {

                        if (! ( Ember.View.views['password'].validate() )) {
                            return;
                        }

                        var d = {
                             password: this.get('password')
                        };

                        AppController.setStartLoadingWithDelay();

                        var self = this;

                        resetValues(this, ['password']);

                        sendPostMessage("project/" + App.Project.params.project_id + "/server/" + this.get('content.id') + "/restart",JSON.stringify(d), false).then(function(data) {
                              try {
                                   if (data.success) {
                                         var store = self.get('store');

                                         store.find('task', data.task_id ).then(function(task) {
                                                 task.set('complete_redirect_route','project.server.reboot');
                                                 task.set('redirect_model', self.get('content'));
                                                 self.transitionToRoute("project.server.create.status", task);
                                                 running--;
                                         });

                                         running--;
                                   } else {
                                       self.set("errorMsg", App.getI18NValue("project.error_shutdown_server"));
                                       running--;
                                   }

                               }catch (e) {
                                    self.set("errorMsg", App.getI18NValue("project.error_shutdown_server"));
                                    running--;
                               }
                       }, function(data) {
                               try {
                               if (data.status == 403) {
                                   self.set("errorMsg", App.getI18NValue("invalid_password"));

                                   jq('#' + Ember.View.views['password'].elementId).removeClass('success').addClass('error');

                               } else {
                                   self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                              }
                              }catch (ee) {
                              }

                              running--;
                       });
                }
        }
});



App.ProjectServerDestroyController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        selectedSize: null,
        password: null,
        breadcrumbTitle: function() {
            return "Destroy";
        }.observes('content').property('content'),
        actions: {
            destroyServer: function() {

                if (! ( Ember.View.views['password'].validate() )) {
                    return;
                }

                 var self = this;
                 var d = {
                     password: this.get('password')
                 };

                AppController.setStartLoadingWithDelay();

                resetValues(this, ['password']);
                var serverId = this.get('content.id');
                sendPostMessage("project/" + App.Project.params.project_id + "/server/" + this.get('content.id') + "/destroy",JSON.stringify(d), false).then(function(data) {
                          try {
                               if (data.success) {
                                     var store = self.get('store');

                                        try {
                                            var tmp = store.all('servers').get('content')
                                            var len = tmp.length;
                                            var theServer = null;
                                            for (var i = 0; i < len && theServer == null; i++) {
                                                if (serverId == tmp[i].get('id')) {
                                                    theServer = tmp[i]
                                                }
                                            }
                                            theServer.deleteRecord();
                                        } catch (eeE) {
                                            console.error(eeE.stack);
                                        }

                                     store.find('task', data.task_id ).then(function(task) {

                                             task.set('complete_redirect_route','project.servers.index');
                                             task.set('redirect_model', self.get('controller.project.content'));
                                             self.transitionToRoute("project.server.create.status", task);

                                             running--;
                                     });

                                     running--;
                               } else {
                                   self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                                   running--;
                               }

                           }catch (e) {
                                self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                                running--;
                           }
                    }, function(data) {
                            try {
                            if (data.status == 403) {
                                self.set("errorMsg", App.getI18NValue("invalid_password"));

                                jq('#' + Ember.View.views['password'].elementId).removeClass('success').addClass('error');

                            } else {
                                self.set("errorMsg", App.getI18NValue("project.error_destroying_server"));
                           }
                           }catch (ee) {
                           }

                           running--;
                    });
            }
        }
});




