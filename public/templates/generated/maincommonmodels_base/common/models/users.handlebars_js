

App.User = DS.Model.extend({
        firstName: DS.attr('string'),
        lastName: DS.attr('string'),
        email: DS.attr('string'),
        tags: DS.attr(),
        type: DS.attr('string'),
        disable: DS.attr('number'),
        name: function() {
                if ((this.get('lastName') == null) && (this.get('firstName') == null)) {
                    return this.get('email');
                }
                if (!((this.get('lastName') == null) && (this.get('firstName') == null))) {
                    return this.get('lastName') + " " + this.get('firstName');
                }
                if (!((this.get('lastName') == null))) {
                    return this.get('lastName');
                }

                if (!((this.get('firstName') == null))) {
                   return this.get('firstName');
                }

                return this.get('email');
        }.property('firstName','lastName'),
        roles: DS.attr()

});


App.UserAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {

              if (suffix == undefined) {
                return "api/project/" + App.Project.params.project_id + "/users";
              } else {
                return "api/project/" + App.Project.params.project_id + "/user/" + suffix;
              }
          } catch (e) {
          }
      }
});
