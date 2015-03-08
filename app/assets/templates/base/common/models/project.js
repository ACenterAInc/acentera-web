

App.Project = DS.Model.extend({
        name: DS.attr('string'),
        disabled: DS.attr('number'),
        ProjectAdmin: DS.attr('number'),
        providers: DS.hasMany('provider'),
        quotas: DS.hasMany('quota'),
        sshkeys: DS.hasMany('sshkey'),
        invitetoken: DS.attr('string'),
        cloudId: DS.attr('number'),
        users: DS.hasMany('user'),
        has_db: DS.attr('number'),
        has_app: DS.attr('number'),
        isConfigured: DS.attr('number')
});

/*
App.ProjectSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    var tempProviders = payload.project.providers;
    payload.project.providers = [];

    tempProviders.forEach(function(provider) {
      payload.project.providers.push(provider.id);
    });
    payload.providers = tempProviders;
    return this._super(type, payload);
  }
})*/


//Ember.Inflector.inflector.uncountable('projects');
var inflector = Ember.Inflector.inflector;
inflector.irregular("project", "project");


App.ProjectInvite = DS.Model.extend({
        email: DS.attr('string')
});

App.ProjectInviteAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                return "api/project/" + App.User.params.project_id + "/invites";
              } else {
                return "api/project/" + App.User.params.project_id + "/invite/" + suffix;
              }
          } catch (e) {
          }
      }
});
