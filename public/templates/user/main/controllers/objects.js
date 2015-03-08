
                     
//Loading user controller base/user/controllers/i18n ...  

 acenteracontrollers['base_user_controllers_i18n'] = function() { 

 
App.get("i18n").reopen({
    fr : {
            leftmenu: {
                    project_list: "Liste de Projets"
            },
            first_name: "Prenom",
            last_name: "Nom de famille",
            project: {
                    admin_must_enable: "Pour utiliser ce project, vous devez selectionner un services de cloud et lui configurer un set de clef API."
            }
    },
    en : {
            invalid_password: "Password is invalid.",
            leftmenu: {
                project_list: "Project List"
            },
            warning_alert_prefix: "Warning !",
            error_invalid_fields_values: "Various fields contains invalid values.",
            must_select_value: "You must select a value",
            numeric_non_decimal_greater_or_equal_zero: "Must be an integer greater or equal to 0",
            numeric_required: "Must be an integer value",
            cancel_button_text: "Cancel",
            save_button_text: "Save",
            quotas_tags_limit: "Set Quota tags to limit this Cloud API Usage.",
            add_more_tag: "Add another Tag",
            remove_tag: "Remove current Tag",
            twochar_required_and_no_space_input: "Must not contain space, and be at least 2 characters",
            empty_valid_but_no_space_input: "Must not contain space",
            error_alert_prefix: "Error !",
            success_saving_model_to_backend: "The operation have ben completed successfully.",
            error_saving_model_to_backend: "A server error occured while performing the update, our talented monkeys are working on it!",
            error_deleting_model_to_backend: "A server error occured while performing the deletion of object, do you mind refreshing your browser?",
            apisecretkey: "API Secret Key",
            roles: "Role",
            quota : {
                tag: "Tag",
                tag_tooltip: "Tag that will be configured on other Users and API Keys",
                user_tags_limit: "Enter a set of tags to set the user limits",
                quota_limit_text: "The minimal value of all tags will be the selected value for the User or a specific API Key.",
                tag_input_placeholder: "Enter short tag here.",
                compute: "Maximum Servers",
                compute_tooltip: "Number of virutal servers the user can create"
            },
            project : {
                displaytag_input_placeholder: "Tag used to do mapping for user access",
                create_key_tooltip: "How should we display the key name?",
                create_server: "Create a new server",
                add_more_roles: "Add more roles",
                remove_roles: "Remove selected role",
                user_roles: "Assign roles to a user",
                create_group_tooltip: "Create new Group",
                send_invite: "Send Invite",
                invite_user_tooltip: "Invite a team member",
                invite_email_placeholder: "Enter an email address",
                invite_email: "Email",
                invite_email_tooltip: "Enter an Email address to invite to this project",
                email_invite_text: "After invite, you must assign Tags to this user",
                invite_email_placeholder: "Enter an email address",
                create_quota_tooltip: "Create a Quota",
                create_tooltip: "Create a new Project",
                create_first_tooltip: "Create your first Project",
                displayname_input_placeholder: "Enter a descriptive name here",
                admin_must_enable: "In order to enable this project, you must either add a Managed Subscription, or add an API / Key using the Cloud Providers section.",
                create_name_tooltip: "This name will be shown for creation of new servers.",
                create_tag_tooltip: "This tag is used to do mapping with user / groups.",
                admin_project_must_configure: "Your administrator must configure the API Key on this Project.",
                provider_select: 'Select a provider from the list.',
                publickey_input_placeholder: 'Enter the cloud api key',
                privatekey_input_placeholder: 'Enter the cloud secret key'
            },
            digitalocean : {
                clientid: "Cient ID",
                clientid_tooltip: "Client Id retreived from the cloud provider"
            }
    }
}); }


//End of loading controller base/user/controllers/i18n 

//Loading user controller base/user/controllers/routes_acentera ...  

 acenteracontrollers['base_user_controllers_routes_acentera'] = function() { 

 

/* Routes
    ********************/


App.Router.map(function() {
      //Catch all Route
      this.route( "blank", { path: "/blank"});
      this.route( "404", { path: "*path"});


      //entry point everything should be under index..
      this.resource( "user",  { path: "/" }, function() {
              this.resource("main",  { path: "/" }, function() {
                  this.route("index",  { path: "/" });
                  this.route("account",  { path: "/account" });

              });

              this.resource( 'project', { path: '/project/:project_id' }, function() {
                   this.route('index', { path: '/' });
                   this.route('account', { path: '/account' });



                   this.resource('project.servers', { prefix: "project", path: '/servers' }, function() {
                       this.route('index', { path: '/' });



                       this.resource('project.server', { prefix: 'project', path: '/:server_id' }, function() {
                            //this.resource('project.server.details', { prefix: 'project', path: '/' }, function() {
                                this.route("index", { path: '/'});
                                this.route("resize", { path: '/resize'});
                                this.route("reboot", { path: '/reboot'});
                                this.route("destroy", { path: '/destroy'});
                            //});
                      });

                   });


                   this.resource('project.server.create', { path: '/server/create' }, function() {
                                  this.route('index', { path: '/' });
                   });
                   this.resource('project.server.create.status', { path: '/server/create/status/:task_id' }, function() {
                        this.route('index', { path: '/' });
                   });


                   this.resource('project.providers', { prefix: "project", path: '/providers' }, function() {
                        this.route('index', { path: '/' });
                         this.resource('project.provider', { prefix: 'project', path: '/:provider_id' }, function() {
                              this.route("index", { path: '/'});
                         });
                   });

                   this.resource('project.sshkeys', { prefix: "project", path: '/sshkeys' }, function() {
                       this.route('index', { path: '/' });
                        this.resource('project.sshkey', { prefix: 'project', path: '/:sshkey_id' }, function() {
                             this.route("index", { path: '/'});
                        });
                   });


                   this.resource('project.quotas', { prefix: "project", path: '/quotas' }, function() {
                       this.route('index', { path: '/' });
                       this.resource('project.quota', { prefix: 'project', path: '/:quota_id' }, function() {
                             this.route("index", { path: '/'});
                       });
                   });

                   this.resource('project.iams', { prefix: "project", path: '/iam' }, function() {
                       this.route('index', { path: '/' });

                       this.resource('project.iam', { prefix: 'project', path: '/:user_id' }, function() {
                              this.route("index", { path: '/'});
                       });

                   });



                   this.resource('project.databases', { prefix: "project", path: '/databases' }, function() {
                        this.route('index', { path: '/' });
                        this.resource('project.database.create', { prefix: "project", path: '/create' }, function() {
                            this.route('index', { path: '/' });
                            this.route('choose', { path: '/choose' });
                            this.route('config', { path: '/configuration' });
                            this.route('final', { path: '/confirm' });
                            this.route('createstatus', { path: '/createstatus' });
                        });
                        /*this.resource('project.database', { prefix: "project", path: '/:database_id' }, function() {
                                                          this.route('index', { path: '/' });
                                                          this.route('choose', { path: '/choose' });
                                                          this.route('config', { path: '/configuration' });
                                                          this.route('final', { path: '/confirm' });
                                                          this.route('createstatus', { path: '/createstatus' });
                        });*/
                   });

                   /*this.resource('project.database', { prefix: "project", path: '/database' }, function() {
                       this.route('create', { path: '/create' });
                   });*/




              });





      });


});




/* Routes You can extend...
    ********************/



App.Router.map(function() {

      //entry point everything should be under index..

  this.resource( "user",  { path: "/" }, function() {
      this.resource("main",  { path: "/" }, function() {
                    this.route("index",  { path: "/" });
                    this.route("account",  { path: "/account" });

      });

      this.resource( 'project', { path: '/project/:project_id' }, function() {

          this.route('custom', { path: '/custom' });
    });
  });
});




 }


