/* Ember inputfield compoents */

function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }

}


Ember.Handlebars.registerBoundHelper('dateFromNow', function(date) {
        try {
            var offset = new Date().getTimezoneOffset();
            var tz = -1 * (offset / 60);
            var actionTime = moment(date + "" + tz + ":00", "YYYY-MM-DD HH:mm:ssZ");
            return  actionTime.fromNow();
        } catch (ee) {
        }
        return date;
});

App.capitalize = function ( value ) {
        var capitalizeMe = value;
        var capitalized = capitalizeMe.charAt(0).toUpperCase() + capitalizeMe.substring(1);
        return capitalized;
}

App.getI18NValue = function( lookup ) {
    var value = lookup;
    var lang = App.get('lang');
    var i18n = App.get('i18n');
    var val = i18n.get(lang + "." + value);

    try {
        if (val == undefined) {
            if (lang != 'en') {
                val = i18n.get("en." + value);
            } else {
                val = i18n.get(value);
            }
       }
    } catch (z) {
       //TODO: Do something with this error
    }

    if (val != undefined) {
        value = val;
    } else {
          var capitalizeMe = value;
          var capitalized = capitalizeMe.charAt(0).toUpperCase() + capitalizeMe.substring(1).replaceAll("."," ").replaceAll("_"," ");
          value = capitalized;
    }

    return value;
};

App.GenericTranslateTextField = Ember.TextField.extend({
       placeholderTranslate: null,
       placeHolderTranslateCheck: function() {
            var toTranslate = this.get('placeholderTranslate');
            if (toTranslate != undefined) {
                this.set('placeholder', App.getI18NValue(this.get('placeholderTranslate')));
            }
       }.observes('placeholderTranslate').property('placeholderTranslate'),
       didInsertElement: function() {

            this.get('placeHolderTranslateCheck');
       }
});

App.NumberTextField = App.GenericTranslateTextField.extend({
     title: function() {
                if (this.get('check') == 'positiveOnly') {
                    return App.getI18NValue('numeric_non_decimal_greater_or_equal_zero');
                } else {
                    return App.getI18NValue('numeric_required');
                }
    }.property(),
    check: null,
    // implementation of this function, see http://stackoverflow.com/a/995193/65542
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    },
    validate: function() {
                 return this.focusOut(null);
        },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length <= 0) {
            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            $("#" + this.$().attr('id')).tooltip("enable");
            this.$().attr('rel','tooltip');

            try {
                this.set('isValidOnFocusOutCallback',false);
            } catch (ee) {

            }
            return false;
       } else {
                if (!isNumber(this.get('value'))) {
                                 this.$().addClass("error").removeClass("success");
                                 this.$().attr('title',this.get('title'));
                                 this.$().attr('rel','');
                                  $("#" + this.$().attr('id')).tooltip("enable");

                                 try {
                                     this.set('isValidOnFocusOutCallback',true);
                                     this.set('isValidOnFocusOutFeedbackMsg', this.get('title'));
                                 } catch (ee) {

                                 }
                                 return false;
                } else {
                    if (this.get('check') == 'positiveOnly') {
                        if (!(this.get('value') >= 0)) {
                             this.$().addClass("error").removeClass("success");
                             this.$().attr('title',this.get('title'));
                             this.$().attr('rel','');
                              $("#" + this.$().attr('id')).tooltip("enable");

                             try {
                                 this.set('isValidOnFocusOutCallback',true);
                                 this.set('isValidOnFocusOutFeedbackMsg', this.get('title'));
                             } catch (ee) {

                             }
                             return false;
                        }
                    }
                    this.$().addClass("success").removeClass("error");
                    this.$().attr('title',null);
                     $("#" + this.$().attr('id')).tooltip("destroy");
                    this.$().attr('rel','');

                    try {
                      this.set('isValidOnFocusOutCallback',true);
                      this.set('isValidOnFocusOutFeedbackMsg', null);
                    } catch (ee) {

                    }
                    return true;
                }
       }
    }
});
Ember.Handlebars.helper('Number-TextField', App.NumberTextField);


App.EmptyDifferTextField = Ember.TextField.extend({
    attributeBindings: ['style'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length <= 0) {
            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            $("#" + this.$().attr('id')).tooltip("enable");
            this.$().attr('rel','tooltip');

            try {
                this.set('isValidOnFocusOutCallback',false);
            } catch (ee) {

            }
            return false;
       } else {

            if (this.get('compare') != null) {

                 if (this.get('compare')!=this.get('value')) {

                                this.$().addClass("success").removeClass("error");
                                 this.$().attr('title',null);
                                 $("#" + this.$().attr('id')).tooltip("destroy");
                                 this.$().attr('rel','');

                                 try {
                                     this.set('isValidOnFocusOutCallback',false);
                                 } catch (ee) {

                                 }
                                 return true;
                 } else {
                                 this.$().addClass("error").removeClass("success");
                                 this.$().attr('title','The two fields "username" must not match.');
                                 this.$().attr('rel','');
                                  $("#" + this.$().attr('id')).tooltip("enable");

                                 try {
                                     this.set('isValidOnFocusOutCallback',true);
                                 } catch (ee) {

                                 }
                                 return false;
                 }
            } else {
                this.$().addClass("success").removeClass("error");
                this.$().attr('title',null);
                 $("#" + this.$().attr('id')).tooltip("destroy");
                this.$().attr('rel','');

                try {
                    this.set('isValidOnFocusOutCallback',false);
                } catch (ee) {

                }
                return true;
            }

       }
    }
});
Ember.Handlebars.helper('EmptyDiffer-TextField', App.EmptyDifferTextField);

