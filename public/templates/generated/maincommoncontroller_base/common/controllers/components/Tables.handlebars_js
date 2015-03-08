
App.BaseTableController = Ember.ObjectController.extend({
        data: null,
        dt: function() {

        }.observes('data')
});

App.BaseTableView = Ember.View.extend({
        maxrows: 0,
        chart : null,
        data: null,
        linkedServer: null,
        isLoaded : false,
        classNames: ['table'],
        viewobj : null,
        view: null,
        hideaction: false,
        type: null,
        action: null,
        oldid: null,
        datatable: null,
        tagName:'div',
        initialized: false,
        template_name: null,
        action: "clickHandler",
        controller: null,
        noDataMessage: null,
        tableId: null,
        chartData: null,
        columns: null,
        options: null,
        tagName: 'div',
        clickRoute: null,
        clickOnPrivate: function(e) {
            //call overriden object maybe?
            try {this.clickOn(e);} catch (zz) {
            console.error(zz.stack);}
            //call validate selected
            var self = this;
            Ember.run.next(function() {
                try {
                    self.validateSelected(false);
                    } catch (zz) {
                    console.error(zz.stack);
                    }
            });
        },
        clickOn: function (e ) {
            if (this.get('clickRoute') != undefined) {
                    AppController.transitionToRoute(this.get('clickRoute'), e);
            }
        },
        getRowObject: function(obj) {
          return {
                id : obj.get('id'),
                name : obj.get('name')
          };
        },
        noData: function() {
           try {
            //if (this.get('datatable').fnSettings() != null) {
            //    if (this.get('noDataMessage') != null) {
                    this.get('datatable').fnSettings().oLanguage.sEmptyTable = this.get('noDataMessage');
                    this.get('datatable').fnClearTable();
              //  }
            //}
           } catch (err) {
              console.error(err.stack);
           }
        }.observes('noDataMessage'),
        initRowClick: function() {
                    /* Add events */
                    var self = this;

                    var theTableObj = this.get('datatable');
                    $('#' + self.get('tableId') + " tbody").on('click', 'tr', function() {

                                     var row =  theTableObj.fnGetData(this);
                                     if (row != undefined) {
                                         //clicked on an item.. not on no data..
                                         var emberobject = row.emberobject
                                         self.clickOnPrivate(emberobject);
                                     }

                    });
        },

        templateName: function() {
            try {
                var k = this.get('viewobj.subTemplate');
                if (k == undefined) {
                    k = this.get('template_name');
                    if (k == undefined) {
                        k="basetablecomponent"
                    }

                    return k;
                }
                return k;
            } catch (e) {
                    return null;
            }
        }.property('viewobj.subTemplate').cacheable(),
        didInsertElement: function() {
            try {
                //Must be first thing..
                if (this.get('viewobj') != undefined) {
                    if (this.get('viewobj').get('elementId') != undefined) {
                        var height_ori = ("" + this.get('viewobj').get('height')).replace("px","");

                        var heightToDel = jq('#' + this.get('viewobj').get('tableId')).offset().top - jq('#' + this.get('viewobj').get('elementId')).offset().top;
                        this.$().height(height_ori - heightToDel);
                        this.$().width(this.get('viewobj').get('width'));

                        try {
                             jq('#' + this.get('viewobj').get('elementId')).find('.box').height((height_ori - heightToDel));

                             heightToDel = (jq('#' + this.get('tableId')).offset().top - jq('#' + this.get('viewobj').get('elementId')).offset().top) * 3;
                             $('#' + this.get('tableId')).height(height_ori - heightToDel);


                        } catch (e) {
                        }
                    }
                }

                try {
                    running++;
                    this.initializeTable();
                } catch (ee) {
                }
            } catch (zz) {
                console.error(zz.stack);
            }
       },
       initializeTable: function() {
            try {
                if ($('#' + this.get('elementId')).length) {

                    running--;

                    var tabledef = this.getTableDefinition();

                    if (tabledef != null) {
                        if (tabledef.bAuthWidth == undefined) {
                            tabledef.bAutoWidth = false;
                        }
                        if (tabledef.iDisplayLength == undefined) {
                            if (this.maxrows != null) {
                                tabledef.iDisplayLength = this.maxrows;
                            }
                        }
                    }



                    var self = this;
                    var dt = $('#' + self.get('tableId')).dataTable(tabledef);
                    console.error(dt);
                    this.set('datatable',dt);
                    this.set('initialized', true);
                    this.initRowClick();

                    this.update();
                    resizeScreen();
                } else {
                    Ember.run.later(this, function() {
                        initializeTable();
                    }, 500);
                }
            } catch (ee) {
                console.error(ee.stack);
            }
       },
       didInsertElementCallback: function() {

            /*this.didInsertElementTable();
            var self =
            Ember.run.once(this, this.update());*/
       },
       validateSelected: function(click) {

                try {
                   var theTableObj = this.get('datatable');
                   console.error("SELECTED IS : " );
                   console.error(this.get('selected'));
                   if (this.get('selected') != null) {

                           var self = this;
                           console.error("OK TEST");
                           $(theTableObj.fnSettings().aoData).each(function () {
                                       var tmpData = theTableObj.fnGetData(this.nTr);

                                       console.error('sel??');
                                       console.error(tmpData.id);
                                       console.error("vs")
                                       console.error(self.get('selected'))
                                       if (tmpData.id == self.get('selected')) {
                                            var emberobject = tmpData.emberobject
                                            if (click) {
                                                self.clickOn(emberobject);
                                            }

                                            $(theTableObj.fnSettings().aoData).each(function (){
                                               $(this.nTr).removeClass('row_selected');
                                            });

                                           console.error($(this.nTr));
                                           try {
                                               $(this.nTr).addClass('row_selected');
                                           } catch (eee ) {
                                               console.error(eee.stack);
                                           }
                                       }
                           });
                   }
               } catch (eee) {
                   console.error(eee.stack);
               }
       },
       update: function() {
          try {
              var self = this;
              // TODO: Take the current data we received and make it properly per columns.....
              if (this.get('datatable') != undefined) {
                try {
                   this.get('datatable').fnClearTable();
                } catch (e) {
                }
                console.error("GOT DATA");
                console.error(this.get('data'));
                if ((this.get('data') == undefined) || (this.get('data').length == 0)) {
                    this.noData();
                } else {
                    var dtTableData = [];
                    try {
                        console.error("GOT DATA FULLFILLED ? ");
                        if (this.get('data').isFulfilled || this.get('data').isLoaded || this.get('data').loaded || this.get('data').length != undefined) {
                            console.error("GOT DATA FULLFILLED  TRUE ");
                           var theDataTmp = this.get('data.content');
                            if (theDataTmp == undefined ) {
                                theDataTmp = this.get('data');
                            }
                            if (theDataTmp != undefined ) {
                                if (theDataTmp.content != undefined) {
                                    theDataTmp = theDataTmp.content;
                                }
                            }
                             jQuery.each(theDataTmp, function(data) {
                                    console.error("DOING EACH... on :");
                                    console.error(data);
                                    if (theDataTmp[data].id != null) { // THIS IF STATEMENT IS REQUIRED OTHERWISE DUPLICATE IN DATATABLE WHILE CREATING NEW OBJECTS
                                       var tmpData = self.getRowObject(theDataTmp[data]);
                                       if (tmpData) {
                                            try {
                                               if (tmpData.emberobject == undefined) {
                                                    tmpData.emberobject = theDataTmp[data];
                                               }
                                           } catch (ew) {
                                           }
                                           dtTableData.push(tmpData);
                                       }
                                    }
                             });


                          if (dtTableData.length <= 0 ) {
                            this.noData();
                          } else {

                              self.get('datatable').fnAddData( dtTableData );
                          }

                          var theTableObj = this.get('datatable');
                          console.error("WILL CHECK SELECTED ??");
                          console.error("selected : " + this.get('selected'));
                          this.validateSelected(true);


                             console.error("PUSHED");
                             console.error(dtTableData);
                        }

                        resizeScreen();
                    } catch (ee) {
                    }
                }
              }
             } catch (ew) {
                console.error(ew.stack);
             }
            }.observes('data.@each.id'),
            getRowObject: function(obj) {
            }
});



App.SimpleTable = App.BaseTableView.extend({
    clickRoute: null,
    clickOn: function (e ) {
        if (this.get('clickRoute') != undefined) {
                AppController.transitionToRoute(this.get('clickRoute'), e);
        }
    },
    getRowObject: function(obj) {
      return {
            id : obj.get('id'),
            name : obj.get('name')
      };
    },
    getTableDefinition: function() {
            return {
                "bProcessing": true,
                "bLengthChange": false,
                "bPaginate": false,
                "oLanguage": {
                        "sEmptyTable":     "Loading..."
                },
                "aaData": [],
                "aoColumns": [
                    { "mData": "id" },
                    { "mData": "name" },
                    {
                        "mData": "emberobject",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function (oObj)
                        {
                            return "<a href='" + prefix + "#/customLink/" + oObj.aData.emberobject.get('id') + "'>Select</a>";
                       }
                    }
                ]
            };
    }
});
Ember.Handlebars.helper('simple-table', App.SimpleTable);
