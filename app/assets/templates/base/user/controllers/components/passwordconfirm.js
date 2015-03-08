App.PasswordConfirmView = Ember.View.extend({
    templateName: 'components/password_confirm'
});
Ember.Handlebars.helper('passwordconfirm-view', App.PasswordConfirmView);
