
App.MainAccountRoute = Ember.Route.extend({

       setupPrivateController: function(controller, model) {
              //remove potentially added error messages
              controller.set('errorMsg', null);
              controller.set('accountMsg', null);
              controller.set('passworderrorMsg', null);
       },
       actions: {
           willTransition: function(transition) {
               if (this.controller.get('account.isDirty')) {
                    //should show up a message?
                    if (confirm("You have pending changes, click OK if you want to modify/save them.")) {
                        transition.abort();
                    } else {
                        //cancel changes...
                        this.controller.get('account').rollback();
                    }
               } else {

               }
               return true;
           }
       }
});


App.MainAccountController = Ember.ObjectController.extend({
       breadcrumbTitle: "Account",
       languages: [ "en", "fr"],
       account: Ember.computed.alias('controllers.application.account'),
       errorMsg: null,
       accountMsg: null,
       passworderrorMsg: null,
       passwordMsg: false,
       accountUpdated: false,
       accountUpdatedCheck: function() {
            if (this.get('accountUpdated')) {
                var self = this;
                Ember.run.later(this, function() {
                     self.set('accountUpdated',false);
                     self.set('passwordMsg',false);
                     self.set('accountMsg',false);
                },3000);
            }
        }.observes('accountUpdated'),
        actions: {
           cancelUserPassword: function(other) {
              var self = this;

               //other prevent infinite loop
               if (other == undefined) {
                     var firstName = this.get('account').get('firstName');
                     var lastName = this.get('account').get('lastName');
                     var companyName = this.get('account').get('company');
                     var lang = this.get('account').get('lang');
                     var email = this.get('account').get('email');

                    Ember.run.next(self, function() {
                            $("#" + Ember.View.views['account_first_name'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_last_name'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_company'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_lang'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_email'].get('elementId')).removeClass("success").removeClass("error");

                            self.set('accountMsg', false);
                            self.set('errorMsg', null);
                    });

                    this.get('account').rollback();

                    /*
                    self.get('account').set('first_name',firstName);
                    self.get('account').set('last_name',lastName);
                    self.get('account').set('company',companyName);
                    self.get('account').set('email',email);
                    */
               }
               Ember.run.next(self, function() {
                    $("#" + Ember.View.views['currentPassword'].get('elementId')).removeClass("success").removeClass("error");
                    $("#" + Ember.View.views['newPassword'].get('elementId')).removeClass("success").removeClass("error");
                    $("#" + Ember.View.views['newConfirmPassword'].get('elementId')).removeClass("success").removeClass("error");

                    self.set('passwordMsg', false);
                    self.set('passworderrorMsg', null);
               });
           },
           updateUserPassword: function() {

               var self = this;

               var passwordCurrent="";
               var passwordNew=this.get('account.password');
               var passwordConfirm=this.get('account.password_confirm');
               try {

                   Ember.View.views['currentPassword'].validate();
                   Ember.View.views['newPassword'].validate();
                   Ember.View.views['newConfirmPassword'].validate();

                   if (Ember.View.views['currentPassword'].validate() &&
                       Ember.View.views['newPassword'].validate() &&
                       Ember.View.views['newConfirmPassword'].validate() ) {

                          this.get('account').set('action','updatePassword');
                          var firstName = this.get('account').get('firstName');
                          var lastName = this.get('account').get('lastName');
                          var companyName = this.get('account').get('company');
                          var lang = this.get('account').get('lang');
                          var email = this.get('account').get('email');


                          var tmpNewPassword = Ember.View.views['newPassword'].get('value');
                          var tmpNewConfirmPassword = Ember.View.views['newConfirmPassword'].get('value');

                          this.get('account').save().then(function(e) {
                                      self.get('account').set('firstName',firstName);
                                      self.get('account').set('lastName',lastName);
                                      self.get('account').set('company',companyName);
                                      self.get('account').set('lang',lang);
                                      self.get('account').set('email',email);

                                       //this is no more valid..
                                       if ( (e.get('error') == "") || (e.get('error') == null)) {

                                           self.set('accountUpdated', true);
                                           self.set('passworderrorMsg', null);
                                           self.set('passwordMsg', true);
                                           self.set('passworderrorMsg', null);
                                           self.set('account', e);

                                           $("#" + Ember.View.views['currentPassword'].get('elementId')).removeClass("success");
                                           $("#" + Ember.View.views['newPassword'].get('elementId')).removeClass("success");
                                           $("#" + Ember.View.views['newConfirmPassword'].get('elementId')).removeClass("success");
                                       } else {
                                           //We got errors..
                                           self.set('accountUpdated', false);
                                           e.set('password', passwordNew);
                                           Ember.View.views['currentPassword'].validate();
                                           e.set('password_confirm', passwordConfirm);
                                           self.set('passworderrorMsg', e.get('error'));
                                       }
                           }, function(response) {
                                 //if failure
                                 //server responded with {"error":"some custom error message"}
                                 //BUT HOW TO CATCH THIS AND POSSIBLY REMOVE THE MODEL FROM THE STORE
                                 if (! response.responseJSON.success) {
                                    self.set('passworderrorMsg', response.responseJSON.message);
                                 }
                                 self.get('account').rollback()


                                 self.get('account').set('firstName',firstName);
                                 self.get('account').set('lastName',lastName);
                                 self.get('account').set('company',companyName);
                                 self.get('account').set('lang',lang);
                                 self.get('account').set('email',email);

                                 $("#" + Ember.View.views['currentPassword'].get('elementId')).removeClass("success").addClass("error");
                                 self.set('account.password',tmpNewPassword);
                                 self.set('account.password_confirm',tmpNewConfirmPassword);

                           });

                    } else {
                            self.set('accountUpdated', false);
                            self.set('passworderrorMsg', "Various validation has failed.");
                    }
               } catch (e){
                    console.error(e.stack);
                    self.set('accountUpdated', false);
                    self.set('passworderrorMsg', "Try to refresh your browser password.");
               }
           },
           cancelUserUpdateAccount: function(other) {
              var self = this;

             try {
                       if (other == undefined) {
                           Ember.run.next(self, function() {
                                            $("#" + Ember.View.views['currentPassword'].get('elementId')).removeClass("success").removeClass("error");
                                            $("#" + Ember.View.views['newPassword'].get('elementId')).removeClass("success").removeClass("error");
                                            $("#" + Ember.View.views['newConfirmPassword'].get('elementId')).removeClass("success").removeClass("error");

                                            self.set('passwordMsg', false);
                                            self.set('passworderrorMsg', null);
                                       });

                           this.get('account').rollback();
                      }

                      Ember.run.next(self, function() {
                            $("#" + Ember.View.views['account_first_name'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_last_name'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_company'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_lang'].get('elementId')).removeClass("success").removeClass("error");
                            $("#" + Ember.View.views['account_email'].get('elementId')).removeClass("success").removeClass("error");

                            self.set('accountMsg', false);
                            self.set('errorMsg', null);
                      });
              } catch (e) {
                console.error(e.stack);
              }
           },
           updateUserAccount: function() {
               var self = this;

               Ember.View.views['account_first_name'].validate();
               Ember.View.views['account_last_name'].validate();
               Ember.View.views['account_company'].validate();
               Ember.View.views['account_lang'].validate();
               Ember.View.views['account_email'].validate();
               if (Ember.View.views['account_first_name'].validate() &&
                                               Ember.View.views['account_last_name'].validate() &&
                                               Ember.View.views['account_company'].validate() &&
                                               Ember.View.views['account_lang'].validate() &&
                                               Ember.View.views['account_email'].validate()) {
                        try {
                             this.get('account').set('action','updateUserAccount');
                             self.set('accountUpdated', false);
                             self.set('errorMsg', null);
                             var currPw = this.get('account').get('password_current');

                             var pw = this.get('account').get('password');
                             var pwC = this.get('account').get('password_confirm');
                             var email = this.get('account').get('email');

                             this.get('account').save().then(function(e) {

                                //this is no more valid..
                                if ( (e.get('error') == "") || (e.get('error') == null)) {
                                    self.set('accountUpdated', true);
                                    self.set('errorMsg', null);
                                    self.set('accountMsg', true);
                                    self.set('account', e);

                                    $("#" + Ember.View.views['account_first_name'].get('elementId')).removeClass("success").removeClass("error");
                                    $("#" + Ember.View.views['account_last_name'].get('elementId')).removeClass("success").removeClass("error");
                                    $("#" + Ember.View.views['account_company'].get('elementId')).removeClass("success").removeClass("error");
                                    $("#" + Ember.View.views['account_lang'].get('elementId')).removeClass("success").removeClass("error");
                                    $("#" + Ember.View.views['account_email'].get('elementId')).removeClass("success").removeClass("error");

                                } else {
                                    //We got errors..
                                    self.set('accountUpdated', false);

                                    self.set('accountMsg', false);
                                    $("#" + Ember.View.views['account_email'].get('elementId')).addClass("error");
                                    self.get('account').set('email',email);
                                    self.set('errorMsg', e.get('error'));
                                }
                                Ember.run.next(self, function() {
                                    self.get('account').set('password_current',currPw);;
                                    self.get('account').set('password',pw);
                                    self.get('account').set('password_confirm',pwC);
                                });
                             });
                        } catch (ez) {
                           console.log(ez.stack);
                        }
               } else {
                   Ember.run.next(this, function() {
                        self.set('accountUpdated', false);
                        self.set('errorMsg', "Various validation has failed.");
                    });
               }
           }
        }
});

