Handlebars.registerHelper('equalObject', function(array, val, options) {

        try {
            var content = array;//options.data.view.content;
            var v = options.data.view.get(val);

            if (v == undefined) {
                try {
                    v = options.data.view.controller.get(val);
                } catch (ee) {
                }
            }
            if (v == undefined) {
               try {
                    v = options.contexts[0].get(val);
                    if (v == undefined) {
                        v = options.contexts[0].get(val.replaceAll("view.",""));
                    }
               } catch (ww) {
               }
            }

                if ("" + v == "" + content) {

                   return options.fn(options.data.view);
                }

                return options.inverse(options.data.view);
        } catch (e) {
            return options.inverse(options.data.view);
            //return options.fn(options.data.keywords.controller);
        }
});


Handlebars.registerHelper('equalObjectTest', function(array, val, options) {

        try {
            var content = array;//options.data.view.content;




            var v = options.data.view.get(val);

            if (v == undefined) {
                try {
                    v = options.data.view.controller.get(val);
                } catch (ee) {
                }
                if (v == undefined ) {
                    v = options.data.view.get(content);
                }
                if (v == undefined ) {
                    v = options.contexts[options.contexts.length -1].get(val);
                }
            }

            if (v == undefined) {
               try {
                    v = options.contexts[0].get(val);
                    if (v == undefined) {
                        v = options.contexts[0].get(val.replaceAll("view.",""));
                    }
               } catch (ww) {
               }
            }


                if ("" + v == "" + content) {

                   return options.fn(options.data.view);
                }

                return options.inverse(options.data.view);
        } catch (e) {
            return options.inverse(options.data.view);
            return options.fn(options.data.keywords.controller);
        }
});