//End of loading controller base/user/controllers/routes_acentera 

//Loading user controller base/user/controllers/components/appdb_finalcreate ...  

 acenteracontrollers['base_user_controllers_components_appdb_finalcreate'] = function() { 

 

App.AppDbFinalCreateView = Ember.View.extend({
  templateName: 'components/appdb_finalcreate'
});
Ember.Handlebars.helper('appdb_finalcreate-view', App.AppDbFinalCreateView );
 }


//End of loading controller base/user/controllers/components/appdb_finalcreate 

//Loading user controller base/user/controllers/components/image_selection ...  

 acenteracontrollers['base_user_controllers_components_image_selection'] = function() { 

 App.ImageSelectionView = Ember.View.extend({
    templateName: 'components/image_selection',
    availableImages: null,
    distros: null,
    selectedImage: null
});
Ember.Handlebars.helper('imageselection-view', App.ImageSelectionView);
 }


//End of loading controller base/user/controllers/components/image_selection 

//Loading user controller base/user/controllers/components/no_databases ...  

 acenteracontrollers['base_user_controllers_components_no_databases'] = function() { 

 

App.NoDatabaseView = Ember.View.extend({
  templateName: 'components/no_databases'
});
Ember.Handlebars.helper('nodatabases-view', App.NoDatabaseView );
 }


//End of loading controller base/user/controllers/components/no_databases 

//Loading user controller base/user/controllers/components/passwordconfirm ...  

 acenteracontrollers['base_user_controllers_components_passwordconfirm'] = function() { 

 App.PasswordConfirmView = Ember.View.extend({
    templateName: 'components/password_confirm'
});
Ember.Handlebars.helper('passwordconfirm-view', App.PasswordConfirmView);
 }


//End of loading controller base/user/controllers/components/passwordconfirm 

//Loading user controller base/user/controllers/components/provider_selection ...  

 acenteracontrollers['base_user_controllers_components_provider_selection'] = function() { 

 App.ProviderSelectionView = Ember.View.extend({
    templateName: 'components/provider_selection'
});
Ember.Handlebars.helper('providerselection-view', App.ProviderSelectionView);
 }


//End of loading controller base/user/controllers/components/provider_selection 

//Loading user controller base/user/controllers/components/region_selection ...  

 acenteracontrollers['base_user_controllers_components_region_selection'] = function() { 

 App.RegionSelectionView = Ember.View.extend({
    templateName: 'components/region_selection',
    regions: [ 'nyc', 'sfo' , 'ams' ],
    slug: null,
    regionsAvailable: null
});
Ember.Handlebars.helper('regionselection-view', App.RegionSelectionView);
 }


//End of loading controller base/user/controllers/components/region_selection 

