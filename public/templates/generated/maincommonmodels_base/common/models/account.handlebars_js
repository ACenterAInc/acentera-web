
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
}