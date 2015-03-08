App.Region =  DS.Model.extend({
   name: DS.attr('string'),
   slug: DS.attr('string'),
   active: DS.attr('boolean'),
   availableSizes: DS.attr()
});