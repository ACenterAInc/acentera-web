
//More detailed view dan the App.Servers object


App.Server = DS.Model.extend({
    acenteraid: DS.attr('string'),
    name: DS.attr('string'),
    ipAddress: DS.attr('string'),
    privateIpAddress: DS.attr('string'),
    image_name: DS.attr('string'),
    status: DS.attr('string'),
    type: DS.attr('string'),
    size: DS.attr(),
    region_name: DS.attr('string'),
    region_slug: DS.attr('string'),
    provider: DS.belongsTo('provider'),
    provider_region: DS.attr('number')
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

var inflector = Ember.Inflector.inflector;
inflector.irregular("server", "server");

App.ServerAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                //TODO: Throw an error?
                return "api/project/" + App.Project.params.project_id + "/servers";
              } else {
                return "api/project/" + App.Project.params.project_id + "/server/" + suffix;
              }
          } catch (e) {
          }
      }
});
