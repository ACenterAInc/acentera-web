
App.ProjectListTable = App.SimpleTable.extend({
    type : null,
    maxros: 20,
    clickRoute: null,
    clickOn: function (e ) {
        /*if (this.get('clickRoute') != undefined) {
                AppController.transitionToRoute(this.get('clickRoute'), e);
        }*/
    },

    getRowObject: function(obj) {
      if ( this.get('type') == 'pendingInvite') {
        if (obj.get('type') == 'invited') {
              return {
                    id : obj.get('id'),
                    name : obj.get('name')
              };
        }
      } else {

             if (obj.get('type') != 'invited') {
                    return {
                          id : obj.get('id'),
                          name : obj.get('name')
                    };
              }
      }
    },
    getTableDefinition: function() {
            var self = this;
            return {
                "bPaginate": true,
                "iDisplayLength": this.get('maxrows'),
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id",
                      "bVisible": false
                    },
                    { "mData": "name" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('projectlist-table', App.ProjectListTable);


