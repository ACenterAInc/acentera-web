

App.Role = DS.Model.extend({
        name: DS.attr('string')
});


App.RoleAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                return "api/project/" + App.Project.params.project_id + "/roles";
              } else {
                return "api/project/" + App.Project.params.project_id + "/role/" + suffix;
              }
          } catch (e) {
          }
      }
});
