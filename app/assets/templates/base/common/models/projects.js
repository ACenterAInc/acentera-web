


App.Projects = DS.Model.extend({
        name: DS.attr('string'),
        type: DS.attr('string'),
        invitetoken: DS.attr('string')
});

//Ember.Inflector.inflector.uncountable('projects');
var inflector = Ember.Inflector.inflector;

inflector.irregular("projects", "projects");