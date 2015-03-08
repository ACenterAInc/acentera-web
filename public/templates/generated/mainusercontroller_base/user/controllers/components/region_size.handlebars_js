App.ResizeRegionAvailableSize = Ember.View.extend({
    attributeBindings: ['style'],
    style: "margin-left:15px;width: 170px;height: 170px;float:left;",
    content: null,
    selected : null,
    currsize:  null,
    tooltipTitle: '',
    availableSizes: [  ],
    toggle: '',
    templateName: 'components/region_size',
    customloaded: false,
    type: 'db',

    monthlyPricing: function() {


        var dbManagePricing = false;

        if (this.get('type') == 'db') {
            dbManagePricing = true;
        } else {
            dbManagePricing = false;
        }


        dbManagePricing = true;
        var clusterSize = this.get('content');

        if ( (this.get('type') == 'do') && ( this.get('controller.semimanaged') == undefined  ) ) {

                        if (clusterSize == 66) {
                            return 5;
                        } else if (clusterSize == 63) {
                            return 10;
                        } else if (clusterSize == 62) {
                            return 20;
                        } else if (clusterSize == 64) {
                            return 40;
                        } else if (clusterSize == 65) {
                            return 80;
                        } else if (clusterSize == 61) {
                            return 160;
                        }

                        return clusterSize;

        } else {
            if (dbManagePricing) {

                if (clusterSize == 66) {
                    return 15;
                } else if (clusterSize == 63) {
                    return 25;
                } else if (clusterSize == 62) {
                    return 35;
                } else if (clusterSize == 64) {
                    return 65;
                } else if (clusterSize == 65) {
                    return 110;
                } else if (clusterSize == 61) {
                    return 200;
                }

                return clusterSize;
            } else {

                    if (clusterSize == 66) {
                        return 6;
                    } else if (clusterSize == 63) {
                        return 12;
                    } else if (clusterSize == 62) {
                        return 25;
                    } else if (clusterSize == 64) {
                        return 45;
                    } else if (clusterSize == 65) {
                        return 90;
                    } else if (clusterSize == 61) {
                        return 180;
                    }
                return 9;
            }
        }


    }.property(),

    hourlyPricing: function() {
            var dbManagePricing = false;

            if (this.get('type') == 'db') {
                dbManagePricing = true;
            } else {
                dbManagePricing = false;
            }

            var clusterSize = this.get('content');
            dbManagePricing = true;

            if ( (this.get('type') == 'do') && ( this.get('controller.semimanaged') == undefined  ) ) {
                        if (clusterSize == 66) {
                            return "0.007";
                        } else if (clusterSize == 63) {
                            return "0.015";
                        } else if (clusterSize == 62) {
                            return "0.030";
                        } else if (clusterSize == 64) {
                            return "0.060";
                        } else if (clusterSize == 65) {
                            return "0.119";
                        } else if (clusterSize == 61) {
                            return "0.238";
                        }
            } else {
                if (dbManagePricing) {

                    if (clusterSize == 66) {
                        return "0.020";
                    } else if (clusterSize == 63) {
                        return "0.033";
                    } else if (clusterSize == 62) {
                        return "0.046";
                    } else if (clusterSize == 64) {
                        return "0.087";
                    } else if (clusterSize == 65) {
                        return "0.146";
                    } else if (clusterSize == 61) {
                        return "0.266";
                    }

                    return clusterSize;
                } else {

                        if (clusterSize == 66) {
                            return "0.008";
                        } else if (clusterSize == 63) {
                            return "0.016";
                        } else if (clusterSize == 62) {
                            return "0.033";
                        } else if (clusterSize == 64) {
                            return "0.060";
                        } else if (clusterSize == 65) {
                            return "0.120";
                        } else if (clusterSize == 61) {
                            return "0.240";
                        }
                }
           }
        }.property(),
    isNotCurrentSize: function() {
        if (parseFloat(this.get('currsize')) == parseFloat(this.get('content'))) {
            return false
        } else {
            return true;
        }
    }.observes('selected').property(),
    isInREgion: function() {
            try {

                /*if (this.get('selected') == undefined) {
                    return false;
                }*/


                var avail = this.get('availableSizes');
                if (avail != undefined) {
                    for (var i = 0; i < avail.length;i++) {
                        if (parseFloat(avail[i]) == parseFloat(this.get('content'))) {
                            $("#size_" + this.get('content')).tooltip("destroy");
                            $("#size_" + this.get('content')).removeClass("disable");

                            if (this.get('selsize') == this.get('content')) {
                                this.set('selsize',null);
                                //need to send to controller but its ok..
                                //the selsize is a binded object
                                //this.send('unselectSize');
                            }

                            return true;
                        }
                    }
                }
            } catch (e) {
            }

            try {
                $("#size_" + this.get('content')).removeClass("active");
                $("#size_" + this.get('content')).addClass("disable");
                this.set('toggle', 'tooltip');
            } catch (ee) {
            }
            return false;
    }.observes('availableSizes','selected','currsize','content').property('selected','currsize','content','availableSizes'),
    didInsertElement: function() {
    }
});
Ember.Handlebars.helper('doregionsize-view', App.ResizeRegionAvailableSize);
