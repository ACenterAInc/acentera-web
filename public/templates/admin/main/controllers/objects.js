
                     
//Loading user controller base/admin/controllers/i18n ...  

 acenteracontrollers['base_admin_controllers_i18n'] = function() { 

 
App.get("i18n").reopen({
    fr : {
            admin: "Administration"
    },
    en : {
            admin: "Admin"
    }
}); }


//End of loading controller base/admin/controllers/i18n 

//Loading user controller base/admin/controllers/routes_acentera ...  

 acenteracontrollers['base_admin_controllers_routes_acentera'] = function() { 

 

/* Routes
    ********************/


App.Router.map(function() {
      //Catch all Route
      this.route( "blank", { path: "/blank"});
      this.route( "404", { path: "*path"});


      //entry point everything should be under index..
      this.resource( "admin",  { path: "/" }, function() {
              this.resource("main",  { path: "/" }, function() {
                  this.route("index",  { path: "/" });

              });
      });


});


 }


//End of loading controller base/admin/controllers/routes_acentera 

//Loading user controller base/admin/controllers/main/index ...  

 acenteracontrollers['base_admin_controllers_main_index'] = function() { 

 App.MainRoute = Ember.Route.extend({
       leftmenuTemplate: 'main/leftmenu',
       topbarTemplate: 'single',
       setupPrivateController: function(controller, model) {
            //THis is used to show still loading...
            running++;


            //Hide loading screen
            running--;;
       }
});



App.MainIndexController = Ember.ObjectController.extend({
    breadcrumbUseParentModel: true,
    breadcrumbTitle: "Administration",
    breadcrumbVisible: true
});
 }


//End of loading controller base/admin/controllers/main/index 
// end of load. Framework by http://www.acentera.com/
