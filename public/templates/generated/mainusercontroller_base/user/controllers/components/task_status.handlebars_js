

App.TaskStatusView = Ember.View.extend({
  templateName: 'components/task_status',
  task_id: null,
  ctrl: null,
  ready_counter: 0,
  complete_redirect_route:null,
  error_redirect_route: null,
  redirect_model: null,
  redirect_url: null,
  redirect_model_id: null,
  redirect_model_type: null,
  didInsertElement: function() {
    try {
        var ctrl = this.get('controller');
        if (ctrl == null) {
            try {
                ctrl = this.get('_parentView').get('controller');
            } catch (e) {
            }
        }

        this.set('ctrl', ctrl);

        /*
        try {ctrl.set('complete_redirect_route', ctrl.get('content').get('complete_redirect_route'));} catch(w) {}
        try {ctrl.set('error_redirect_route', ctrl.get('content').get('error_redirect_route'));} catch(w) {}
        */

        try {this.set('complete_redirect_route', ctrl.get('content').get('complete_redirect_route'));} catch(w) {}
        try {this.set('error_redirect_route', ctrl.get('content').get('error_redirect_route'));} catch(w) {}
        try {this.set('redirect_model_type', ctrl.get('content').get('redirect_model_type'));} catch(w) {}
        try {this.set('redirect_model_id', ctrl.get('content').get('redirect_model_id'));} catch(w) {}
        try {this.set('redirect_model', ctrl.get('content').get('redirect_model'));} catch(w) {}
        try {this.set('redirect_url', ctrl.get('content').get('redirect_url'));} catch(w) {}

        try {ctrl.get('content').rollback();} catch (w) {}

        var self = this;
        var reloadByPolling = true;
        /*if (ctrl.get('content').get('refreshtype') == 'async') {
            reloadByPolling=false;
        }*/

        this.set('ready_counter', 0);
        try {
            var prct = this.get('ctrl').get('content.percentage');
            if (prct >= this.get('ctrl').get('current_percentage')) {
                this.get('ctrl').set('current_percentage', prct);
            } else {
                this.get('ctrl').set('current_percentage', 2);
            }
        } catch( ee) {
        }

        self.reloadTaskStatus(false);
     } catch (z) {
        console.error(z.stack);
     }
  },
  isCompleted: function() {
    if (this.isDestroyed || this.isDestroying) {
         return false;
    }
    var self = this;
    try {
        if (this.get('ctrl').get('content').get('percentage') == 100) {

            if (this.get('ready_counter') == undefined) {
                this.set('ready_counter', 0);
            }

            if (this.get('ready_counter') >= 3) {
                try {this.get('ctrl').send('taskCompleted');} catch (ee) {}

                if (this.get('complete_redirect_route') != undefined) {

                    var m = this.get('redirect_model');
                    if ( m != undefined ) {
                        m.reload();
                    } else {
                        m = this.get('ctrl').get('controllers.project.content');
                        m.reload();
                    }

                    console.error("TEST A ");
                    console.error("TEST A " + this.get('redirect_url')) ;
                    //console.error(readCookie("prev_task_url"));
//todo.. lasturl
                    this.get('ctrl').transitionToRoute(this.get('complete_redirect_route'), m);
                } else {
                    //use prev url
                    console.error("TEST A1 " + this.get('redirect_url')) ;

                    window.location.href = "#" + this.get('redirect_url');
                }
                return true;
            } else {
                this.set('ready_counter', (this.get('ready_counter') + 1) );
            }
        }

        if (this.get('ctrl').get('content').get('action_status') == 'error') {
            try {this.get('ctrl').send('taskError');} catch (ee) {}

            if (this.get('error_redirect_route') != undefined) {


                var m = this.get('redirect_model');
                if ( m != undefined ) {
                    m.reload();
                } else {
                    m = this.get('ctrl').get('controllers.project.content');
                    m.reload();
                }

                this.get('ctrl').set('showErrorGoBackButton', true);
                this.get('ctrl').set('error_route', this.get('error_redirect_route'));





                //this.get('ctrl').set('error_model', m);






                //this.get('ctrl').transitionToRoute(this.get('error_redirect_route'), m);
            } else {
                if (this.get('complete_redirect_route') != undefined) {

                    var m = this.get('redirect_model');
                    if ( m != undefined ) {
                        m.reload();
                    } else {
                        m = this.get('ctrl').get('controllers.project.content');
                        m.reload();
                    }

                    this.get('ctrl').transitionToRoute(this.get('complete_redirect_route'), m);
                }

            }

            return true;
        }
    } catch (err) {
        console.error(err.stack);
    }

    return false;
  },
  reloadTaskStatus : function(reload) {
     var self = this;

     if (this.isDestroyed || this.isDestroying) {
              return false;
     }

     try {

        if (this.isCompleted()) {
            return true;
        }

        if (reload) {
            this.get('ctrl').get('content').reload();

            var prct = this.get('ctrl').get('content.percentage');
            if (prct >= 80 ) {
                if (this.get('ready_counter') >= 3 ) {
                    if (prct >= this.get('ctrl').get('current_percentage')) {
                        this.get('ctrl').set('current_percentage', prct);
                    }
                }
            } else {
                if (prct >= this.get('ctrl').get('current_percentage')) {
                    this.get('ctrl').set('current_percentage', prct);
                }
            }

            try {this.get('ctrl').send('taskReloaded');} catch (ee) {}
        }

        Ember.run.later((function() {
            if (!(self.isCompleted())) {

                Ember.run.later((function() {


                   //do something in here that will run in 5 seconds
                   self.reloadTaskStatus(true);


                }), 2000);

            }
        }), 500);

    } catch (Ee) {
        console.error(Ee.stack);
    }
  },
  actions: {
    taskErrorGoBackClick: function() {
        //alert('aa');
    },
    asyncResponse: function(e,custom_data) {
       try {

           try {

               this.get('content').set('percentage', theVal);
               var thePercent = e.msg.data.percent;

               var curPercent = this.get('ctrl').get('content').get('percentage');
               if (curPercent > thePercent) {
                   thePercent = curPercent;
               }

               if ((thePercent >= 95) && (curPercent <=80) ) { thePercent = curPercent; }


               this.get('ctrl').get('content').set('percentage', thePercent);
           } catch (ex) {
                console.error(ex.stack);
           }

           if (e.msg.status == 'failed') {
                this.get('ctrl').get('content').set('action_status', "error");
                //TODO: this.isCompleted();
           } else {

                if (e.msg.state == "ALL_TASKS_COMPLETED") {
                        alert('COMPLETED... todo: load model.. adn redirect ?');
                        this.get('ctrl').get('content').set('percentage', 100);

                        //TODO call this.isCompleted();

                        /*AppController.send('loadClusterInfoNoRedirAll', function() {
                               console.error('all tasks where completed.... lets redirect...');
                               AppController.set('last_task_id', null);
                               AppController.transitionToRoute("databaseconfig.index");
                        });
                        */
                }
           }

       } catch (err) {
           console.error(err.stack);
       }
    }
  }
});
Ember.Handlebars.helper('taskstatus-view', App.TaskStatusView );
