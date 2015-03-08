

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