//Loading user controller base/user/controllers/components/region_size ...  

 acenteracontrollers['base_user_controllers_components_region_size'] = function() { 

 App.ResizeRegionAvailableSize = Ember.View.extend({
    attributeBindings: ['style'],
    style: "margin-left:15px;width: 170px;height: 170px;float:left;",
    content: null,
    selected : null,
    currsize:  null,
    tooltipTitle: '',
    availableSizes: [  ],
    toggle: '',
    templateName: 'components/region_size',
    customloaded: false,
    type: 'db',

    monthlyPricing: function() {


        var dbManagePricing = false;

        if (this.get('type') == 'db') {
            dbManagePricing = true;
        } else {
            dbManagePricing = false;
        }


        dbManagePricing = true;
        var clusterSize = this.get('content');

        if ( (this.get('type') == 'do') && ( this.get('controller.semimanaged') == undefined  ) ) {

                        if (clusterSize == 66) {
                            return 5;
                        } else if (clusterSize == 63) {
                            return 10;
                        } else if (clusterSize == 62) {
                            return 20;
                        } else if (clusterSize == 64) {
                            return 40;
                        } else if (clusterSize == 65) {
                            return 80;
                        } else if (clusterSize == 61) {
                            return 160;
                        }

                        return clusterSize;

        } else {
            if (dbManagePricing) {

                if (clusterSize == 66) {
                    return 15;
                } else if (clusterSize == 63) {
                    return 25;
                } else if (clusterSize == 62) {
                    return 35;
                } else if (clusterSize == 64) {
                    return 65;
                } else if (clusterSize == 65) {
                    return 110;
                } else if (clusterSize == 61) {
                    return 200;
                }

                return clusterSize;
            } else {

                    if (clusterSize == 66) {
                        return 6;
                    } else if (clusterSize == 63) {
                        return 12;
                    } else if (clusterSize == 62) {
                        return 25;
                    } else if (clusterSize == 64) {
                        return 45;
                    } else if (clusterSize == 65) {
                        return 90;
                    } else if (clusterSize == 61) {
                        return 180;
                    }
                return 9;
            }
        }


    }.property(),

    hourlyPricing: function() {
            var dbManagePricing = false;

            if (this.get('type') == 'db') {
                dbManagePricing = true;
            } else {
                dbManagePricing = false;
            }

            var clusterSize = this.get('content');
            dbManagePricing = true;

            if ( (this.get('type') == 'do') && ( this.get('controller.semimanaged') == undefined  ) ) {
                        if (clusterSize == 66) {
                            return "0.007";
                        } else if (clusterSize == 63) {
                            return "0.015";
                        } else if (clusterSize == 62) {
                            return "0.030";
                        } else if (clusterSize == 64) {
                            return "0.060";
                        } else if (clusterSize == 65) {
                            return "0.119";
                        } else if (clusterSize == 61) {
                            return "0.238";
                        }
            } else {
                if (dbManagePricing) {

                    if (clusterSize == 66) {
                        return "0.020";
                    } else if (clusterSize == 63) {
                        return "0.033";
                    } else if (clusterSize == 62) {
                        return "0.046";
                    } else if (clusterSize == 64) {
                        return "0.087";
                    } else if (clusterSize == 65) {
                        return "0.146";
                    } else if (clusterSize == 61) {
                        return "0.266";
                    }

                    return clusterSize;
                } else {

                        if (clusterSize == 66) {
                            return "0.008";
                        } else if (clusterSize == 63) {
                            return "0.016";
                        } else if (clusterSize == 62) {
                            return "0.033";
                        } else if (clusterSize == 64) {
                            return "0.060";
                        } else if (clusterSize == 65) {
                            return "0.120";
                        } else if (clusterSize == 61) {
                            return "0.240";
                        }
                }
           }
        }.property(),
    isNotCurrentSize: function() {
        if (parseFloat(this.get('currsize')) == parseFloat(this.get('content'))) {
            return false
        } else {
            return true;
        }
    }.observes('selected').property(),
    isInREgion: function() {
            try {

                /*if (this.get('selected') == undefined) {
                    return false;
                }*/


                var avail = this.get('availableSizes');
                if (avail != undefined) {
                    for (var i = 0; i < avail.length;i++) {
                        if (parseFloat(avail[i]) == parseFloat(this.get('content'))) {
                            $("#size_" + this.get('content')).tooltip("destroy");
                            $("#size_" + this.get('content')).removeClass("disable");

                            if (this.get('selsize') == this.get('content')) {
                                this.set('selsize',null);
                                //need to send to controller but its ok..
                                //the selsize is a binded object
                                //this.send('unselectSize');
                            }

                            return true;
                        }
                    }
                }
            } catch (e) {
            }

            try {
                $("#size_" + this.get('content')).removeClass("active");
                $("#size_" + this.get('content')).addClass("disable");
                this.set('toggle', 'tooltip');
            } catch (ee) {
            }
            return false;
    }.observes('availableSizes','selected','currsize','content').property('selected','currsize','content','availableSizes'),
    didInsertElement: function() {
    }
});
Ember.Handlebars.helper('doregionsize-view', App.ResizeRegionAvailableSize);
 }


//End of loading controller base/user/controllers/components/region_size 

//Loading user controller base/user/controllers/components/region_sizeselection ...  

 acenteracontrollers['base_user_controllers_components_region_sizeselection'] = function() { 

 App.RegionSizeSelectionView = Ember.View.extend({
    templateName: 'components/regionsize_selection'
});
Ember.Handlebars.helper('regionsizeselection-view', App.RegionSizeSelectionView);
 }


//End of loading controller base/user/controllers/components/region_sizeselection 

//Loading user controller base/user/controllers/components/regiontextbox ...  

 acenteracontrollers['base_user_controllers_components_regiontextbox'] = function() { 

 App.RegionTextboxView = Ember.View.extend({
    templateName: 'components/regiontextbox',
    slug: null,
    region_name: null
});
Ember.Handlebars.helper('regiontextbox-view', App.RegionTextboxView);
 }


//End of loading controller base/user/controllers/components/regiontextbox 

//Loading user controller base/user/controllers/components/sizetextbox ...  

 acenteracontrollers['base_user_controllers_components_sizetextbox'] = function() { 

 App.SizeTextboxView = Ember.View.extend({
    templateName: 'components/sizetextbox',
    size: null,
    selsize: null
});
Ember.Handlebars.helper('sizetextbox-view', App.SizeTextboxView);
 }


//End of loading controller base/user/controllers/components/sizetextbox 

//Loading user controller base/user/controllers/components/sshkey_selection ...  

 acenteracontrollers['base_user_controllers_components_sshkey_selection'] = function() { 

 App.SshKeySelectionView = Ember.View.extend({
    templateName: 'components/sshkey_selection',
    availableKeys: null,
    selectedKey: null
});
Ember.Handlebars.helper('sshkeyselection-view', App.SshKeySelectionView );
 }


//End of loading controller base/user/controllers/components/sshkey_selection 

