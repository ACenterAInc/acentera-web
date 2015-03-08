App.SizeTextboxView = Ember.View.extend({
    templateName: 'components/sizetextbox',
    size: null,
    selsize: null
});
Ember.Handlebars.helper('sizetextbox-view', App.SizeTextboxView);
