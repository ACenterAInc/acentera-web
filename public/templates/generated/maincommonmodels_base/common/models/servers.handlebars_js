
App.Servers = DS.Model.extend({
    acenteraid: DS.attr('string'),
    name: DS.attr('string'),
    ipAddress: DS.attr('string'),
    image_name: DS.attr('string'),
    status: DS.attr('string'),
    size: DS.attr(),
    region_name: DS.attr('string')
    /*diskspacefreeratio: DS.attr('number'),
    cpuload: DS.attr('number'),
    ipaddress: DS.attr('string'),
    internalip: DS.attr('string'),
    region: DS.attr('string'),
    size: DS.attr('number'),
    health: DS.attr('string'),
    location: DS.attr('string'),
    is_app: DS.attr('number'),
    is_db: DS.attr('number')*/
});

//Ember.Inflector.inflector.uncountable('projects');
var inflector = Ember.Inflector.inflector;
inflector.irregular("servers", "servers");

App.ServersAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                return "api/project/" + App.Project.params.project_id + "/servers";
              } else {
                return "api/project/" + App.Project.params.project_id + "/servers/" + suffix;
              }
          } catch (e) {
          }
      }
});