//Loading user controller base/user/controllers/components/task_status ...  

 acenteracontrollers['base_user_controllers_components_task_status'] = function() { 

 

App.TaskStatusView = Ember.View.extend({
  templateName: 'components/task_status',
  task_id: null,
  ctrl: null,
  ready_counter: 0,
  complete_redirect_route:null,
  error_redirect_route: null,
  redirect_model: null,
  redirect_url: null,
  redirect_model_id: null,
  redirect_model_type: null,
  didInsertElement: function() {
    try {
        var ctrl = this.get('controller');
        if (ctrl == null) {
            try {
                ctrl = this.get('_parentView').get('controller');
            } catch (e) {
            }
        }

        this.set('ctrl', ctrl);

        /*
        try {ctrl.set('complete_redirect_route', ctrl.get('content').get('complete_redirect_route'));} catch(w) {}
        try {ctrl.set('error_redirect_route', ctrl.get('content').get('error_redirect_route'));} catch(w) {}
        */

        try {this.set('complete_redirect_route', ctrl.get('content').get('complete_redirect_route'));} catch(w) {}
        try {this.set('error_redirect_route', ctrl.get('content').get('error_redirect_route'));} catch(w) {}
        try {this.set('redirect_model_type', ctrl.get('content').get('redirect_model_type'));} catch(w) {}
        try {this.set('redirect_model_id', ctrl.get('content').get('redirect_model_id'));} catch(w) {}
        try {this.set('redirect_model', ctrl.get('content').get('redirect_model'));} catch(w) {}
        try {this.set('redirect_url', ctrl.get('content').get('redirect_url'));} catch(w) {}

        try {ctrl.get('content').rollback();} catch (w) {}

        var self = this;
        var reloadByPolling = true;
        /*if (ctrl.get('content').get('refreshtype') == 'async') {
            reloadByPolling=false;
        }*/

        this.set('ready_counter', 0);
        try {
            var prct = this.get('ctrl').get('content.percentage');
            if (prct >= this.get('ctrl').get('current_percentage')) {
                this.get('ctrl').set('current_percentage', prct);
            } else {
                this.get('ctrl').set('current_percentage', 2);
            }
        } catch( ee) {
        }

        self.reloadTaskStatus(false);
     } catch (z) {
        console.error(z.stack);
     }
  },
  isCompleted: function() {
    if (this.isDestroyed || this.isDestroying) {
         return false;
    }
    var self = this;
    try {
        if (this.get('ctrl').get('content').get('percentage') == 100) {

            if (this.get('ready_counter') == undefined) {
                this.set('ready_counter', 0);
            }

            if (this.get('ready_counter') >= 3) {
                try {this.get('ctrl').send('taskCompleted');} catch (ee) {}

                if (this.get('complete_redirect_route') != undefined) {

                    var m = this.get('redirect_model');
                    if ( m != undefined ) {
                        m.reload();
                    } else {
                        m = this.get('ctrl').get('controllers.project.content');
                        m.reload();
                    }

                    console.error("TEST A ");
                    console.error("TEST A " + this.get('redirect_url')) ;
                    //console.error(readCookie("prev_task_url"));
//todo.. lasturl
                    this.get('ctrl').transitionToRoute(this.get('complete_redirect_route'), m);
                } else {
                    //use prev url
                    console.error("TEST A1 " + this.get('redirect_url')) ;

                    window.location.href = "#" + this.get('redirect_url');
                }
                return true;
            } else {
                this.set('ready_counter', (this.get('ready_counter') + 1) );
            }
        }

        if (this.get('ctrl').get('content').get('action_status') == 'error') {
            try {this.get('ctrl').send('taskError');} catch (ee) {}

            if (this.get('error_redirect_route') != undefined) {


                var m = this.get('redirect_model');
                if ( m != undefined ) {
                    m.reload();
                } else {
                    m = this.get('ctrl').get('controllers.project.content');
                    m.reload();
                }

                this.get('ctrl').set('showErrorGoBackButton', true);
                this.get('ctrl').set('error_route', this.get('error_redirect_route'));





                //this.get('ctrl').set('error_model', m);






                //this.get('ctrl').transitionToRoute(this.get('error_redirect_route'), m);
            } else {
                if (this.get('complete_redirect_route') != undefined) {

                    var m = this.get('redirect_model');
                    if ( m != undefined ) {
                        m.reload();
                    } else {
                        m = this.get('ctrl').get('controllers.project.content');
                        m.reload();
                    }

                    this.get('ctrl').transitionToRoute(this.get('complete_redirect_route'), m);
                }

            }

            return true;
        }
    } catch (err) {
        console.error(err.stack);
    }

    return false;
  },
  reloadTaskStatus : function(reload) {
     var self = this;

     if (this.isDestroyed || this.isDestroying) {
              return false;
     }

     try {

        if (this.isCompleted()) {
            return true;
        }

        if (reload) {
            this.get('ctrl').get('content').reload();

            var prct = this.get('ctrl').get('content.percentage');
            if (prct >= 80 ) {
                if (this.get('ready_counter') >= 3 ) {
                    if (prct >= this.get('ctrl').get('current_percentage')) {
                        this.get('ctrl').set('current_percentage', prct);
                    }
                }
            } else {
                if (prct >= this.get('ctrl').get('current_percentage')) {
                    this.get('ctrl').set('current_percentage', prct);
                }
            }

            try {this.get('ctrl').send('taskReloaded');} catch (ee) {}
        }

        Ember.run.later((function() {
            if (!(self.isCompleted())) {

                Ember.run.later((function() {


                   //do something in here that will run in 5 seconds
                   self.reloadTaskStatus(true);


                }), 2000);

            }
        }), 500);

    } catch (Ee) {
        console.error(Ee.stack);
    }
  },
  actions: {
    taskErrorGoBackClick: function() {
        //alert('aa');
    },
    asyncResponse: function(e,custom_data) {
       try {

           try {

               this.get('content').set('percentage', theVal);
               var thePercent = e.msg.data.percent;

               var curPercent = this.get('ctrl').get('content').get('percentage');
               if (curPercent > thePercent) {
                   thePercent = curPercent;
               }

               if ((thePercent >= 95) && (curPercent <=80) ) { thePercent = curPercent; }


               this.get('ctrl').get('content').set('percentage', thePercent);
           } catch (ex) {
                console.error(ex.stack);
           }

           if (e.msg.status == 'failed') {
                this.get('ctrl').get('content').set('action_status', "error");
                //TODO: this.isCompleted();
           } else {

                if (e.msg.state == "ALL_TASKS_COMPLETED") {
                        alert('COMPLETED... todo: load model.. adn redirect ?');
                        this.get('ctrl').get('content').set('percentage', 100);

                        //TODO call this.isCompleted();

                        /*AppController.send('loadClusterInfoNoRedirAll', function() {
                               console.error('all tasks where completed.... lets redirect...');
                               AppController.set('last_task_id', null);
                               AppController.transitionToRoute("databaseconfig.index");
                        });
                        */
                }
           }

       } catch (err) {
           console.error(err.stack);
       }
    }
  }
});
Ember.Handlebars.helper('taskstatus-view', App.TaskStatusView );
 }