App.NotEmptyDifferTextField = Ember.TextField.extend({
    attributeBindings: ['style'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length <= 1) {
            this.$().addClass("error").removeClass("success");
            this.$().attr('title',"You must have at least 2 character");
            $("#" + this.$().attr('id')).tooltip("enable");
            this.$().attr('rel','tooltip');

            try {
                this.set('isValidOnFocusOutCallback',false);
            } catch (ee) {

            }
            return false;
       } else {

            if (this.get('compare') != null) {

                 if (this.get('compare')!=this.get('value')) {

                                this.$().addClass("success").removeClass("error");
                                 this.$().attr('title',null);
                                 $("#" + this.$().attr('id')).tooltip("destroy");
                                 this.$().attr('rel','');

                                 try {
                                     this.set('isValidOnFocusOutCallback',false);
                                 } catch (ee) {

                                 }
                                 return true;
                 } else {
                                 this.$().addClass("error").removeClass("success");
                                 this.$().attr('title','The two fields "username" must not match.');
                                 this.$().attr('rel','');
                                  $("#" + this.$().attr('id')).tooltip("enable");

                                 try {
                                     this.set('isValidOnFocusOutCallback',true);
                                 } catch (ee) {

                                 }
                                 return false;
                 }
            } else {
                this.$().addClass("success").removeClass("error");
                this.$().attr('title',null);
                 $("#" + this.$().attr('id')).tooltip("destroy");
                this.$().attr('rel','');

                try {
                    this.set('isValidOnFocusOutCallback',false);
                } catch (ee) {

                }
                return true;
            }

       }
    }
});
Ember.Handlebars.helper('NotEmptyDiffer-TextField', App.NotEmptyDifferTextField);



App.NotEmptyTextField = App.GenericTranslateTextField.extend({
    attributeBindings: ['style'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length < 2) {
            this.$().addClass("error").removeClass("success");
            var err = 'You must have at least 2 character';
            this.$().attr('title',err);

            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            try {
                this.set('isValidOnFocusOutCallback',true);
                this.set('isValidOnFocusOutFeedbackMsg', err);
            } catch (ee) {

            }
            return false;
       } else {
            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            this.$().attr('rel','');
            $("#" + this.$().attr('id')).tooltip("destroy");

            try {
                this.set('isValidOnFocusOutCallback',false);
                this.set('isValidOnFocusOutFeedbackMsg', null);
            } catch (ee) {

            }
            return true;
       }
    }
});
Ember.Handlebars.helper('NotEmpty-TextField', App.NotEmptyTextField);

App.NotEmptyNoSpaceTextField = App.GenericTranslateTextField.extend({
    attributeBindings: ['style'],
    title: function() {
            return App.getI18NValue('twochar_required_and_no_space_input');
    }.property(),
    keyDown: function(event) {
        if (event.keyCode == 32) {
            return false;
        }
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length < 2) {
            this.$().addClass("error").removeClass("success");
            var err = this.get('title');
            this.$().attr('title',err);

            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            try {
                this.set('isValidOnFocusOutCallback',true);
                this.set('isValidOnFocusOutFeedbackMsg', err);
            } catch (ee) {

            }
            return false;
       } else {

            if (this.get('value').indexOf(" ") >= 0) {

                        this.$().addClass("error").removeClass("success");
                        var err = this.get('title');
                        this.$().attr('title',err);

                        this.$().attr('rel','tooltip');
                        $("#" + this.$().attr('id')).tooltip("enable");
                        try {
                            this.set('isValidOnFocusOutCallback',true);
                            this.set('isValidOnFocusOutFeedbackMsg', err);
                        } catch (ee) {

                        }
                        return false;

            }


            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            this.$().attr('rel','');
            $("#" + this.$().attr('id')).tooltip("destroy");

            try {
                this.set('isValidOnFocusOutCallback',false);
                this.set('isValidOnFocusOutFeedbackMsg', null);
            } catch (ee) {

            }
            return true;
       }
    }
});
Ember.Handlebars.helper('NotEmptyNoSpace-TextField', App.NotEmptyNoSpaceTextField);

App.EmptyNoSpaceTextField = App.GenericTranslateTextField.extend({
    attributeBindings: ['style'],
    title: function() {
            return App.getI18NValue('empty_valid_but_no_space_input');
    }.property(),
    keyDown: function(event) {
        if (event.keyCode == 32) {
            return false;
        }
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }

       if (this.get('value').indexOf(" ") >= 0) {

            this.$().addClass("error").removeClass("success");
            var err = this.get('title');
            this.$().attr('title',err);

            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            try {
                this.set('isValidOnFocusOutCallback',true);
                this.set('isValidOnFocusOutFeedbackMsg', err);
            } catch (ee) {

            }
            return false;

        }


        this.$().addClass("success").removeClass("error");
        this.$().attr('title',null);
        this.$().attr('rel','');
        $("#" + this.$().attr('id')).tooltip("destroy");

        try {
            this.set('isValidOnFocusOutCallback',false);
            this.set('isValidOnFocusOutFeedbackMsg', null);
        } catch (ee) {

        }
        return true;
       }
});
Ember.Handlebars.helper('EmptyNoSpace-TextField', App.EmptyNoSpaceTextField);


