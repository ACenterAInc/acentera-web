window.getCountryNiceName = function(z) {
    if ( z == undefined ) {
        return null;
    }

    try { z = z.replaceAll("nyc","New York ");} catch (e) {}
    try { z = z.replaceAll("sfo", "San Francisco ");} catch (e) {}
    try { z = z.replaceAll("ams","Amsterdam "); } catch (e) {}

    return z;
}

Handlebars.registerHelper('regionName', function(val, options) {

      try {
          var name = val.split(".")[0];
          var param = val.split(".")[1];

          var v = null;
          if ( param != undefined) {
              if (options.data.keywords[name] == undefined) {
                v = options.contexts[0].get(val);
              } else {
                v = options.data.keywords[name].get(param);
             }
          } else {
              v = options.data.view.controller.get(name);
          }


          //options.data.keywords.name = getCountryNiceName(v);

          //return options.fn(options.data.keywords);
          return getCountryNiceName(v);
      } catch (e) {

          return options.inverse();
          //return options.fn(options.data.keywords.controller);
      }
});


Handlebars.registerHelper('regionHasItem', function(id, val, options) {

        try {
            var content = options.data.view.content;
            var v = options.contexts[0].get(val);


            /*options.data.keywords.name = getCountryNiceName(content);
            var v = options.contexts[0].get(val);
            for(var i = 0; i < v.get('content').length; i++) {
                if (v.get('content')[i].get('slug') == content) {
                    options.data.keywords.obj = v.get('content')[i];
                   return options.fn();
                }
            }*/
            return options.inverse();
        } catch (e) {
            //console.log(e.stack);
            return options.inverse();
            //return options.fn(options.data.keywords.controller);
        }
});


Handlebars.registerHelper('regionAvailable', function(array, val, options) {

        try {

            var content = options.data.view.content;

            if (content != undefined) {
                var v = options.contexts[0].get(val);
                options.data.keywords.name = getCountryNiceName(content);




                for(var i = 0; i < v.get('content').length; i++) {
                    if (v.get('content')[i].get('slug') == content) {
                        options.data.keywords[val] = v.get('content')[i];

                        //options.data.keywords.selectedSize = options.contexts[0].get('selectedSize');
                       return options.fn();
                    }
                }
            }
            return options.inverse();
        } catch (e) {
            console.log(e.stack);
            return options.inverse();
            //return options.fn(options.data.keywords.controller);
        }
});



Handlebars.registerHelper('regionAvailableSize', function(array, val, options) {

             try {
                 var content = options.data.keywords[array];
                 var v = options.data.keywords[val];

                 var avail = content.get('availableSizes');

                 var bFound = false;
                 if (avail != undefined) {
                     for (var i = 0; i < avail.length;i++) {
                        if (parseFloat(avail[i]) == parseFloat(v)) {
                           return options.fn();
                        }
                     }
                 }


                return options.inverse();


                 //

                 //return options.inverse();
             } catch (e) {
                 //console.log(e.stack);
                 return options.inverse();
                 //return options.fn(options.data.keywords.controller);
             }
});