//End of loading controller base/user/controllers/components/task_status 

//Loading user controller base/user/controllers/components/table/iamroletable ...  

 acenteracontrollers['base_user_controllers_components_table_iamroletable'] = function() { 

 
App.IAMRoleTable = App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('name')
      };
    },
    getTableDefinition: function() {
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject._data.project_id + "/iam/role/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('iamrole-table', App.IAMRoleTable);


 }


//End of loading controller base/user/controllers/components/table/iamroletable 

//Loading user controller base/user/controllers/components/table/iamusertable ...  

 acenteracontrollers['base_user_controllers_components_table_iamusertable'] = function() { 

 
App.IAMUserTable = App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('type') == "invited" ? "Pending invitation" : obj.get('email'),
            email : obj.get('email')
      };
    },
    getTableDefinition: function() {
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    { "mData": "email" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject._data.project_id + "/iam/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('iamuser-table', App.IAMUserTable);


 }


//End of loading controller base/user/controllers/components/table/iamusertable 

//Loading user controller base/user/controllers/components/table/keytable ...  

 acenteracontrollers['base_user_controllers_components_table_keytable'] = function() { 

 
App.KeyTable = App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('name')
      };
    },
    getTableDefinition: function() {
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + App.Project.params.project_id + "/sshkeys/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('key-table', App.KeyTable);


 }


//End of loading controller base/user/controllers/components/table/keytable 

//Loading user controller base/user/controllers/components/table/projectlist ...  

 acenteracontrollers['base_user_controllers_components_table_projectlist'] = function() { 

 
App.ProjectListTable = App.SimpleTable.extend({
    type : null,
    maxros: 20,
    clickRoute: null,
    clickOn: function (e ) {
        /*if (this.get('clickRoute') != undefined) {
                AppController.transitionToRoute(this.get('clickRoute'), e);
        }*/
    },

    getRowObject: function(obj) {
      if ( this.get('type') == 'pendingInvite') {
        if (obj.get('type') == 'invited') {
              return {
                    id : obj.get('id'),
                    name : obj.get('name')
              };
        }
      } else {

             if (obj.get('type') != 'invited') {
                    return {
                          id : obj.get('id'),
                          name : obj.get('name')
                    };
              }
      }
    },
    getTableDefinition: function() {
            var self = this;
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('projectlist-table', App.ProjectListTable);


 }


//End of loading controller base/user/controllers/components/table/projectlist 

//Loading user controller base/user/controllers/components/table/providertable ...  

 acenteracontrollers['base_user_controllers_components_table_providertable'] = function() { 

 
App.ProviderTable = App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('name'),
            type: obj.get('type'),
            apikey: obj.get('apikey')
      };
    },
    getTableDefinition: function() {
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    { "mData": "apikey" },
                    { "mData": "type" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject._data.project_id + "/providers/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('provider-table', App.ProviderTable);


 }


//End of loading controller base/user/controllers/components/table/providertable 

//Loading user controller base/user/controllers/components/table/quotatable ...  

 acenteracontrollers['base_user_controllers_components_table_quotatable'] = function() { 

 
App.QuotaTable = App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('name'),
            compute : obj.get('compute')
      };
    },
    getTableDefinition: function() {
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    { "mData": "compute" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject._data.project_id + "/quotas/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('quota-table', App.QuotaTable);


 }


//End of loading controller base/user/controllers/components/table/quotatable 

//Loading user controller base/user/controllers/components/table/serverstable ...  

 acenteracontrollers['base_user_controllers_components_table_serverstable'] = function() { 

 
App.ServersTable= App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            acenteraid: obj.get('acenteraid'),
            image_name : obj.get('image_name'),
            name : obj.get('name'),
            ipAddress : obj.get('ipAddress'),
            status : obj.get('status'),
            size : obj.get('size').name,
            disk : obj.get('size').disk + " GB",
            region : obj.get('region_name')
      };
    },
    getTableDefinition: function() {
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "image_name" },
                    { "mData": "name" },
                    { "mData": "ipAddress" },
                    { "mData": "status" },
                    { "mData": "size" },
                    { "mData": "disk" },
                    { "mData": "region" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + App.Project.params.project_id + "/servers/" + oObj.aData.emberobject.get('acenteraid') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('servers-table', App.ServersTable);



 }


//End of loading controller base/user/controllers/components/table/serverstable 

//Loading user controller base/user/controllers/main/account ...  

 acenteracontrollers['base_user_controllers_main_account'] = function() { 

 
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

 }


//End of loading controller base/user/controllers/main/account 

//Loading user controller base/user/controllers/main/index ...  

 acenteracontrollers['base_user_controllers_main_index'] = function() { 

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
 }


//End of loading controller base/user/controllers/main/index 

//Loading user controller base/user/controllers/project/account ...  

 acenteracontrollers['base_user_controllers_project_account'] = function() { 

 

App.ProjectAccountRoute = App.MainAccountRoute.extend({
});


App.ProjectAccountController = App.MainAccountController.extend({
}); }


//End of loading controller base/user/controllers/project/account 

//Loading user controller base/user/controllers/project/iam ...  

 acenteracontrollers['base_user_controllers_project_iam'] = function() { 

 

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
 }


//End of loading controller base/user/controllers/project/iam 

//Loading user controller base/user/controllers/project/index ...  

 acenteracontrollers['base_user_controllers_project_index'] = function() { 

 

App.ProjectRoute = Ember.Route.extend({
       leftmenuTemplate: 'project/leftmenu',
       topbarTemplate: 'dual',
       setupPrivateController: function(controller, model) {
            //Small hack... because of how we use ember..
            //Set project_id parameter for future API Call's

            App.Provider.params = { project_id: model.get('id') };
            App.User.params = { project_id: model.get('id') };
            App.Quota.params = { project_id: model.get('id') };
            App.Role.params = { project_id: model.get('id') };
            App.Project.params = { project_id: model.get('id') };

            controller.set('controllers.application.selectedProject', model);
            controller.set('project', model);
            this.set('leftmenuModel', model);
            running--;
       },
       actions: {
                changeContext: function(e, v) {
                       var self = this;
                       var latestPath = App.Router.router.currentHandlerInfos;
                       latestPath = latestPath[latestPath.length-1].name;
                       try {
                            var store = this.get('controller').get('store');

                            store.find('project', e.get('id')).then(function(project) {
                                //force project reloading to get new users and other security infos
                                project.reload();
                                self.get('controller').transitionToRoute("project.index", project);
                            });

                       } catch (z) {
                       }

                  }
       },
       model: function(params) {
            App.Provider.params = params;//{project_id: param.project_id)};
            App.User.params = params;//{project_id: param.project_id)};
            App.Quota.params = params;//{project_id: param.project_id)};
            App.Role.params = params;//{project_id: param.project_id)};
            App.Project.params = params;//{project_id: param.project_id)};

            this.acenteraModel(params);
            return this.get('store').find('project', params.project_id);
            //alert(self.get('currentModel').project_id);
       }
});


App.ProjectController = Ember.ObjectController.extend({
    roles: [ '', 'ProjectAdmin', 'ReadOnly', 'CanEdit' ],
    breadcrumbVisible: false,
    project: null
});


App.ProjectIndexRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            /*console.error('tt33');
            this
            console.error(model);*/
       }
        /*model: function(param) {
              var self = this;
              //alert(param.project_id);
              var project = this.get('store').find('Project', App.Project.params.project_id);
              return project;
       }*/

});


