//More detailed view dan the App.Servers object

App.Custom = DS.Model.extend({
    name: DS.attr('string')
});

App.CustomAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {

                return "api/project/" + App.Project.params.project_id + "/customs";
              } else {
                //TODO: Throw an error?
                return "api/project/" + App.Project.params.project_id + "/custom/" + suffix;
              }
          } catch (e) {
             console.error(e.stack);
          }
      }
});