App.ReadOnlyTextField = Ember.TextField.extend({
    attributeBindings: ['style','readonly'],
    disabled: 'disabled',
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
            //dont allow return;

        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
                return;
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {

            return true;
    }
});
Ember.Handlebars.helper('ReadOnly-TextField', App.ReadOnlyTextField);

App.EmptyTextField = Ember.TextField.extend({
    attributeBindings: ['style'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if ((this.get('value').length <= 0 && (this.get('compare') == null))) {
            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            $("#" + this.$().attr('id')).tooltip("destroy");
            this.$().attr('rel','tooltip');

            try {
                this.set('isValidOnFocusOutCallback',true);
            } catch (ee) {

            }
            return true;
       } else {

            if (this.get('compare') != null) {

                 if (this.get('compare')==this.get('value')) {

                                this.$().addClass("success").removeClass("error");
                                 this.$().attr('title',null);
                                 $("#" + this.$().attr('id')).tooltip("destroy");
                                 this.$().attr('rel','');

                                 try {
                                     this.set('isValidOnFocusOutCallback',false);
                                 } catch (ee) {

                                 }
                                 return true;
                 } else {
                                 this.$().addClass("error").removeClass("success");
                                 this.$().attr('title','The two fields does not match.');
                                 this.$().attr('rel','');
                                  $("#" + this.$().attr('id')).tooltip("enable");

                                 try {
                                     this.set('isValidOnFocusOutCallback',true);
                                 } catch (ee) {

                                 }
                                 return false;
                 }
            } else {
                this.$().addClass("success").removeClass("error");
                this.$().attr('title',null);
                 $("#" + this.$().attr('id')).tooltip("destroy");
                this.$().attr('rel','');

                try {
                    this.set('isValidOnFocusOutCallback',false);
                } catch (ee) {

                }
                return true;
            }

       }
    }
});
Ember.Handlebars.helper('Empty-TextField', App.EmptyTextField);

App.NotEmptyFullDomainTextField = Ember.TextField.extend({
    attributeBindings: ['style','maxlength'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if ((event.keyCode == 32 ) || (event.keyCode == 190 )) {
            //event.preventDefault();
            //return;
        }
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            //return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length < 2)  {
            this.$().addClass("error").removeClass("success");
            this.$().attr('title','You must enter a valid hostname with more than 2 characters');
            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            return false;
       } else {

            var tmpDomain = this.get('value');
            var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
            if (re.test(tmpDomain)) {
                        this.$().addClass("success").removeClass("error");
                        this.$().attr('title',null);
                        this.$().attr('rel','');
                        $("#" + this.$().attr('id')).tooltip("destroy");
                        return true;
            } else {
                  this.$().addClass("error").removeClass("success");
                  this.$().attr('title','Your domain name contains invalid values.');
                  this.$().attr('rel','tooltip');
                  $("#" + this.$().attr('id')).tooltip("enable");
                  return false;
            }
       }
    }
});
Ember.Handlebars.helper('NotEmptyFullDomain-TextField', App.NotEmptyFullDomainTextField);

App.PGDbNameTextField = Ember.TextField.extend({
    attributeBindings: ['style'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if (this.get('value').length < 1) {
            this.$().addClass("error").removeClass("success");
            this.$().attr('title','You must have at least 1 character');
            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            try {
                this.set('isValidOnFocusOutCallback',true);
            } catch (ee) {

            }
            return false;
       } else {


          var tmpDomain = this.get('value');
           //tmpDomain += ".1834820923221.acentera.com";
           var re1 = /^pg\_.*$/
           if (re1.test(tmpDomain)) {
                  this.$().addClass("error").removeClass("success");
                 this.$().attr('title','The database name must not start with pg_');
                 this.$().attr('rel','tooltip');
                 $("#" + this.$().attr('id')).tooltip("enable");
                 try {
                     this.set('isValidOnFocusOutCallback',true);
                 } catch (ee) {

                 }
                 return false;
           } else {

               var tmpDomain = this.get('value');
               var re = /^(([a-zA-Z0-9]|[a-zA-Z][a-zA-Z0-9\-\_@]*[a-zA-Z0-9]))*([A-Za-z0-9]|[A-Za-z][A-Za-z0-9\-\_@]*[A-Za-z0-9])$/
               if (re.test(tmpDomain)) {
                           this.$().addClass("success").removeClass("error");
                           this.$().attr('title',null);
                           this.$().attr('rel','');
                           $("#" + this.$().attr('id')).tooltip("destroy");
                           return true;
               } else {
                     this.$().addClass("error").removeClass("success");
                     this.$().attr('title','The database name must contains letters (a-z), digits (0-9) and must not ends with (_,-). Underscores and hyphen are allowed.');
                     this.$().attr('rel','tooltip');
                     $("#" + this.$().attr('id')).tooltip("enable");
                     return false;
               }


                this.$().addClass("success").removeClass("error");
                this.$().attr('title',null);
                this.$().attr('rel','');
                $("#" + this.$().attr('id')).tooltip("destroy");

                try {
                    this.set('isValidOnFocusOutCallback',false);
                } catch (ee) {

                }
                return true;
           }
       }
    }
});