try {
App.ProjectIndexController = Ember.ObjectController.extend({
    needs : [ "application" ],
    breadcrumbUseParentModel: true,
    breadcrumbTitle: "Project Overview",
    breadcrumbVisible: true,
    project: null,
    actions: {
        accept: function() {
            var self = this;

            var d =  {
                token : this.get('invitetoken'),
                action: 'accept'
            }

            AppController.setStartLoadingWithDelay();
            running++;
            sendPostMessage("project/" + App.Project.params.project_id + "/invite/"+this.get('invitetoken'),JSON.stringify(d), true).then(function(data) {
                 if (data) {
                    self.get('content').reload();

                    try {
                         var proj = self.get('store').all('projects').get('content');
                         var len = proj.length;
                         var prj = null
                         for (var i = 0; i < len && prj == null; i++) {
                            if (proj[i].get('id') == App.Project.params.project_id) {
                                prj = i;
                            }
                         }
                         if (proj[prj] != undefined) {
                            proj[prj].reload();
                         }
                     } catch (zz) {
                     }
                 }
                 running--;
            }, function(z) {running--;});
        },
        reject: function() {
            var self = this;

            var d = {
                token : this.get('invitetoken'),
                action: 'reject'
            }

            AppController.setStartLoadingWithDelay();
            running++;

            sendPostMessage("project/" + App.Project.params.project_id + "/invite/"+this.get('invitetoken'),JSON.stringify(d), true).then(function(data) {

                try {
                     var proj = self.get('store').all('projects').get('content')
                     var len = proj.length;
                     var prj = null
                     for (var i = 0; i < len && prj == null; i++) {
                        if (proj[i].get('id') == App.Project.params.project_id) {
                            prj = i;
                        }
                     }
                     if (proj[prj] != undefined) {
                        proj[prj].reload();
                     }
                 } catch (zz) {
                 }

                 AppController.transitionToRoute('main');
                 running--;
            }, function(z) {


                             try {
                                 var proj = self.get('store').all('projects').get('content');
                                 var len = proj.length;
                                 var prj = null
                                 for (var i = 0; i < len && prj == null; i++) {
                                    if (proj[i].get('id') == App.Project.params.project_id) {
                                        prj = i;
                                    }
                                 }
                                 if (proj[prj] != undefined) {
                                    proj[prj].reload();
                                 }
                                 //proj.removeObject(proj[prj]);
                             } catch (zz) {
                             }

                 AppController.transitionToRoute('main');

                 running--;
            });
        }
    }
});

} catch (ze) {

}
 }


//End of loading controller base/user/controllers/project/index 

//Loading user controller base/user/controllers/project/providers ...  

 acenteracontrollers['base_user_controllers_project_providers'] = function() { 

 

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
 }


//End of loading controller base/user/controllers/project/providers 

//Loading user controller base/user/controllers/project/quotas ...  

 acenteracontrollers['base_user_controllers_project_quotas'] = function() { 

 

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
 }


//End of loading controller base/user/controllers/project/quotas 

