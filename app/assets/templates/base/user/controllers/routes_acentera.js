

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




