
App.Sshkey = DS.Model.extend({
        name: DS.attr('string'),
        tag : DS.attr('string'),
        publickey : DS.attr('string'),
        canEdit: DS.attr('number')
});


App.SshkeyAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                return "api/project/" + App.Project.params.project_id + "/sshkeys";
              } else {
                return "api/project/" + App.Project.params.project_id + "/sshkey/" + suffix;
              }
          } catch (e) {
          }
      }
});
