

App.Task = DS.Model.extend({
        name: DS.attr('string'),
        type: DS.attr('string'),
        refreshtype: DS.attr('string'),
        percentage: DS.attr('number'),
        action_status: DS.attr('string'),
        complete_redirect_route: DS.attr('string'),
        error_redirect_route: DS.attr('string'),
        redirect_model: DS.attr(),
        redirect_url: DS.attr()
});



App.TaskAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
               try {
                   if (suffix == undefined) {
                     return "api/project/" + App.Project.params.project_id + "/tasks";
                   } else {
                     return "api/project/" + App.Project.params.project_id + "/task/" + suffix;
                   }
               } catch (e) {
               }
           }
});
