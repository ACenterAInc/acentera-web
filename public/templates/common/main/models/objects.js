
                     
//Loading model base/common/models/account ...  

 acenteramodels['main_0_maincommonmodels_base_common_models_account.handlebars_js'] = function() { 

 
App.Account = DS.Model.extend({
        type: DS.attr('string'),
        firstName: DS.attr('string'),
        tosAccepted: DS.attr(),
        company: DS.attr('string'),
        lang: DS.attr('string'),
        cloudid: DS.attr('number'),
        email: DS.attr('string'),
        code: DS.attr('string'),
        key: DS.attr('string'),
        funds: DS.attr('string'),
        fundsnegative: DS.attr('number'),
        fundsbillingdate: DS.attr('string'),
        monthCost: DS.attr('string'),
        added_funds: DS.attr('number'),
        payment_status: DS.attr('string'),
        payment_cardholder: DS.attr('string'),
        payment_country: DS.attr('string'),
        payment_address: DS.attr('string'),
        payment_city: DS.attr('string'),
        payment_type: DS.attr('string'),
        payment_detail: DS.attr('string'),
        redirectUrl: DS.attr('string'),
        lastName: DS.attr('string'),
        password: DS.attr('string'),
        password_confirm: DS.attr('string'),
        password_current: DS.attr('string'),
        action: DS.attr('string'),
        error: DS.attr('string'),
        demo_task_id: DS.attr('number')
});


//Ember.Inflector.inflector.irregular('formula', 'formulae');
Ember.Inflector.inflector.uncountable('account');


if (App.TestData == undefined) {
    App.AccountAdapter = CustomRESTAdapter.extend({
         buildURL: function(record, suffix,z ) {
              return "api/account";
          }
    });


    //Custom Hack for Account to update using /account instead of /account/:account_id
    App.AccountAdapter = App.AccountAdapter.extend({
      find: function(store, type, id) {
        // Do your thing here
        return this.ajax(this.buildURL(type.typeKey, id), 'GET');
      },

      findAll: function(store, type, sinceToken) {
        var query;
        // Do your thing here
        if (sinceToken) {
          query = { since: sinceToken };
        }

        return this.ajax(this.buildURL(type.typeKey), 'GET', { data: query });
      },

      findQuery: function(store, type, query) {
        // Do your thing here
        return this.ajax(this.buildURL(type.typeKey), 'GET', { data: query });
      },

      findMany: function(store, type, ids, owner) {
        return this.ajax(this.buildURL(type.typeKey), 'GET', { data: { ids: ids } });
      },
      updateRecord: function(store, type, record) {
        try {
              var data = {};
              var serializer = store.serializerFor(type.typeKey);

              serializer.serializeIntoHash(data, type, record);

              data[type.typeKey].id = parseInt(record.get('id'));
              return this.ajax(this.buildURL(type.typeKey, record.get('id')), "PUT", { data: data });
         } catch (e) {
         }
        }
    });
} }


//Loading model base/common/models/databases ...  

 acenteramodels['main_1_maincommonmodels_base_common_models_databases.handlebars_js'] = function() { 

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
}); }


//Loading model base/common/models/distro ...  

 acenteramodels['main_2_maincommonmodels_base_common_models_distro.handlebars_js'] = function() { 

 //More detailed view dan the App.Servers object

App.Distro = DS.Model.extend({
    name: DS.attr('string'),
    selecteD: DS.attr()
});


/*var inflector = Ember.Inflector.inflector;
inflector.irregular("server", "server");
*/

App.DistroAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              return null;
          } catch (e) {
          }
      }
});
 }


//Loading model base/common/models/image ...  

 acenteramodels['main_3_maincommonmodels_base_common_models_image.handlebars_js'] = function() { 

 
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
 }


//Loading model base/common/models/project ...  

 acenteramodels['main_4_maincommonmodels_base_common_models_project.handlebars_js'] = function() { 

 

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
 }


//Loading model base/common/models/projects ...  

 acenteramodels['main_5_maincommonmodels_base_common_models_projects.handlebars_js'] = function() { 

 


App.Projects = DS.Model.extend({
        name: DS.attr('string'),
        type: DS.attr('string'),
        invitetoken: DS.attr('string')
});

//Ember.Inflector.inflector.uncountable('projects');
var inflector = Ember.Inflector.inflector;

inflector.irregular("projects", "projects"); }


//Loading model base/common/models/provider ...  

 acenteramodels['main_6_maincommonmodels_base_common_models_provider.handlebars_js'] = function() { 

 

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
 }


//Loading model base/common/models/quota ...  

 acenteramodels['main_7_maincommonmodels_base_common_models_quota.handlebars_js'] = function() { 

 

App.Quota = DS.Model.extend({
        name: DS.attr('string'),
        compute: DS.attr('string'),
        disableDate: DS.attr('string')
});


App.QuotaAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          try {
              if (suffix == undefined) {
                return "api/project/" + App.Project.params.project_id + "/quotas";
              } else {
                return "api/project/" + App.Project.params.project_id + "/quota/" + suffix;
              }
          } catch (e) {
          }
      }
});


var inflector = Ember.Inflector.inflector;
inflector.irregular("quota", "quota");
 }


//Loading model base/common/models/region ...  

 acenteramodels['main_8_maincommonmodels_base_common_models_region.handlebars_js'] = function() { 

 App.Region =  DS.Model.extend({
   name: DS.attr('string'),
   slug: DS.attr('string'),
   active: DS.attr('boolean'),
   availableSizes: DS.attr()
}); }


//Loading model base/common/models/roles ...  

 acenteramodels['main_9_maincommonmodels_base_common_models_roles.handlebars_js'] = function() { 

 

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
 }


//Loading model base/common/models/server ...  

 acenteramodels['main_10_maincommonmodels_base_common_models_server.handlebars_js'] = function() { 

 
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
 }


//Loading model base/common/models/servers ...  

 acenteramodels['main_11_maincommonmodels_base_common_models_servers.handlebars_js'] = function() { 

 
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
 }


//Loading model base/common/models/sshkeys ...  

 acenteramodels['main_12_maincommonmodels_base_common_models_sshkeys.handlebars_js'] = function() { 

 
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
 }


//Loading model base/common/models/status ...  

 acenteramodels['main_13_maincommonmodels_base_common_models_status.handlebars_js'] = function() { 

 


App.Status = DS.Model.extend({
        success: DS.attr('string'),
        message: DS.attr('string')
});

Ember.Inflector.inflector.uncountable('status');
 }


//Loading model base/common/models/tags ...  

 acenteramodels['main_14_maincommonmodels_base_common_models_tags.handlebars_js'] = function() { 

 


App.Tag = DS.Model.extend({
        name: DS.attr('string'),
        type: DS.attr('string')
});


App.TagAdapter = CustomRESTAdapter.extend({
     buildURL: function(record, suffix,z ) {
          return null;
      }
});
 }


//Loading model base/common/models/task ...  

 acenteramodels['main_15_maincommonmodels_base_common_models_task.handlebars_js'] = function() { 

 

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
 }


//Loading model base/common/models/users ...  

 acenteramodels['main_16_maincommonmodels_base_common_models_users.handlebars_js'] = function() { 

 

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
 }


// Built using www.acentera.com framework