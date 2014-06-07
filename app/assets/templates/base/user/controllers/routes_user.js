
/* Routes
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