//Loading user controller base/user/controllers/project/servers ...  

 acenteracontrollers['base_user_controllers_project_servers'] = function() { 

 

App.ProjectServersRoute = Ember.Route.extend({
    setupPrivateController: function(controller, model) {
            controller.set('servers', model);

    },
    model: function(params) {
        this.acenteraModel(params);
        var store = this.get('store');
        var servers = store.find("servers");
        return servers;
    }
});

App.ProjectServersView = App.BaseView.extend({
      didRender: function() {
         //$("#addCloud").click();
      }
});
App.ProjectServersController = Ember.ObjectController.extend({
    needs: [ "project" ],
    breadcrumbTitle: "Servers",
    showTable: true,
    servers: [],
    actions: {
    }
}); }


//End of loading controller base/user/controllers/project/servers 

//Loading user controller base/user/controllers/project/sshkeys ...  

 acenteracontrollers['base_user_controllers_project_sshkeys'] = function() { 

 

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
 }


//End of loading controller base/user/controllers/project/sshkeys 

//Loading user controller base/user/controllers/project/iam/iam ...  

 acenteracontrollers['base_user_controllers_project_iam_iam'] = function() { 

 
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
 }


//End of loading controller base/user/controllers/project/iam/iam 

//Loading user controller base/user/controllers/project/provider/provider ...  

 acenteracontrollers['base_user_controllers_project_provider_provider'] = function() { 

 
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
 }


//End of loading controller base/user/controllers/project/provider/provider 

//Loading user controller base/user/controllers/project/quota/quota ...  

 acenteracontrollers['base_user_controllers_project_quota_quota'] = function() { 

 

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
 }


//End of loading controller base/user/controllers/project/quota/quota 

//Loading user controller base/user/controllers/project/sever/create ...  

 acenteracontrollers['base_user_controllers_project_sever_create'] = function() { 

 
App.ProjectServerCreateRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            //model.reload();
       },
       actions: {
       }
});

App.ProjectServerCreateView = App.BaseView.extend({
      didRender: function() {
         //
      }
});

App.ProjectServerCreateController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        providers: Ember.computed.alias("controllers.project.content.providers"),
        selected_provider: null,
        shortHostName: null,
        selected_region: null,
        selected_size: null,
        regionsAvailable: null,
        regionsSizeAvailable:null,
        availableImages: null,
        selected_image: null,
        selectedDistro: null,
        selected_key: null,
        availableKeys: Ember.computed.alias("controllers.project.content.sshkeys"),
        distros: null,
        slug: null,
        selected_providerChange: function() {
            this.set('regionsAvailable', this.get('selected_provider').get('regions').get('content'));

            try {
                //Unload all Distro's find of Images resturns a single hash of distributions...

                //Get latest Selected Distribution
                var self = this;
                var store1 = this.get("store");

                var distros = self.get('distros');

                if  ( distros != undefined && distros.length != undefined) {
                    var selectedDistro = null;
                    var len = distros.length;
                    for (var i = 0; ( i < len && selectedDistro == null); i++) {
                        if (distros[i].selected) {
                            selectedDistro = distros[i];
                        }
                    }
                }

               try {
                   store1.unloadAll('distro');

                } catch (ee) {
                }
                self.set('distros', null);
                App.Image.params = { provider_id: this.get('selected_provider').get('id')}

                var images = store1.find('image').then(function(e) {
                        //image JSON Retreive also a unique set of distros

                        self.set('availableImages', e);

                        var distros = store1.typeMapFor(App.Distro).records;
                        self.set('distros', distros);

                        if (selectedDistro != undefined) {
                            if  ( distros.length != undefined) {
                                var len = distros.length;
                                for (var i = 0; ( i < len && selectedDistro != null); i++) {
                                    if (distros[i].name == selectedDistro.name) {
                                        distros[i].selected = true;
                                        selectedDistro = null;
                                    } else {
                                        distros[i].selected = false;
                                    }
                                }
                            }
                        }
                });



            } catch (e) {
            }

        }.observes('selected_provider'),
        breadcrumbTitle: "Create Server",
        actions: {
            selectDistro: function(d) {
                this.set('errorMsg', null);
                try {
                    var distros = this.get('distros');
                    if  ( distros != undefined && distros.length != undefined) {
                        var selectedDistro = null;
                        var len = distros.length;
                        for (var i = 0; ( i < len && selectedDistro == null); i++) {
                            distros[i].set('selected', false);
                        }
                    }
                } catch (e) {
                }

                d.set('selected', true);
                this.set('selectedDistro', d);
            },
            unselectKey: function (k ) {
                //todo validate same key selected ?
                  this.set('errorMsg', null);
                  this.set('selected_key', null);
            },
            selectKey: function ( k ) {
                this.set('errorMsg', null);
                this.set('selected_key', k);
            },
            selectImage: function ( i ) {
                this.set('errorMsg', null);
                this.set('selected_image', i);
            },
            selectRegion: function(r) {
                this.set('errorMsg', null);
                this.set('selected_region', r);
                this.set('slug', r.get('slug'));
                try {

                    this.set('regionsSizeAvailable', this.get('selected_provider').get('region_sizes')[r.get('id')]);
                } catch (e ) {
                }

            },
            unselectSize: function () {
                this.set('selected_size',null);
            },

            selectSize: function( s ) {
               this.set('errorMsg', null);
                this.set('selected_size', s);
            },
            createServer: function() {

                this.set('errorMsg', null);

                try {
                var selectedDistro  = null;
                //Lets validate all data input..
                var distros = this.get('distros');
                if  ( distros != undefined && distros.length != undefined) {
                    var selectedDistro = null;
                    var len = distros.length;
                    for (var i = 0; ( i < len && selectedDistro == null); i++) {
                        if (distros[i].get('selected')) {
                            selectedDistro = distros[i];
                        }
                    }
                }
                if (selectedDistro == null) {
                    this.set('errorMsg', App.getI18NValue('distribution_not_selected'));
                    return;
                }
                } catch (e) {
                    console.error(e.stack);
                }

                if (this.get('selected_image') == undefined) {
                    this.set('errorMsg', App.getI18NValue('os_image_not_selected'));
                    return;
                }

                if (this.get('selected_size') == undefined) {
                    this.set('errorMsg', App.getI18NValue('server_size_not_selected'));
                    return;
                }

                if (this.get('selected_region') == undefined) {
                    this.set('errorMsg', App.getI18NValue('region_not_selected'));
                    return;
                }
                if (! Ember.View.views['shortHostName'].validate() ) {
                    // validate already shows an error message..
                    //this.set('errorMsg', App.getI18NValue('region_not_selected'));
                    return;
                }


                //All is good... lets create

                var d = {
                    server: { image_id: this.get('selected_image.id'),
                              size_id: this.get('selected_size'),
                              region_id: this.get('selected_region.id'),
                              name: Ember.View.views['shortHostName'].value.trim(),
                              provider_id: this.get('selected_provider.id')
                    }
                }

                if ( this.get('selected_key') != null ) {
                    d['server']['sshkeys_id'] = [ this.get('selected_key.id') ];
                }


                AppController.setStartLoadingWithDelay();

                var self = this;
                sendPostMessage("project/" + App.Project.params.project_id + "/servers/create",JSON.stringify(d), false).then(function(data) {
                    try {
                        if (data.success) {

                              var store = self.get('store');


                              store.find('task', data.task_id ).then(function(task) {
                                    task.set('complete_redirect_route','project.servers');
                                    self.transitionToRoute("project.server.create.status", task);
                                    running--;
                              });

                        } else {

                            this.set("errorMsg", App.getI18NValue("project.error_creating_server"));
                            running--;
                        }
                    } catch (e) {
                        this.set("errorMsg", App.getI18NValue("project.error_creating_server"));
                        running--;
                    }
                 });


            }
        }

});


 }