Ember.Handlebars.helper('PGDbName-TextField', App.PGDbNameTextField);



App.NotEmptyDomainTextField = Ember.TextField.extend({
    attributeBindings: ['style','maxlength'],
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if ((event.keyCode == 32 ) || (event.keyCode == 190 )) {
            event.preventDefault();
            return;
        }
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
             return this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }
       if ((this.get('value').length < 2) || (this.get('value').length > 15)) {
            this.$().addClass("error").removeClass("success");
            this.$().attr('title','You must have between 2 and 15 character');
            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            return false;
       } else {

            var tmpDomain = this.get('value');
            var re = /^(([a-zA-Z0-9]|[a-zA-Z][a-zA-Z0-9\-\_]*[a-zA-Z0-9]))*([A-Za-z0-9]|[A-Za-z][A-Za-z0-9\-\_]*[A-Za-z0-9])$/
            if (re.test(tmpDomain)) {
                        this.$().addClass("success").removeClass("error");
                        this.$().attr('title',null);
                        this.$().attr('rel','');
                        $("#" + this.$().attr('id')).tooltip("destroy");
                        return true;
            } else {
                  this.$().addClass("error").removeClass("success");
                  this.$().attr('title','Your domain name must contains letters (a-z), digits (0-9) and must not ends with (_,-). Underscores and hyphen are allowed.');
                  this.$().attr('rel','tooltip');
                  $("#" + this.$().attr('id')).tooltip("enable");
                  return false;
            }
       }
    }
});
Ember.Handlebars.helper('NotEmptyDomain-TextField', App.NotEmptyDomainTextField);


App.OptionalTextField = Ember.TextField.extend({
   keyDown: function(event) {
       // Allow: backspace, delete, tab, escape, and enter
       if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
       // Allow: Ctrl+A
       (event.keyCode == 65 && event.ctrlKey === true) ||
       // Allow: home, end, left, right
       (event.keyCode >= 35 && event.keyCode <= 39)) {
           // let it happen, don't do anything
           return;
       }
       else {
           // Ensure that it is a number and stop the keypress
       }

   },
    validate: function() {
        return  this.focusOut(null);
   },
   focusOut: function(event) {
      try {
          this.set('value', this.get('value').trim());
      } catch (e) {
          this.set('value',"");
      }
       this.$().addClass("success").removeClass("error");
       this.$().attr('title',null);
       this.$().attr('rel','');
       $("#" + this.$().attr('id')).tooltip("destroy");
      //}
      return true;
   }
});
Ember.Handlebars.helper('Optional-TextField', App.OptionalTextField);






App.NotEmptyEqualRefTextField = Ember.TextField.extend({
    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
        }

    },
    validate: function() {
      return  this.focusOut(null);
    },
    focusOut: function(event) {
       try {
            this.set('value', this.get('value').trim());
       } catch (e) {
            this.set('value',"");
       }

       try {
           this.get('ref').trim()
      } catch (e) {
           this.set('ref',"");
      }

       $("#" + this.$().attr('id')).tooltip("destroy");
       if (this.get('value').length < 2) {
            this.$().addClass("error").removeClass("success");
            this.$().attr('title','You must have at least 2 character');
            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            return false;
       } else {
            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            this.$().attr('rel','');

            if (this.get('value') != this.get('ref').trim()) {
                this.$().addClass("error").removeClass("success");
                this.$().attr('title','Confirmation value does not match.');
                this.$().attr('rel','tooltip');
                $("#" + this.$().attr('id')).tooltip("enable");
                return false;
            } else {
                 $("#" + this.$().attr('id')).tooltip("destroy");
            }
       }
       return true;
    }
});
Ember.Handlebars.helper('NotEmptyEqualRef-TextField', App.NotEmptyEqualRefTextField);




App.EmailTextField = Ember.TextField.extend({

    keyDown: function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
        (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
        }

    },
    validate: function() {
        return this.focusOut(null);
    },

    focusOut: function(event) {
       try {
             this.set('value', this.get('value').trim());
       } catch (e) {
             this.set('value',"");
       }
       if (! validateEmail(this.get('value'))) {
            this.$().addClass("error").removeClass("success");
            this.$().attr('title','The email address does not seems to be valid.');
            this.$().attr('rel','tooltip');
            $("#" + this.$().attr('id')).tooltip("enable");
            return false;
       } else {
            this.$().addClass("success").removeClass("error");
            this.$().attr('title',null);
            this.$().attr('rel','');
            $("#" + this.$().attr('id')).tooltip("destroy");
            return true;
       }
    }
});
Ember.Handlebars.helper('Email-TextField', App.EmailTextField);


