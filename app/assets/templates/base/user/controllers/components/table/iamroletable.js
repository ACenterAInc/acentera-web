
App.IAMRoleTable = App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('name')
      };
    },
    getTableDefinition: function() {
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

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + oObj.aData.emberobject._data.project_id + "/iam/role/" + oObj.aData.emberobject.get('id') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('iamrole-table', App.IAMRoleTable);


