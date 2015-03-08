

App.Provider = DS.Model.extend({
        name: DS.attr('string'),
        apikey: DS.attr('string'),
        secretkey: DS.attr('string'),
        regions: DS.hasMany('region'),
        region_sizes: DS.attr(),
        type: DS.attr('string'),
        tags: DS.attr(),
        tag : DS.attr('string'),
        disableDate: DS.attr('string')
});


App.ProviderAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                return "api/project/" + App.Project.params.project_id + "/providers";
              } else {
                return "api/project/" + App.Project.params.project_id + "/provider/" + suffix;
              }
          } catch (e) {
          }
      }
});
