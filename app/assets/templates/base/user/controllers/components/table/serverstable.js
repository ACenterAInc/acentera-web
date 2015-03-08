
App.ServersTable= App.SimpleTable.extend({
    maxros: 20,
    clickRoute: null,
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            acenteraid: obj.get('acenteraid'),
            image_name : obj.get('image_name'),
            name : obj.get('name'),
            ipAddress : obj.get('ipAddress'),
            status : obj.get('status'),
            size : obj.get('size').name,
            disk : obj.get('size').disk + " GB",
            region : obj.get('region_name')
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
                    { "mData": "image_name" },
                    { "mData": "name" },
                    { "mData": "ipAddress" },
                    { "mData": "status" },
                    { "mData": "size" },
                    { "mData": "disk" },
                    { "mData": "region" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {

                           /*return "<a onclick='AppController.send(\"selectProvider\",\"" + oObj.aData.emberobject.get('id') + "\");'>"
                                                     + "Select</a>";*/
                           return "<a href='" + prefix + "#/project/" + App.Project.params.project_id + "/servers/" + oObj.aData.emberobject.get('acenteraid') + "'>"
                                    + "Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('servers-table', App.ServersTable);



