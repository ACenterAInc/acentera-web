App.RegionSelectionView = Ember.View.extend({
    templateName: 'components/region_selection',
    regions: [ 'nyc', 'sfo' , 'ams' ],
    slug: null,
    regionsAvailable: null
});
Ember.Handlebars.helper('regionselection-view', App.RegionSelectionView);