App.MustBeCheckedFieldView = Ember.View.extend({
    //template: Ember.Handlebars.compile('<div class=""><input type="checkbox" {{bindAttr checked="view.checked"}}></div>'),
    templateName: "MustBeCheckedField",
    checked: false,
    attributeBindings: ['class','value'],
    hasClicked: false,
    click: function (evt) {
        this.set('hasClicked', true);
        this.set('value', $("#" + this.$().attr('id') + " input").first().is(':checked'));
        this.validate();
     },
     t: function() {
            try {
                if (!this.get('hasClicked')) {
                    if (this.get('value') != null) {

                        if (this.get('value')) {
                                        $("#" + this.$().attr('id') + " input").first().attr('checked', true);
                                        $("#" + this.$().attr('id') + " input").first().attr('disabled', true);
                        }
                    }
                }
            } catch (e) {

            }
     }.observes('value'),
     didInsertElement: function() {
        try {

            if (this.get('value')) {
                $("#" + this.$().attr('id') + " input").first().attr('checked', true);
                $("#" + this.$().attr('id') + " input").first().attr('disabled', true);
            } else {
                $("#" + this.$().attr('id') + " input").first().attr('checked', false);
            }
        } catch (e) {
            $("#" + this.$().attr('id') + " input").first().attr('checked', false);
        }
     },
    validate: function() {
        try {
            if (this.get('value') == true) {
                this.$().addClass("success").removeClass("error");
                this.$().attr('title',null);
                this.$().attr('rel','');
                $("#" + this.$().attr('id')).tooltip("destroy");
                return true;
            }
        } catch (e) {

        }
        this.$().addClass("error").removeClass("success");
        this.$().attr('title','You must aggree to the ToS');
        this.$().attr('rel','tooltip');
        $("#" + this.$().attr('id')).tooltip("enable");
        return false;
    }
});
Ember.Handlebars.helper('MustBe-CheckedField', App.MustBeCheckedField);



App.SelectTextField = Ember.Select.extend({
    attributeBindings: ['class','value'],
    title: function() {
        return App.getI18NValue('must_select_value');
    }.property(),
    hasClicked: false,
    click: function (evt) {
        this.validate();
    },
    selectionChange: function (e) {
            this.validate();
    }.observes('value'),
    validate: function() {
                 return this.focusOut(null);
    },
    focusOut: function(event) {

       if ( typeof this.get('value') == 'object') {

               //for now all values in a selectBox are ok to choose..
               try {
                    this.set('isValidOnFocusOutCallback',false);
                    this.set('isValidOnFocusOutFeedbackMsg', null);
               } catch (ee) {
               }

       } else {
           try {
                this.set('value', this.get('value').trim());
           } catch (e) {
                this.set('value',"");
           }

           if (this.get('value').length <= 0) {
                this.$().addClass("error").removeClass("success");
                this.$().attr('title',this.get('title'));
                this.$().attr('rel','');
                $("#" + this.$().attr('id')).tooltip("enable");


                try {
                    this.set('isValidOnFocusOutCallback',true);
                    this.set('isValidOnFocusOutFeedbackMsg', this.get('title'));
                } catch (ee) {

                }
                return false;
           } else {

                   try {
                       if (this.get('value') != undefined) {
                           this.$().addClass("success").removeClass("error");
                           this.$().attr('title',null);
                           this.$().attr('rel','');
                           $("#" + this.$().attr('id')).tooltip("destroy");

                           try {
                                this.set('isValidOnFocusOutCallback',false);
                                this.set('isValidOnFocusOutFeedbackMsg', null);
                           } catch (ee) {
                           }



                           return true;
                       }
                   } catch (e) {

                   }
                    this.$().addClass("error").removeClass("success");
                    this.$().attr('title',this.get('title'));
                    this.$().attr('rel','');
                    $("#" + this.$().attr('id')).tooltip("enable");


                    try {
                        this.set('isValidOnFocusOutCallback',true);
                        this.set('isValidOnFocusOutFeedbackMsg', this.get('title'));
                    } catch (ee) {

                    }

                   return false;

           }
       }
    }
});
Ember.Handlebars.helper('select-textfield', App.SelectTextField);



App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    close: function() {
      return this.sendAction();
    }
  }
});


App.ModalController = Ember.ObjectController.extend({
    model: null,
    ctrl: null
});

