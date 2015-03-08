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
