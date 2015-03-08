
//More detailed view dan the App.Servers object

App.Image = DS.Model.extend({
    name: DS.attr('string'),
    slug: DS.attr('string'),
    distribution: DS.attr('string'),
    regions: DS.hasMany('region')
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

/*var inflector = Ember.Inflector.inflector;
inflector.irregular("server", "server");
*/

App.ImageAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                //TODO: Throw an error?
                return "api/project/" + App.Project.params.project_id + "/key/" + App.Image.params.provider_id + "/images";
              } else {
                return "api/project/" + App.Project.params.project_id + "/key/" + App.Image.params.provider_id+ "/image/" + suffix;
              }
          } catch (e) {
          }
      }
});