App.ModalView = Ember.View.extend({
    templateName: "modal",
    errMsg: "",
    ctrl: null,

    classNameBindings: ['lessTop:topMinus35:normal','lessTopLeft:topLeftMinus35:normal', 'lessTopHigher:lessTopHigh:normal'],
        /*//
        var data = "";

        if (this.get('lessTopHigher')) {
            data += "lessTopHigh";
        }

        if (this.get('lessTop')) {
                data += "topMinus35";
        }

        if (this.get('lessTopLeft')) {
                data += "topLeftMinus35";
        }
        if (data == "") {
            data = "normal";
        }
    }.observes('lessTop', 'lessTopHigher').property(),*/
    error: false,
    model : null,
    title: function() {
       return this.controller.get('model.title');
    }.property(),
    customWidth: function() {
            //var = getNewWidth()
            if (this.controller.get('model.customWidth') != undefined) {
                return this.controller.get('model.customWidth');
            }
            return "86%";
    }.property(),
    customStyle: function() {
        return "width:" + this.get('customWidth');
    }.property(),

    lessTop: function() {
        if (this.controller.get('model.lessTop') != undefined) {
                 this.controller.get('model.lessTop');
        }
        return true;
    }.observes('model').property('model'),
    lessTopLeft: function() {
            if (this.controller.get('model.lessTopLeft') != undefined) {
                     this.controller.get('model.lessTopLeft');
            }
            return true;
    }.observes('model').property('model'),
    lessTopHigher: function() {
            return (this.controller.get('model.lessTopHigher') == true);
    }.observes('model').property('model'),
    content: "",
    controller: null,
    extra: "",
    getAppElementId: function() {
        return this.get('elementId') + "_01";
    }.property(),
    getElementId02:function() {
       return this.get('elementId') + "_02";
    }.property(),
    tpl: function() {
        return this.controller.get('model.tpl');
    }.property(),
    cancel_text: function() {
             if (this.controller.get('model.cancel_text') != undefined) {
                      this.controller.get('model.cancel_text');
             }
             return "Cancel";
     },
     save_text: function() {
          if (this.controller.get('model.save_text') != undefined) {
                   this.controller.get('model.save_text');
          }
          return  "Save changes";
    },
    cancelEnabled: function() {
              if (this.controller.get('model.cancelEnabled') != undefined) {
                       this.controller.get('model.cancelEnabled');
              }
              return  true;
    },
    custom_destroy: function() {
        if (this.controller.get('model.custom_destroy') != undefined) {
            this.controller.get('model.custom_destroy')();
        }
    },
    saveText: function() {
        var txt = this.controller.get('model.save_text');
        if (txt == null) {
            return "Save changes";
        }
        return txt;
    }.property(),
    cancelText: function() {
            var txt = this.controller.get('model.cancel_text');
            if (txt == null) {
                return "Cancel";
            }
            return txt;
    }.property(),
    classNames: ["modal", "fade"],
    willInsertElement: function() {
        this.custom_destroy();
    },
    didInsertElement: function() {
        this.$().modal('show');

        var self = this;
        this.$().bind('hidden.bs.modal', { view: this }, function(event) {
            self._viewDidHide(self);
        });
    },
    // modal dismissed by example clicked in X, make sure the modal view is destroyed
    _viewDidHide: function(self) {
        if (!self.isDestroyed) {
            self.custom_destroy();
            self.destroy();
        }
    },
    //just before it destroy.. remove any created views by templates..
    willDestroyElement: function(){
         this.custom_destroy();
    },
    actions: {
        // here we click in close button so _viewDidHide is called
        close: function() {

            if (this.controller.get('model.close') != undefined) {
                //model.close will close it
                this.controller.get('model.close')(this);
             } else {
               this.$(".close").click();
             }
        },
        save: function() {
             if (this.controller.get('model.save') != undefined) {
               //save will close it..
                this.controller.get('model.save')(this);
             } else {
                this.$(".close").click();
             }
        }
    }
});
Ember.Handlebars.helper('modal-view', App.ModalView);