//End of loading controller base/user/controllers/project/sever/create 

//Loading user controller base/user/controllers/project/sever/server ...  

 acenteracontrollers['base_user_controllers_project_sever_server'] = function() { 

 
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




 }


//End of loading controller base/user/controllers/project/sever/server 

//Loading user controller base/user/controllers/project/sever/status ...  

 acenteracontrollers['base_user_controllers_project_sever_status'] = function() { 

 
App.ProjectServerCreateStatusRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
            //model.reload();
       },
       actions: {
       }
});

App.ProjectServerCreateStatusView = App.BaseView.extend({
      didRender: function() {
         //
      }
});

App.ProjectServerCreateStatusController = Ember.ObjectController.extend({
        needs: ["project","ProjectServers"],
        breadcrumbTitle: "Task Status",
        showErrorGoBackButton: false,
        error_route: null,
        error_model: null,
        actions: {
            taskCompleted: function(e) {
                //alert('completed');
                /*var self = this;
                self.get('controllers.project.content').reload().then(function (e) {
                        Ember.run.next(self, function() {
                            self.transitionToRoute('project.servers');
                        });
                 });*/
            },
            taskError: function(e) {
                //alert('task response is error...');
            },
            taskErrorGoBackClick: function(e) {

                var t = {};

                if (App.Project.params.project_id) {
                    t['project_id'] = App.Project.params.project_id;
                }

                if (App.Apps.params.id) {
                   t['apps_id'] = App.Apps.params.id;
                }

             try {              if (App.Apps.params.id) {
                             t['apps_id'] = App.Apps.params.id;
                          }
                          } catch (ee) {}

                          /*if (App.App.params.id) {
                             t['app_id'] = App.App.params.id;
                          }*/
          try {
                          if (App.Appconfig.params.id) {
                             t['appconfig_id'] = App.Appconfig.params.id;
                          }
                          } catch (ee) {}

console.error("GOT T");
                console.error(t);

                if (this.get('error_model') == null) {

                    this.transitionToRoute(this.get('error_route'), t);

                } else {

                    this.transitionToRoute(this.get('error_route'), this.get('error_model'));

                }
            }
        }
});


 }


//End of loading controller base/user/controllers/project/sever/status 

//Loading user controller base/user/controllers/project/sshkey/sshkey ...  

 acenteracontrollers['base_user_controllers_project_sshkey_sshkey'] = function() { 

 
App.ProjectSshkeyIndexRoute = Ember.Route.extend({
       setupPrivateController: function(controller, model) {
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

App.ProjectSshkeyIndexController = Ember.ObjectController.extend({
        needs: ["project"],
        content: null,
        breadcrumbTitle: function() {
            return this.get('content').get('name');
        }.property('content.name'),
        successMsg: null,
        canEditKey: function() {
            if (this.get('controller.project.ProjectAdmin') == 1) {
                return true;
            }
            if (this.get('content.canEdit') == 1) {
                return true;
            }
            return false;
        }.property('controller.project.ProjectAdmin','content.canEdit'),
        actions: {
            cancel: function() {

                this.get('content').rollback();

                //Restore from backup object
                resetValues(this, ['errorMsg', 'successMsg']);
            },
            update: function() {
                     if (this.get('content.isDirty')) {
                         var self = this;
                         AppController.setStartLoadingWithDelay();

                         this.get('content').save().then(function(e) {
                             //On Delete, we do not return any content so it will go into Failure... since no object were returned...
                             //OK GREAT
                             self.set('successMsg', App.getI18NValue('success_saving_model_to_backend'));

                             self.get('controllers.project.content').reload().then(function (e) {
                                    Ember.run.next(self, function() {
                                      running--;
                                    });
                              });

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
                                   self.transitionToRoute('project.sshkeys');
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
 }


//End of loading controller base/user/controllers/project/sshkey/sshkey 
// end of load. Framework by http://www.acentera.com/
