
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