Ember.Handlebars.registerHelper('bindStyle', function(options) {
  var fmt = Ember.String.fmt;
  var attrs = options.hash;

  Ember.assert("You must specify at least one hash argument to bindStyle", !!Ember.keys(attrs).length);

  var view = options.data.view;
  var ret = [];
  var style = [];
  var ctx = this;
  // Generate a unique id for this element. This will be added as a
  // data attribute to the element so it can be looked up when
  // the bound property changes.
  var dataId = ++Ember.uuid;

  var attrKeys = Ember.keys(attrs).filter(function(item, index, self) {
    return (item.indexOf("unit") == -1) && (item !== "static");
  });

  // For each attribute passed, create an observer and emit the
  // current value of the property as an attribute.
  attrKeys.forEach(function(attr) {
    var property = attrs[attr];

    Ember.assert(fmt("You must provide a String for a bound attribute, not %@", [property]), typeof property === 'string');

    var propertyUnit = attrs[attr+"-unit"] || attrs["unit"] || '';

    var value = Em.get(ctx, property);
    if (value == null) {
        //roperty SIS : view.customWidth
        //  options.data.view.customWidth


        value = options.data.view.get(property);


        if (value == null) {
            value = options.data.view.customWidth
        }
    }



    Ember.assert(fmt("Attributes must be numbers, strings or booleans, not %@", [value]), value == null || typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean');

    var observer, invoker;

    observer = function observer() {
      var result = Em.get(ctx, property);

      Ember.assert(fmt("Attributes must be numbers, strings or booleans, not %@", [result]), result == null || typeof result === 'number' || typeof result === 'string' || typeof result === 'boolean');

      var elem = view.$("[data-bindAttr-" + dataId + "='" + dataId + "']");

      // If we aren't able to find the element, it means the element
      // to which we were bound has been removed from the view.
      // In that case, we can assume the template has been re-rendered
      // and we need to clean up the observer.
      if (Ember.isNone(elem) || elem.length === 0) {
        Ember.removeObserver(ctx, property, invoker);
        return;
      }

      var currentValue = elem.css(attr);

      if (currentValue !== result) {
        elem.css(attr, result+propertyUnit);
      }
    };

    invoker = function() {
      Ember.run.once(observer);
    };

    // Add an observer to the view for when the property changes.
    // When the observer fires, find the element using the
    // unique data id and update the attribute to the new value.
    Ember.addObserver(ctx, property, invoker);

    style.push(attr+':'+value+propertyUnit+';'+(attrs["static"] || ''));
  }, this);


  // Add the unique identifier
  ret.push('style="' + style.join(' ') + '" data-bindAttr-' + dataId + '="' + dataId + '"');
  return new Ember.Handlebars.SafeString(ret.join(' '));
});


App.GenericView = Ember.View.extend({
      tagName: 'div',
      error: false,
      errMsg: "",
      v: null,
      controller: null,
      getAppElementId: function() {
      }.property(),
      template_name: null,
      templateName: function() {
            try {
              return Em.get(this, 'template_name');
          } catch (e) {
              return null;
          }
      }.property('template_name'),
      isRendered: false,

      didInsertElement: function() {
            this._super();
            this.setIsRendered();
      },

      setIsRendered: function() {
            if (!!this.$()) {
           ////////////console.log('redred 3232');
                this.set('isRendered', true);
                Ember.run.next(this, function() {
                     setTimeout(function() {
                            try {
                                $("#" + $('.focus:first')[0].id).focus();
                            } catch (ee) {
                                setTimeout(function() {
                                    try {
                                        $("#" + $('.focus:first')[0].id).focus();
                                    } catch (ee) {
                                setTimeout(function() {
                                        try {
                                            $("#" + $('.focus:first')[0].id).focus();
                                        } catch (ee) {
                                            setTimeout(function() {
                                                try {
                                                    $("#" + $('.focus:first')[0].id).focus();
                                                } catch (ee) {

                                                }
                                            }, 800);
                                        }
                                    }, 500);
                                    }
                                }, 800);
                            }
                       }, 800);
                    });

            } else {
              if (!this.get('isRendered')) {
                  if (this.isDestroyed || this.isDestroying) {
                  } else {
                      Ember.run.next(this, function() {
                              this.setIsRendered();
                      });
                  }
              }
            }
      }
});
Ember.Handlebars.helper('generic-view', App.GenericView);

App.LeftmenuView = Ember.View.extend({
    tagName: "div",
    template_name: null,
    current_controller:null,
    model: null,
    templateName: function() {
            return this.get('template_name');
    }.observes('template_name').property('template_name')
});
Ember.Handlebars.helper('leftmenu-view', App.LeftmenuView);

App.TopbaView = Ember.View.extend({
    tagName: "div",
    template_name: null,
    hasLoaded: Ember.computed.alias('controllers.application.hasLoaded'),
    topbarTemplate: 'single',
    templateName: function() {
            return this.get('template_name');
    }.observes('template_name').property('template_name')
});

Ember.Handlebars.helper('topbar-view', App.TopbaView);


try {
App.I18nTextView = Ember.View.extend({
  tagName: "span",
  templateName: "i18n",
  template: Ember.Handlebars.compile("{{view.translatedContent}}"),

    translatedContent: (function() {
    try {
        var lang = this.get('lang');

        var val = this.get("content").get(lang+ "." + this.get("value"));
        if (val == undefined) {
            if (lang != 'en') {
                val = this.get("content").get("en." + this.get("value"));
            } else {
                val = this.get("content").get(this.get("value"));
            }
        }
      } catch (z) {
        //TODO: Do something with this error
      }

      try {
          if (val == undefined) {
            var capitalizeMe = this.get('value');
            var capitalized = capitalizeMe.charAt(0).toUpperCase() + capitalizeMe.substring(1).replaceAll("."," ").replaceAll("_"," ");
            val = capitalized;
          }
      } catch (z) {
      }

      return val;
    }).observes('lang').property("content","lang")
});



//Ember.Handlebars.helper('i18n-view', App.I18nTextView);

Ember.Handlebars.registerHelper("i18n", function(i18nKey, options) {
  options.hash.contentBinding = "App.i18n";
  options.hash.langBinding = "controllers.application.account.lang";
  options.hash.value = i18nKey;
  var tt = Ember.Handlebars.helpers.view.call(this, App.I18nTextView, options);
  return tt;
});



Ember.Handlebars.registerHelper('bind-attr-i18n', function bindAttrHelper(options) {
try {

var forEach = Ember.ArrayPolyfills.forEach;
var fmt = Ember.String.fmt;
var handlebarsGet = Ember.Handlebars.get, normalizePath = Ember.Handlebars.normalizePath;
  var attrs = options.hash;

  Ember.assert("You must specify at least one hash argument to bind-attr", !!Ember.keys(attrs).length);

  var view = options.data.view;
  var ret = [];
  var ctx = this;

  // Generate a unique id for this element. This will be added as a
  // data attribute to the element so it can be looked up when
  // the bound property changes.
  var dataId = ++Ember.uuid;

  // Handle classes differently, as we can bind multiple classes
  var classBindings = attrs['class'];
  if (classBindings != null) {
    var classResults = EmberHandlebars.bindClasses(this, classBindings, view, dataId, options);

    ret.push('class="' + Handlebars.Utils.escapeExpression(classResults.join(' ')) + '"');
    delete attrs['class'];
  }

  var attrKeys = Ember.keys(attrs);

  // For each attribute passed, create an observer and emit the
  // current value of the property as an attribute.
  forEach.call(attrKeys, function(attr) {
    var path = attrs[attr],
        normalized;

    Ember.assert(fmt("You must provide an expression as the value of bound attribute. You specified: %@=%@", [attr, path]), typeof path === 'string');

    normalized = normalizePath(ctx, path, options.data);

    var value = (path === 'this') ? normalized.root : handlebarsGet(ctx, path, options),
        type = Ember.typeOf(value);

     if (value == undefined) {
             value = path;
         }

    var lang = App.get('lang');
    var i18n = App.get('i18n');
            var val = i18n.get(lang + "." + value);


            try {
                if (val == undefined) {

                    if (lang != 'en') {
                        val = i18n.get("en." + value);
                    } else {
                        val = i18n.get(value);
                    }
                }
            } catch (z) {
                //TODO: Do something with this error
            }
          if (val != undefined) {
              value = val;
          }

    if (value == undefined) {
        value = path;
    }
    //Ember.assert(fmt("Attributes must be numbers, strings or booleans, not %@", [value]), value === null || value === undefined || type === 'number' || type === 'string' || type === 'boolean');

    var observer, invoker;

    observer = function observer() {
      var result = handlebarsGet(ctx, path, options);

      Ember.assert(fmt("Attributes must be numbers, strings or booleans, not %@", [result]),
                   result === null || result === undefined || typeof result === 'number' ||
                     typeof result === 'string' || typeof result === 'boolean');


      var elem = view.$("[data-bindattr-" + dataId + "='" + dataId + "']");
      // If we aren't able to find the element, it means the element
      // to which we were bound has been removed from the view.
      // In that case, we can assume the template has been re-rendered
      // and we need to clean up the observer.
      if (!elem || elem.length === 0) {
        Ember.removeObserver(normalized.root, normalized.path, invoker);
        return;
      }





      Ember.View.applyAttributeBindings(elem, attr, result);

      try {
            if (attr.substr(0,5) === 'data-') {
                jq( elem.selector ).attr(attr, App.getI18NValue(path));
            }
            if (attr === 'value') {
                jq( elem.selector ).attr(attr, App.getI18NValue(path));
            }
      } catch (ee) {
      }

    };
    // Add an observer to the view for when the property changes.
    // When the observer fires, find the element using the
    // unique data id and update the attribute to the new value.
    // Note: don't add observer when path is 'this' or path
    // is whole keyword e.g. {{#each x in list}} ... {{bind-attr attr="x"}}
    if (path !== 'this' && !(normalized.isKeyword && normalized.path === '' )) {
      view.registerObserver(normalized.root, normalized.path, observer);
    }

    // if this changes, also change the logic in ember-views/lib/views/view.js
    if ((type === 'string' || (type === 'number' && !isNaN(value)))) {
      ret.push(attr + '="' + Handlebars.Utils.escapeExpression(value) + '"');
    } else if (value && type === 'boolean') {
      // The developer controls the attr name, so it should always be safe
      ret.push(attr + '="' + attr + '"');
    }

    if (attr.substr(0,5) === 'data-') {
        ret.push(attr + '="' + value + '"');
    }
    if (attr === 'value') {
        ret.push(attr + '="' + value + '"');
    }
  }, this);
  // Add the unique identifier
  // NOTE: We use all lower-case since Firefox has problems with mixed case in SVG
  ret.push('data-bindattr-' + dataId + '="' + dataId + '"');
  } catch (zz) {
  }
  return new Ember.Handlebars.SafeString(ret.join(' '));
});


} catch (z) {
}





/**
  A replacement for #each that provides an index value (and other helpful values) for each iteration.
  Unless using `foo in bar` format, the item at each iteration will be accessible via the `item` variable.

  Simple Example
  --------------
  ```
  {{#eachIndexed bar in foo}}
    {{index}} - {{bar}}
  {{/#eachIndexed}}
  ```

  Helpful iteration values
  ------------------------
    * index: The current iteration index (zero indexed)
    * index_1: The current iteration index (one indexed)
    * first: True if this is the first item in the list
    * last: True if this is the last item in the list
    * even: True if it's an even iteration (0, 2, 4, 6)
    * odd: True if it's an odd iteration (1, 3, 5)
*/
Ember.Handlebars.registerHelper('eachIndexed', function eachHelper(path, options) {
  var keywordName = 'item',
      fn;

  // Process arguments (either #earchIndexed bar, or #earchIndexed foo in bar)
  if (arguments.length === 4) {
    Ember.assert('If you pass more than one argument to the eachIndexed helper, it must be in the form #eachIndexed foo in bar', arguments[1] === 'in');
    Ember.assert(arguments[0] +' is a reserved word in #eachIndexed', $.inArray(arguments[0], ['index', 'index+1', 'even', 'odd']));
    keywordName = arguments[0];

    options = arguments[3];
    path = arguments[2];
    options.hash.keyword = keywordName;
    if (path === '') { path = 'this'; }
  }

  if (arguments.length === 1) {
    options = path;
    path = 'this';
  }

  // Wrap the callback function in our own that sets the index value
  fn = options.fn;
  function eachFn(){
    var keywords = arguments[1].data.keywords,
        view = arguments[1].data.view,
        index = view.contentIndex,
        list = view._parentView.get('content') || [],
        len = list.length;

    // Set indexes
    keywords['index'] = index;
    keywords['index_1'] = index + 1;
    keywords['first'] = (index === 0);
    keywords['last'] = (index + 1 === len);
    keywords['even'] = (index % 2 === 0);
    keywords['odd'] = !keywords['even'];
    arguments[1].data.keywords = keywords;

    return fn.apply(this, arguments);
  }
  options.fn = eachFn;

  // Render
  options.hash.dataSourceBinding = path;
  if (options.data.insideGroup && !options.hash.groupedRows && !options.hash.itemViewClass) {
    new Ember.Handlebars.GroupedEach(this, path, options).render();
  } else {
    return Ember.Handlebars.helpers.collection.call(this, 'Ember.Handlebars.EachView', options);
  }
});
