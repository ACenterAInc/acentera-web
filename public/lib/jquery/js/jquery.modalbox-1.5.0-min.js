/*!
* jQuery modalBox plugin v1.5.0 <http://code.google.com/p/jquery-modalbox-plugin/> 
* @requires jQuery v1.9.0 or later 
* is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
(function($){

        
        // Default options
        var defaults = {
                
                minimalTopSpacing : 50, // sets the minimum space between modalbox and visible area in the browser window
                draggable : true, //options: true, false
                disablingClickToClose : false, // options: true, false (disabling close events, hide the close button)
                disablingTheOverlayClickToClose : false, // options: true, false (close the modal box with close button only)
                setWidthOfModalLayer : null,
                customClassName : null,
                getStaticContentFrom : null,
                
                // set the positions of the modalbox manualy
                positionLeft : null,
                positionTop : null,
                
                // effects
                effectType_show_fadingLayer : ['fade', 'fast'], // options: ['show'] or ['fade', 'fast']
                effectType_hide_fadingLayer : ['fade', 'fast'], // options: ['hide'] or ['fade', 'fast']
                effectType_show_modalBox : ['show'], // options: ['show'] or ['fade', 'fast']
                effectType_hide_modalBox : ['hide'], // options: ['hide'] or ['fade', 'fast']
                
                // selectors
                selectorModalbox : '#modalBox',
                selectorModalBoxBody : '#modalBoxBody',
                selectorModalBoxBodyContent : '.modalBoxBodyContent',
                selectorModalBoxFaderLayer : '#modalBoxFaderLayer',
                selectorModalBoxAjaxLoader : '#modalBoxAjaxLoader',
                selectorModalBoxCloseButton : '#modalBoxCloseButton',
                selectorModalboxContent : '.modalboxContent',
                selectorModalboxPreCacheContainer : '#modalboxPreCacheContainer',
                selectorModalBoxImageLink : '.modalBoxImageLink',
                selectorModalBoxImageNoLink : '.modalBoxImageNoLink',
                selectorCloseModalBox : '.closeModalBox',
                selectorAjaxhref : 'ajaxhref',
                
                /*
                        Layout Container:
                        --------------------------------------------
                        <div class="modalboxStyleContainer_surface_left">
                                <div class="modalboxStyleContainer_surface_right">
                                        <div class="modalboxStyleContainerContent">
                                                <div class="modalBoxBodyContent">
                                                        
                                                        Content
                                                        
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div class="modalboxStyleContainer_corner_topLeft"><!-- - --></div>
                        <div class="modalboxStyleContainer_corner_topRight"><!-- - --></div>

                        <div class="modalboxStyleContainer_corner_bottomLeft"><!-- - --></div>
                        <div class="modalboxStyleContainer_corner_bottomRight"><!-- - --></div>

                        <div class="modalboxStyleContainer_surface_top"><div class="modalboxStyleContainer_surface_body"><!-- - --></div></div>
                        <div class="modalboxStyleContainer_surface_bottom"><div class="modalboxStyleContainer_surface_body"><!-- - --></div></div>
                */
                setModalboxLayoutContainer_Begin : '<div class="modalboxStyleContainer_surface_left"><div class="modalboxStyleContainer_surface_right"><div class="modalboxStyleContainerContent"><div id="modalBoxBodyContent" class="modalBoxBodyContent">',
                setModalboxLayoutContainer_End : '</div></div></div></div><div class="modalboxStyleContainer_corner_topLeft"><!-- - --></div><div class="modalboxStyleContainer_corner_topRight"><!-- - --></div><div class="modalboxStyleContainer_corner_bottomLeft"><!-- - --></div><div class="modalboxStyleContainer_corner_bottomRight"><!-- - --></div><div class="modalboxStyleContainer_surface_top"><div class="modalboxStyleContainer_surface_body"><!-- - --></div></div><div class="modalboxStyleContainer_surface_bottom"><div class="modalboxStyleContainer_surface_body"><!-- - --></div></div>',
                
                // localization
                localizedStrings : {
                        messageCloseWindow : 'Close Window',
                        messageAjaxLoader : 'Please wait',
                        errorMessageIfNoDataAvailable : '<strong>No content available!</strong>',
                        errorMessageXMLHttpRequest : 'Error: XML-Http-Request Status "500"',
                        errorMessageTextStatusError : 'Error: AJAX Request failed',
                        errorMessageImageLoadingFailed : 'Error: Image loading failed'
                },
                
                setTypeOfFadingLayer : 'black', // options: white, black, custom, disable
                setStylesOfFadingLayer : {// define the opacity and color of fader layer here
                        white : 'background-color:#fff; filter:alpha(opacity=60); -moz-opacity:0.6; opacity:0.6;',
                        black : 'background-color:#000; filter:alpha(opacity=10); -moz-opacity:0.1; opacity:0.1;',
                        transparent : 'background-color:transparent;',
                        custom : null
                },
                
                // direct call
                directCall : {
                        source  : null, // put url here like http://www.yourdomain.de/test?param=1&param=2
                        data    : null, // put content here like data : '<div class="testclass">test</div>'
                        element : null, // define identifyer of source container here to get html content, can be id or class like  like '#sourcecontainer'
                        image   : null // add image url here. e.G.: http://www.yourdomain.de/myimage.jpg
                },
                
                // ajax settings
                ajax_type : 'POST', // The type of request to make ("POST" or "GET"), default is "POST". Note: Other HTTP request methods, such as PUT and DELETE, can also be used here, but they are not supported by all browsers.
                ajax_contentType : 'application/x-www-form-urlencoded; charset=utf-8', // examples : charset=utf-8, charset=ISO-8859-1
                
                // callback functionalities
                callFunctionBeforeShow : function(){ // call a custom function before layer will be shown. return value must be "true" to finalize modal layer
                        return true;
                },
                callFunctionAfterShow : function(){}, // call a custom function after layer is shown
                callFunctionBeforeHide : function(){}, // call a custom function before layer will be closed
                callFunctionAfterHide : function(){}, // call a custom function after layer is closed
                
                debug : false,
                debugOuputMessagePrefix : '[jQuery modalBox plugin] '
                
        };
        
        
        try{
                
                /*
                        merge the custom settings with plugin defaults / Example:
                        ---------------------------------------------------------
                        <head>
                                <script type="text/javascript">
                                        var modalboxGlobalDefaults = {
                                                localizedStrings                                        : {
                                                        messageCloseWindow                              : 'Fenster schliessen',
                                                        messageAjaxLoader                               : 'Bitte warten<br />Ihre Anfrage wird verarbeitet.',
                                                        errorMessageIfNoDataAvailable   : '<strong>Keine Inhalte verf&uuml;gbar!</strong>',
                                                        errorMessageXMLHttpRequest              : 'Ein technischer Fehler (XML-Http-Request Status "500") verhindert den Aufruf der Seite.<br /><br />Bitte versuchen Sie es sp&auml;ter noch einmal',
                                                        errorMessageTextStatusError             : 'Ein technischer Fehler (AJAX-Anfrage fehlgeschlagen) verhindert den Aufruf der Seite.<br /><br />Bitte versuchen Sie es sp&auml;ter noch einmal'
                                                }
                                        }
                                </script>
                        </head>
                */
                
                defaults = jQuery.extend({}, defaults, modalboxGlobalDefaults);
                
        } catch(error) {}
        
        
        
        var methods = {
                
                /********** init - BEGIN **********/
                init : function( globaloptions ) {
                        
                        
                        
                        // merge the plugin defaults with custom options
                        var globaloptions = jQuery.extend({}, defaults, globaloptions);
                        
                        
                        var modalObj = jQuery(
                                this
                        );
                        
                        
                        
                        /************ direct call without event binding - BEGIN ************/
                        if( globaloptions.directCall )
                        {
                                if( globaloptions.directCall["source"] )
                                {
                                        openModalBox({
                                                type    : 'ajax',
                                                source  : globaloptions.directCall["source"]
                                        });
                                } 
                                else if ( globaloptions.directCall["data"] )
                                {
                                        openModalBox({
                                                type    : 'static',
                                                data    : globaloptions.directCall["data"]
                                        });
                                } 
                                else if ( globaloptions.directCall["element"] )
                                {
                                        openModalBox({
                                                type    : 'static',
                                                data    : jQuery( globaloptions.directCall["element"] ).html()
                                        });
                                } 
                                else if ( globaloptions.directCall["image"] )
                                {
                                        openModalBox({
                                                type            : 'image',
                                                image           : globaloptions.directCall["image"],
                                                imageLink       : globaloptions.directCall["imageLink"]
                                        });
                                }
                        }
                        /************ direct call without event binding - END ************/
                        
                        
                        
                        
                        /************ initializeModalBox - BEGIN ************/
                        var doNotBindEventsOnWindowResize = false;
                                
                        jQuery(
                                window
                        ).resize(function(){
                                doNotBindEventsOnWindowResize = true;
                        });
                        
                        if( !doNotBindEventsOnWindowResize && modalObj.length > 0 )
                        {
                                jQuery(
                                        document
                                ).on("click", modalObj.selector, function(event){
                                        
                                        prepareModalbox({
                                                event : event,
                                                element : jQuery(this)
                                        });
                                });
                        }
                        /************ initializeModalBox - END ************/
                        
                        
                        
                        
                        /************ prepareModalbox - END ************/
                        function prepareModalbox(settings)
                        {
                                
                                var settings = jQuery.extend({// default settings
                                        event : null,
                                        element : null,
                                        doNotOpenModalBoxContent : false,
                                        isFormSubmit : false
                                }, settings || {} );
                                
                                
                                if( settings.event && settings.element )
                                {
                                        
                                        var elementObj = settings.element;
                                        var source = '';
                                        var data = '';
                                        var type = '';
                                        var image = '';
                                        var imageLink = '';
                                        
                                        var getAttrHref = (
                                                typeof( elementObj.attr("href") ) != "undefined" ? elementObj.attr("href") : ''
                                        );
                                        
                                        var getAttrRel = (
                                                typeof( elementObj.attr("rel") ) != "undefined" ? elementObj.attr("rel") : ''
                                        );
                                        
                                        if( elementObj.is("input") ){
                                                
                                                source = elementObj.parents(
                                                        'form'
                                                ).attr(
                                                        'action'
                                                );
                                                
                                                data = elementObj.parents(
                                                        'form'
                                                ).serialize();
                                                
                                                type = 'ajax';
                                                settings.isFormSubmit = true;
                                                
                                                settings.event.preventDefault();
                                                
                                        } else if ( elementObj.find("input[name$='" + globaloptions.selectorAjaxhref + "']").length != 0 ){
                                                
                                                source = elementObj.find(
                                                        "input[name$='" + globaloptions.selectorAjaxhref + "']"
                                                ).val();
                                                
                                                data = '';
                                                type = 'ajax';
                                                
                                                settings.event.preventDefault();
                                                
                                        } else if ( getAttrRel.indexOf("ajax:") != -1 ){
                                                
                                                source = getAttrRel.split("ajax:");
                                                source = source[1];
                                                
                                                data = '';
                                                type = 'ajax';
                                                
                                                settings.event.preventDefault();
                                                
                                        } else if ( methods.isImageSource({ src : getAttrHref }) ){
                                                
                                                type = 'image';
                                                image = getAttrHref;
                                                
                                                checkImageLink = methods.extractImageLink({ 
                                                        src : getAttrHref 
                                                });
                                                
                                                imageLink = (
                                                        checkImageLink != "" ? checkImageLink : ""
                                                );
                                                
                                                settings.event.preventDefault();
                                                
                                        } else if ( methods.isImageSource({ src : getAttrRel }) ){
                                                
                                                type = 'image';
                                                image = getAttrRel;
                                                
                                                checkImageLink = methods.extractImageLink({ 
                                                        src : getAttrRel 
                                                });
                                                
                                                imageLink = (
                                                        checkImageLink != "" ? checkImageLink : ""
                                                );
                                                
                                                settings.event.preventDefault();
                                                
                                        } else if ( elementObj.find(globaloptions.selectorModalboxContent).length != 0 ){
                                                
                                                source = '';
                                                
                                                data = elementObj.find(
                                                        globaloptions.selectorModalboxContent
                                                ).html();
                                                
                                                type = 'static';
                                                
                                                settings.event.preventDefault();
                                                
                                        } else if ( globaloptions.getStaticContentFrom ) {
                                                
                                                source = '';
                                                
                                                data = jQuery(
                                                        globaloptions.getStaticContentFrom
                                                ).html();
                                                
                                                type = 'static';
                                                
                                                settings.event.preventDefault();
                                                
                                        } else {
                                                
                                                settings.doNotOpenModalBoxContent = true;
                                                
                                        }
                                        
                                        
                                        if( !settings.doNotOpenModalBoxContent ){
                                                
                                                openModalBox({
                                                        type : type,
                                                        element : elementObj,
                                                        source : source,
                                                        data : data,
                                                        image : image,
                                                        imageLink : imageLink
                                                });
                                        }
                                        
                                        
                                        if( settings.isFormSubmit ){
                                                return false;
                                        }
                                        
                                }
                        }
                        /************ prepareModalbox - END ************/
                        
                        
                        
                        /************ openModalBox - BEGIN ************/
                        function openModalBox(settings){
                        
                                
                                var settings = jQuery.extend({
                                        type : null,
                                        element : null,
                                        source : null,
                                        data : null,
                                        image : null,
                                        imageLink : null,
                                        prepareCustomWidthOfModalBox : "",
                                        setModalboxClassName : ""
                                }, settings || {} );
                                
                                
                                var prepareNameOfImageLink = methods.cleanupSelectorName({
                                        replaceValue : globaloptions.selectorModalBoxImageLink
                                });
                                
                                var prepareNameOfImageNoLink = methods.cleanupSelectorName({
                                        replaceValue : globaloptions.selectorModalBoxImageNoLink
                                });
                                
                                
                                /* init close events - BEGIN */
                                function callMethodClose(){
                                        methods.close({
                                                callFunctionBeforeHide : globaloptions.callFunctionBeforeHide,
                                                callFunctionAfterHide : globaloptions.callFunctionAfterHide
                                        });
                                }
                                
                                
                                function initCloseEvents(){
                                        
                                        jQuery(
                                                
                                                !globaloptions.disablingClickToClose ? (
                                                        globaloptions.selectorModalbox + " " + globaloptions.selectorModalBoxBodyContent + " " + globaloptions.selectorCloseModalBox + ", " + 
                                                        globaloptions.selectorModalbox + " " + globaloptions.selectorModalBoxCloseButton + " " + globaloptions.selectorCloseModalBox + ", " + 
                                                        globaloptions.selectorModalbox + " " + globaloptions.selectorModalBoxImageNoLink
                                                ) : (
                                                        globaloptions.selectorModalbox + " " + globaloptions.selectorModalBoxBodyContent + " " + globaloptions.selectorCloseModalBox
                                                )
                                                
                                        ).off(
                                                "click"
                                        ).on("click", function(event){
                                                callMethodClose();
                                        });
                                }
                                
                                
                                function initCloseEventsOfFadingLayer()
                                {
                                        if( !globaloptions.disablingClickToClose && !globaloptions.disablingTheOverlayClickToClose )
                                        {
                                                jQuery(
                                                        globaloptions.selectorModalBoxFaderLayer
                                                ).off(
                                                        "click"
                                                ).on("click", function(event){
                                                        callMethodClose();
                                                });
                                        }
                                }
                                /* init close events - END */
                                
                                
                                
                                function centerModalbox()
                                {
                                        methods.center({
                                                positionLeft : globaloptions.positionLeft,
                                                positionTop : globaloptions.positionTop,
                                                minimalTopSpacing : globaloptions.minimalTopSpacing,
                                                effectType_show_modalBox : globaloptions.effectType_show_modalBox
                                        });
                                }
                                
                                
                                
                                jQuery(
                                        globaloptions.selectorModalboxPreCacheContainer
                                ).remove();
                                        
                                        
                                function contentTasksBefore()
                                {
                                
                                        showFadingLayer();
                                        
                                        centerModalbox();
                                
                                }
                                        
                                        
                                function contentTasksAfter()
                                {
                                
                                        showFadingLayer({
                                                callFunctionAfterShow : globaloptions.callFunctionAfterShow
                                        });
                                        
                                        
                                        if( globaloptions.draggable )
                                        {
                                                methods.dragBox();
                                        }
                                        
                                        initCloseEvents();
                                        
                                        initCloseEventsOfFadingLayer();
                                        
                                        centerModalbox();
                                
                                }
                                
                                
                                if( settings.type && globaloptions.callFunctionBeforeShow() )
                                {       
                                        if( settings.source ){
                                                settings.source = methods.addAjaxUrlParameter({
                                                        currentURL : settings.source
                                                });
                                        }
                                        
                                        
                                        if( settings.element ){
                                                
                                                if( jQuery(settings.element).hasClass("large") ){
                                                        settings.setModalboxClassName += 'large';
                                                } else if( jQuery(settings.element).hasClass("medium") ){
                                                        settings.setModalboxClassName += 'medium';
                                                } else if( jQuery(settings.element).hasClass("small") ){
                                                        settings.setModalboxClassName += 'small';
                                                }
                                                
                                                if( jQuery(settings.element).hasClass("emphasis") ){
                                                        settings.setModalboxClassName += ' emphasis';
                                                }
                                        }
                                        
                                        
                                        if( settings.image ){
                                                settings.setModalboxClassName += 'modalBoxSingleImage modalBoxBodyContentImageContainer';
                                        }
                                        
                                        
                                        if( globaloptions.customClassName ){
                                                settings.setModalboxClassName += ' ' + globaloptions.customClassName;
                                        }
                                        
                                        
                                        if( globaloptions.draggable ){
                                                settings.setModalboxClassName += ' modalboxIsDraggable';
                                        }
                                        
                                        
                                        if( globaloptions.disablingClickToClose ){
                                                settings.setModalboxClassName += ' disablingClickToClose';
                                        }
                                        
                                        
                                        if( globaloptions.setWidthOfModalLayer ){
                                                settings.prepareCustomWidthOfModalBox += 'width:' + parseInt( globaloptions.setWidthOfModalLayer ) + 'px; ';
                                        }
                                        
                                        
                                        /*  create Modalbox first - BEGIN */
                                        if( jQuery(globaloptions.selectorModalbox).length == 0 ){
                                                
                                                jQuery(
                                                        "body"
                                                ).append(
                                                        methods.modalboxBuilder({
                                                                customStyles : 'class="' + settings.setModalboxClassName + '" style="' + settings.prepareCustomWidthOfModalBox + '"'
                                                        })
                                                );
                                                
                                        } else {
                                        
                                                methods.clean({
                                                        customClass : settings.setModalboxClassName,
                                                        customWidth : (
                                                                globaloptions.setWidthOfModalLayer ? parseInt( globaloptions.setWidthOfModalLayer ) : null
                                                        )
                                                });
                                                
                                        }
                                        /*  create Modalbox first - END */
                                        
                                        
                                        var modalboxBodyContentContainerbj = jQuery(
                                                globaloptions.selectorModalbox + ' ' + globaloptions.selectorModalBoxBodyContent
                                        );
                                        
                                        
                                        contentTasksBefore();
                                        
                                        
                                        /*~~~ Content Preparer / BEGIN ~~~*/
                                        switch (settings.type) {
                                                        
                                                case 'static': {
                                                        
                                                        jQuery(
                                                                globaloptions.selectorModalBoxAjaxLoader
                                                        ).hide();
                                                        
                                                        modalboxBodyContentContainerbj.html(
                                                                settings.data
                                                        );
                                                        
                                                        contentTasksAfter();
                                                        
                                                        break;
                                                        
                                                } case 'ajax': {
                                                
                                                        jQuery.ajax({
                                                                type : globaloptions.ajax_type,
                                                                url     : settings.source,
                                                                data : settings.data,
                                                                contentType : globaloptions.ajax_contentType,
                                                                success : function(data, textStatus){
                                                                        
                                                                        jQuery(
                                                                                globaloptions.selectorModalBoxAjaxLoader
                                                                        ).fadeOut("fast", function(){
                                                                                
                                                                                modalboxBodyContentContainerbj.html(
                                                                                        data
                                                                                );
                                                                                
                                                                                contentTasksAfter();
                                                                                
                                                                        });
                                                                        
                                                                },
                                                                error : function(XMLHttpRequest, textStatus, errorThrown){
                                                                        
                                                                        ajaxRedirect({ 
                                                                                ar_XMLHttpRequest : XMLHttpRequest,
                                                                                ar_textStatus : textStatus,
                                                                                ar_errorThrown : errorThrown,
                                                                                targetContainer : globaloptions.selectorModalbox + " " + globaloptions.selectorModalBoxBodyContent
                                                                        });
                                                                        
                                                                        contentTasksAfter();
                                                                        
                                                                }
                                                        });
                                                        
                                                        break;
                                                        
                                                } case 'image': {
                                                        
                                                        var imageListObj = jQuery(
                                                                '<img class="modalBoxImagePreload" src="' + settings.image + '" />'
                                                        );
                                                        
                                                        var imageListObjCount = imageListObj.length;
                                                        
                                                        var checkCountImagesLoaded = 0;
                                                        
                                                        
                                                        imageListObj.load(function(response, status, xhr){
                                                                
                                                                if( status == "error" )
                                                                {
                                                                        methods.debugOutput({ 
                                                                                msg : 'Error / ' + xhr.status + ' : ' + xhr.statusText
                                                                        });
                                                                        
                                                                } else {
                                                                        
                                                                        checkCountImagesLoaded++;
                                                                        
                                                                        if( checkCountImagesLoaded == imageListObjCount )
                                                                        {
                                                                                var imageObj = jQuery(
                                                                                        this
                                                                                );
                                                                                
                                                                                jQuery(
                                                                                        globaloptions.selectorModalBoxAjaxLoader
                                                                                ).fadeOut("slow", function(){
                                                                                        
                                                                                        modalboxBodyContentContainerbj.html(
                                                                                                imageObj
                                                                                        );
                                                                                        
                                                                                        var currentImageObject = modalboxBodyContentContainerbj.find(
                                                                                                'img.modalBoxImagePreload'
                                                                                        );
                                                                                        
                                                                                        currentImageObject.removeClass(
                                                                                                "modalBoxImagePreload"
                                                                                        ).addClass(
                                                                                                settings.imageLink ? 
                                                                                                "modalBoxImageLoadingSuccessful" : 
                                                                                                "modalBoxImageLoadingSuccessful " + prepareNameOfImageNoLink
                                                                                        );
                                                                                        
                                                                                        if( settings.imageLink )
                                                                                        {
                                                                                                currentImageObject.attr({
                                                                                                        alt : settings.imageLink
                                                                                                }).wrap(
                                                                                                        '<a class="' + prepareNameOfImageLink + '" href="' + settings.imageLink + '" title="' + settings.imageLink + '"></a>'
                                                                                                );
                                                                                                
                                                                                                jQuery(
                                                                                                        globaloptions.selectorModalbox + " a" + globaloptions.selectorModalBoxImageLink
                                                                                                ).off(
                                                                                                        "click"
                                                                                                ).on("click", function(event){
                                                                                                        
                                                                                                        event.preventDefault();
                                                                                                        
                                                                                                        methods.clean();
                                                                                                        
                                                                                                        centerModalbox();
                                                                                                        
                                                                                                        setTimeout(function(){
                                                                                                                
                                                                                                                location.href = settings.imageLink;
                                                                                                                
                                                                                                        }, 400 );
                                                                                                        
                                                                                                });
                                                                                                
                                                                                        } else {
                                                                                                
                                                                                                currentImageObject.attr({
                                                                                                        alt : globaloptions.localizedStrings["messageCloseWindow"],
                                                                                                        title : globaloptions.localizedStrings["messageCloseWindow"]
                                                                                                });
                                                                                        }
                                                                                        
                                                                                        contentTasksAfter();
                                                                                        
                                                                                });
                                                                        }
                                                                }
                                                                
                                                        }).error(function(){
                                                                
                                                                methods.debugOutput({ 
                                                                        msg : 'Error / ' + globaloptions.localizedStrings["errorMessageImageLoadingFailed"] 
                                                                });
                                                                
                                                                contentTasksAfter();
                                                                
                                                        });
                                                        
                                                        break;
                                                        
                                                }
                                        }
                                        /*~~~ Content Preparer / END ~~~*/
                                        
                                        
                                        
                                }
                        }
                        /************ openModalBox - END ************/
                        
                        
                        
                        /************ showFadingLayer - BEGIN ************/
                        function showFadingLayer(settings){
                                
                                
                                var settings = jQuery.extend({//defaults
                                        isResized : false,
                                        setStyleOfFadingLayer : '',
                                        callFunctionAfterShow : null
                                }, settings || {} );
                                
                                
                                if( jQuery(globaloptions.selectorModalBoxFaderLayer).length == 0 )
                                {
                                        
                                        /* append fading container first - BEGIN */
                                        if( globaloptions.setTypeOfFadingLayer == "white" )
                                        {
                                                settings.setStyleOfFadingLayer = globaloptions.setStylesOfFadingLayer["white"];
                                        } 
                                        else if ( globaloptions.setTypeOfFadingLayer == "black" )
                                        {
                                                settings.setStyleOfFadingLayer = globaloptions.setStylesOfFadingLayer["black"];
                                        } 
                                        else if ( globaloptions.setTypeOfFadingLayer == "custom" && globaloptions.setStylesOfFadingLayer["custom"] )
                                        {
                                                settings.setStyleOfFadingLayer = globaloptions.setStylesOfFadingLayer["custom"];
                                        } 
                                        else //globaloptions.setTypeOfFadingLayer == "disable"
                                        {
                                                settings.setStyleOfFadingLayer = globaloptions.setStylesOfFadingLayer["transparent"];
                                        }
                                        
                                        var prepareNameOfFadingLayer = methods.cleanupSelectorName({
                                                replaceValue : globaloptions.selectorModalBoxFaderLayer
                                        });
                                        
                                        jQuery(
                                                "body"
                                        ).append(
                                                '<div id="' + prepareNameOfFadingLayer + '" style="' + settings.setStyleOfFadingLayer + '"></div>'
                                        );
                                        /* append fading container first - END */
                                        
                                        
                                        /* getGeneratedFaderObj - BEGIN */
                                        var getGeneratedFaderObj = jQuery(
                                                globaloptions.selectorModalBoxFaderLayer
                                        );
                                        
                                        if( globaloptions.setTypeOfFadingLayer == "disable" ){
                                                globaloptions.effectType_show_fadingLayer[0] = ""; // reset to default
                                        }
                                        
                                        switch( globaloptions.effectType_show_fadingLayer[0] ){
                                                
                                                case 'fade' : {
                                                        
                                                        getGeneratedFaderObj.fadeIn( globaloptions.effectType_show_fadingLayer[1], function(){
                                                                methods.center({
                                                                        
                                                                        positionLeft : globaloptions.positionLeft,
                                                                        positionTop : globaloptions.positionTop,
                                                                        minimalTopSpacing : globaloptions.minimalTopSpacing,
                                                                        effectType_show_modalBox : globaloptions.effectType_show_modalBox,
                                                                        
                                                                        isResized : settings.isResized,
                                                                        callFunctionAfterShow : settings.callFunctionAfterShow
                                                                });
                                                        });
                                                        
                                                        break;
                                                        
                                                } default : {
                                                        
                                                        getGeneratedFaderObj.show();
                                                
                                                        methods.center({
                                                                
                                                                positionLeft : globaloptions.positionLeft,
                                                                positionTop : globaloptions.positionTop,
                                                                minimalTopSpacing : globaloptions.minimalTopSpacing,
                                                                effectType_show_modalBox : globaloptions.effectType_show_modalBox,
                                                                
                                                                isResized : settings.isResized,
                                                                callFunctionAfterShow : settings.callFunctionAfterShow
                                                        });
                                                        
                                                        break;
                                                }
                                        };
                                        
                                        
                                        jQuery(window).resize(function(){
                                                
                                                if( getGeneratedFaderObj.is(':visible') )
                                                {
                                                        methods.center({
                                                                
                                                                positionLeft : globaloptions.positionLeft,
                                                                positionTop : globaloptions.positionTop,
                                                                minimalTopSpacing : globaloptions.minimalTopSpacing,
                                                                effectType_show_modalBox : globaloptions.effectType_show_modalBox,
                                                                
                                                                isResized : true
                                                        });
                                                }
                                        });
                                        /* getGeneratedFaderObj - END */
                                        
                                } else {
                                        
                                        methods.center({
                                                
                                                positionLeft : globaloptions.positionLeft,
                                                positionTop : globaloptions.positionTop,
                                                minimalTopSpacing : globaloptions.minimalTopSpacing,
                                                effectType_show_modalBox : globaloptions.effectType_show_modalBox,
                                                
                                                isResized : settings.isResized,
                                                callFunctionAfterShow : settings.callFunctionAfterShow
                                        });
                                        
                                }
                        }
                        /************ showFadingLayer - END ************/
                        
                        
                        
                        /************ ajaxRedirect - BEGIN ************/
                        function ajaxRedirect(settings){


                                var settings = jQuery.extend({// default settings
                                        ar_XMLHttpRequest       : null,
                                        ar_textStatus           : null,
                                        ar_errorThrown          : null,
                                        targetContainer         : null,
                                        ar_enableDebugging      : false
                                }, settings || {} );
                                
                                
                                // ~~~~~~~~~ global settings - BEGIN ~~~~~~~~~ //
                                var XMLHttpRequest = settings.ar_XMLHttpRequest;
                                var textStatus = settings.ar_textStatus;
                                var errorThrown = settings.ar_errorThrown;
                                // ~~~~~~~~~ global settings - END ~~~~~~~~~ //
                                
                                
                                if ( XMLHttpRequest && textStatus != "error" ) {
                                        
                                        if( XMLHttpRequest.status == 403 ){
                                                
                                                var redirect = XMLHttpRequest.getResponseHeader("Location");
                                                if( typeof redirect !== "undefined" ) {
                                                        location.href = redirect;
                                                }
                                                
                                        } else if ( XMLHttpRequest.status == 500 && settings.targetContainer ){
                                                
                                                addErrorMessage({
                                                        errorMessage    : globaloptions.localizedStrings["errorMessageXMLHttpRequest"],
                                                        targetContainer : settings.targetContainer
                                                });
                                        }
                                        
                                        if( settings.ar_enableDebugging )
                                        {
                                               //console.log( "XMLHttpRequest.status: " + XMLHttpRequest.status );
                                        }
                                        
                                } else if ( textStatus == "error" ){
                                        
                                        if ( settings.targetContainer )
                                        {
                                                addErrorMessage({
                                                        errorMessage    : globaloptions.localizedStrings["errorMessageTextStatusError"],
                                                        targetContainer : settings.targetContainer
                                                });
                                        }
                                        
                                        if( settings.ar_enableDebugging )
                                        {
                                               //console.log( "textStatus: " + textStatus );
                                        }
                                        
                                } else {
                                        // no errors
                                }
                                
                                
                                function addErrorMessage(settings){

                                        var settings = jQuery.extend({// default settings
                                                errorMessage    : null,
                                                targetContainer : null
                                        }, settings || {} );
                                        
                                        if( settings.errorMessage && settings.targetContainer ){
                                                
                                                var errorMessageContainer = '<div class="simleModalboxErrorBox"><div class="simleModalboxErrorBoxContent">' + 
                                                        settings.errorMessage + 
                                                '</div></div>';
                                                
                                                jQuery(
                                                        settings.targetContainer
                                                ).removeAttr(
                                                        "style"
                                                ).html( 
                                                        errorMessageContainer 
                                                );
                                                
                                                if( jQuery(settings.targetContainer).parents(globaloptions.selectorModalbox).length > 0 ){
                                                        
                                                        jQuery(
                                                                globaloptions.selectorModalBoxAjaxLoader
                                                        ).remove();
                                                        
                                                        methods.center({
                                                                positionLeft : globaloptions.positionLeft,
                                                                positionTop : globaloptions.positionTop,
                                                                minimalTopSpacing : globaloptions.minimalTopSpacing,
                                                                effectType_show_modalBox : globaloptions.effectType_show_modalBox
                                                        });
                                                }
                                                
                                        }
                                }
                                
                                
                        }
                        /************ ajaxRedirect - END ************/
                        
                        
                },
                /********** init - END **********/
                
                
                
                
                /********** close - BEGIN **********/
                close : function(settings){
                        
                        
                        /*
                                Example / Internal:
                                -----------------------------
                                methods.close();
                                
                                
                                Example / External:
                                -----------------------------
                                jQuery.fn.modalBox('close');
                                
                                
                                Example / External, remove only:
                                -----------------------------
                                jQuery.fn.modalBox(
                                        'close', {
                                                removeOnly : true
                                        }
                                );
                        */
                        
                        
                        var settings = jQuery.extend({
                                removeOnly : false
                        }, settings || {} );
                        
                        
                        // merge the plugin defaults with custom settings
                        settings = jQuery.extend({}, defaults, settings);
                        
                        
                        if( settings.selectorModalBoxFaderLayer && settings.selectorModalbox )
                        {
                                
                                settings.callFunctionBeforeHide();
                                
                                
                                var containerObj = jQuery(
                                        settings.selectorModalBoxFaderLayer + ', ' + settings.selectorModalbox
                                );
                                
                                
                                if( settings.removeOnly )
                                {
                                        
                                        removeLayer( 
                                                containerObj 
                                        );
                                        
                                } else {
                                        
                                        
                                        // reset to default
                                        if( settings.setTypeOfFadingLayer == "disable" )
                                        {
                                                settings.effectType_hide_fadingLayer[0] = "";
                                        }
                                        
                                        
                                        switch ( settings.effectType_hide_fadingLayer[0] )
                                        {
                                                case 'fade' : {
                                                        
                                                        switch ( settings.effectType_hide_modalBox[0] )
                                                        {
                                                                case 'fade' : {
                                                                        
                                                                        jQuery(
                                                                                settings.selectorModalbox
                                                                        ).fadeOut( settings.effectType_hide_modalBox[1], function(){
                                                                                
                                                                                jQuery(
                                                                                        settings.selectorModalBoxFaderLayer
                                                                                ).fadeOut( settings.effectType_hide_fadingLayer[1], function(){
                                                                                        
                                                                                        removeLayer( 
                                                                                                containerObj 
                                                                                        );
                                                                                        
                                                                                });
                                                                        });
                                                                        
                                                                        break;
                                                                        
                                                                } default : {
                                                                        
                                                                        jQuery(
                                                                                settings.selectorModalbox
                                                                        ).hide();
                                                                        
                                                                        jQuery(
                                                                                settings.selectorModalBoxFaderLayer
                                                                        ).fadeOut( settings.effectType_hide_fadingLayer[1], function(){
                                                                                
                                                                                removeLayer( 
                                                                                        containerObj 
                                                                                );
                                                                                
                                                                        });
                                                                        
                                                                        break;
                                                                }
                                                        };
                                                        
                                                        break;
                                                        
                                                } default : {
                                                        
                                                        switch ( settings.effectType_hide_modalBox[0] )
                                                        {
                                                                case 'fade' : {
                                                                        
                                                                        jQuery(
                                                                                settings.selectorModalbox
                                                                        ).fadeOut( settings.effectType_hide_modalBox[1], function(){
                                                                                
                                                                                removeLayer( 
                                                                                        containerObj 
                                                                                );
                                                                                
                                                                        });
                                                                        
                                                                        break;
                                                                        
                                                                } default : {
                                                                        
                                                                        removeLayer( 
                                                                                containerObj 
                                                                        );
                                                                        
                                                                        break;
                                                                }
                                                        };
                                                        
                                                        break;
                                                }
                                        };
                                }
                        }
                        
                        
                        function removeLayer(container){
                                
                                container.remove();
                                
                                settings.callFunctionAfterHide();
                        }
                        
                },
                /********** close - END **********/
                
                
                
                /********** center - BEGIN **********/
                center : function(settings){
                        
                        /*
                                Example / Internal:
                                -----------------------------
                                methods.center();
                                
                                
                                Example / External:
                                -----------------------------
                                jQuery.fn.modalBox('center');
                        */
                        
                        var settings = jQuery.extend({
                                isResized : false,
                                callFunctionAfterShow : null
                        }, settings || {} );
                        
                        // merge the plugin defaults with custom settings
                        settings = jQuery.extend( {}, defaults, settings);
                        
                        
                        var modalboxContainerObj = jQuery(
                                settings.selectorModalbox
                        );
                        
                        
                        if( jQuery(settings.selectorModalboxPreCacheContainer).length == 0 && modalboxContainerObj.length > 0 )
                        {
                                
                                var scrollToTop = false;
                                var positionAttr = 'absolute';
                                
                                var getModalboxContainerWidth = modalboxContainerObj.width();
                                var getModalboxContainerHeight = modalboxContainerObj.height();
                                
                                var setPositionTop = 0;
                                var setPositionLeft = parseInt( 
                                        jQuery(window).width() - getModalboxContainerWidth 
                                ) / 2;
                                
                                
                                if( jQuery("body a.modalBoxTopLink").length == 0 )
                                {
                                        jQuery(
                                                "body"
                                        ).prepend(
                                                '<a class="modalBoxTopLink"></a>'
                                        );
                                }
                                
                                
                                /*~~~ setPositionLeft / BEGIN ~~~*/
                                if( setPositionLeft <= 0 )
                                {
                                        setPositionLeft = 0;
                                }
                                
                                if( settings.positionLeft )
                                {
                                        setPositionLeft = settings.positionLeft + 'px';
                                } else {
                                        setPositionLeft = setPositionLeft + 'px';
                                }
                                /*~~~ setPositionLeft / END ~~~*/
                                
                                
                                /*~~~ setPositionTop / BEGIN ~~~*/
                                if( settings.positionTop )
                                {
                                        
                                        setPositionTop = parseInt( 
                                                jQuery(window).height() - getModalboxContainerHeight
                                        );
                                        
                                        if( setPositionTop > parseInt( settings.positionTop ) )
                                        {
                                                positionAttr = 'fixed';
                                        }
                                        
                                        setPositionTop = settings.positionTop + 'px';
                                
                                } else {
                                        
                                        setPositionTop = parseInt( jQuery(window).height() - getModalboxContainerHeight - 70 ) / 2;
                                        
                                        if( setPositionTop <= 0 )
                                        {
                                                setPositionTop = settings.minimalTopSpacing + 'px';
                                                scrollToTop = true;
                                                
                                        } else {
                                                
                                                setPositionTop = setPositionTop + 'px';
                                                positionAttr = 'fixed';
                                        }
                                }
                                /*~~~ setPositionTop / END ~~~*/
                                
                                
                                
                                /*~~~ initLastSteps / BEGIN ~~~*/
                                function initLastSteps()
                                {
                                        
                                        if( scrollToTop && !modalboxContainerObj.hasClass("modalboxScrollingSuccessfully") )
                                        {
                                                
                                                modalboxContainerObj.addClass(
                                                        "modalboxScrollingSuccessfully"
                                                );
                                                
                                                methods.scrollTo();
                                        }
                                        
                                        if( !settings.isResized && settings.callFunctionAfterShow )
                                        {
                                                settings.callFunctionAfterShow();
                                        }
                                }
                                /*~~~ initLastSteps / END ~~~*/
                                
                                
                                
                                /*~~~ initPositioning / BEGIN ~~~*/
                                switch( settings.effectType_show_modalBox[0] )
                                {
                                        case 'fade' : {
                                                
                                                if( modalboxContainerObj.hasClass("modalboxFadingSuccessfully") ){
                                                        
                                                        modalboxContainerObj.css({
                                                                position        : positionAttr,
                                                                left            : setPositionLeft,
                                                                top                     : setPositionTop,
                                                                display         : "block",
                                                                visibility      : "visible"
                                                        });
                                                        
                                                        initLastSteps();
                                                        
                                                } else {
                                                        
                                                        // classic fadeIn - problems with transparency in ie browsers
                                                        modalboxContainerObj.css({
                                                                
                                                                position        : positionAttr,
                                                                left            : setPositionLeft,
                                                                top                     : setPositionTop,
                                                                visibility      : "visible"
                                                                
                                                        }).fadeIn( settings.effectType_show_modalBox[1] , function(){
                                                        
                                                                jQuery(
                                                                        this
                                                                ).addClass(
                                                                        "modalboxFadingSuccessfully"
                                                                );
                                                                
                                                                initLastSteps();
                                                                
                                                        });
                                                }
                                                
                                                break;
                                                
                                        } default : {
                                                
                                                modalboxContainerObj.css({
                                                        position        : positionAttr,
                                                        left            : setPositionLeft,
                                                        top                     : setPositionTop,
                                                        display         : "block",
                                                        visibility      : "visible"
                                                });
                                                
                                                initLastSteps();
                                                
                                                break;
                                        }
                                };
                                /*~~~ initPositioning / END ~~~*/
                                
                                
                        }
                        
                },
                /********** center - END **********/
                
                
                
                /********** clean - BEGIN **********/
                clean : function(settings){
                        
                        /*
                                Example / Internal:
                                -----------------------------
                                methods.clean();
                                
                                methods.clean({
                                        customClass : 'myCustomClass',
                                        customWidth : 400
                                });
                                
                                
                                Example / External:
                                -----------------------------
                                jQuery.fn.modalBox('clean');
                                
                                jQuery.fn.modalBox('clean', {
                                        customClass : 'myCustomClass',
                                        customWidth : 400
                                });
                        */
                        
                        var settings = jQuery.extend({
                                customClass : null,
                                customWidth : null // must be integer
                        }, settings || {} );
                        
                        
                        // merge the plugin defaults with custom settings
                        settings = jQuery.extend( {}, defaults, settings);
                        
                        
                        if( settings.selectorModalbox && settings.selectorModalBoxBodyContent ){
                                
                                var prepareNameOfAjaxLoader = methods.cleanupSelectorName({
                                        replaceValue: settings.selectorModalBoxAjaxLoader
                                });
                                
                                var getModalbox = jQuery(
                                        settings.selectorModalbox
                                );
                                
                                
                                if( settings.customClass )
                                {
                                        getModalbox.removeClass(
                                                getModalbox.attr(
                                                        "class"
                                                )
                                        ).addClass(
                                                settings.customClass
                                        );
                                }
                                
                                
                                if( settings.customWidth )
                                {
                                        getModalbox.width(
                                                settings.customWidth
                                        );
                                }
                                
                                
                                jQuery(
                                        settings.selectorModalBoxBodyContent
                                ).html(
                                        '<div id="' + prepareNameOfAjaxLoader + '">' + settings.localizedStrings["messageAjaxLoader"] + '</div>'
                                );
                        }
                        
                },
                /********** clean - END **********/
                
                
                
                /************ scrollTo - BEGIN ************/
                scrollTo : function(settings){
                        
                        /*
                                Example:
                                -----------------------------
                                methods.scrollTo({
                                        targetElement : "#footer"
                                });
                        */
                        
                        var settings = jQuery.extend({// default settings
                                targetElement   : "a.modalBoxTopLink",
                                typeOfAnimation : 'swing', // options: linear, swing, easing
                                animationSpeed  : 800,
                                callAfterSuccess : function(){}
                        }, settings || {} );
                        
                        
                        if( settings.targetElement )
                        {
                                
                                jQuery(
                                        "html"
                                ).stop().animate({ 
                                        
                                        scrollTop : jQuery(
                                                settings.targetElement
                                        ).offset().top 
                                        
                                }, settings.animationSpeed, settings.typeOfAnimation, function(){
                                        
                                        // Animation complete.
                                        settings.callAfterSuccess();
                                        
                                });
                                
                        }
                },
                /************ scrollTo - END ************/
                
                
                
                
                /********** isImageSource - BEGIN **********/
                isImageSource : function(settings){
                        
                        
                        /*
                                Example:
                                -----------------------------
                                var isImage = methods.isImageSource({
                                        src : 'http://www.yourdomain.com/demopicture_kalexis_newzealand_6930.JPG'
                                });
                        */
                        
                        
                        var settings = jQuery.extend({
                                src : null,
                                returnValue : false
                        }, settings || {} );
                        
                        
                        var currentSource = settings.src.toLowerCase();
                        
                        if( currentSource.indexOf(".gif") != -1 || currentSource.indexOf(".jpg") != -1 || currentSource.indexOf(".png") != -1 ){
                                settings.returnValue = true;
                        }
                        
                        return settings.returnValue;
                        
                },
                /********** isImageSource - END **********/
                
                
                
                
                /********** extractImageLink - BEGIN **********/
                extractImageLink : function(settings){
                        
                        
                        /*
                                Example:
                                -----------------------------
                                var extractImageLink = methods.extractImageLink({
                                        src : 'http://www.yourdomain.com/demopicture_kalexis_newzealand_6930.JPG?link[http://www.steffenhollstein.de]'
                                });
                        */
                        
                        
                        var settings = jQuery.extend({
                                src : null,
                                splitValuePrefix : "link[",
                                splitValueSuffix : "]",
                                returnValue : ""
                        }, settings || {} );
                        
                        
                        var currentSource = settings.src.toLowerCase();
                        
                        if( currentSource.indexOf(settings.splitValuePrefix) != -1 && currentSource.indexOf(settings.splitValueSuffix) != -1 ){
                                
                                currentSource = currentSource.split(
                                        settings.splitValuePrefix
                                );
                                
                                currentSource = currentSource[1].split(
                                        settings.splitValueSuffix
                                );
                                
                                settings.returnValue = currentSource[0];
                        }
                        
                        return settings.returnValue;
                        
                },
                /********** extractImageLink - END **********/
                
                
                
                
                /********** cleanupSelectorName - BEGIN **********/
                cleanupSelectorName : function(settings){
                        
                        var settings = jQuery.extend({
                                replaceValue : ''
                        }, settings || {} );
                        
                        var currentReturnValue  = settings.replaceValue;
                        currentReturnValue              = currentReturnValue.replace(/[#]/g, "");
                        currentReturnValue              = currentReturnValue.replace(/[.]/g, "");
                        
                        return currentReturnValue;
                        
                },
                /********** cleanupSelectorName - END **********/
                
                
                
                
                /********** dragBox - BEGIN **********/
                dragBox : function(settings){
                        
                        //inspired by http://aktuell.de.selfhtml.org/artikel/javascript/draganddrop/
                        
                        var settings = jQuery.extend({
                                dragObject : null,
                                dragObjectPosX : 0,
                                dragObjectPosY : 0,
                                documentPosX : 0,
                                documentPosY : 0
                        }, settings || {} );
                        
                        // merge the plugin defaults with custom settings
                        settings = jQuery.extend({}, defaults, settings);
                        
                        
                        function moveObject(obj) {
                                
                                settings.dragObject = obj; // overwrite settings.dragObject
                                
                                settings.dragObjectPosX = (
                                        settings.documentPosX - settings.dragObject.offsetLeft
                                );
                                
                                settings.dragObjectPosY = (
                                        settings.documentPosY - settings.dragObject.offsetTop
                                );
                        }

                        
                        jQuery(
                                document
                        ).mousemove(function(event){
                                
                                settings.documentPosX = event.pageX;
                                settings.documentPosY = event.pageY;
                                
                                if (settings.dragObject) {
                                        jQuery(settings.dragObject).css({
                                                left : (settings.documentPosX - settings.dragObjectPosX) + "px",
                                                top : (settings.documentPosY - settings.dragObjectPosY) + "px"
                                        });
                                }
                        });
                        
                        
                        jQuery(
                                settings.selectorModalbox + " .modalboxStyleContainer_surface_top, " + 
                                settings.selectorModalbox + " .modalboxStyleContainer_surface_bottom"
                        ).off(
                                "mousedown"
                        ).on("mousedown", function(event){
                                
                                if (event.type == 'mousedown')
                                {
                                        jQuery(
                                                settings.selectorModalbox
                                        ).off(
                                                'mousemove mouseup' // unbind events before init
                                        ).on('mousemove mouseup', function(event){
                                                
                                                var thisObj = jQuery(this);
                                                
                                                if( thisObj.is(":visible") ){
                                                        
                                                        if (event.type == 'mousemove') {
                                                                
                                                                moveObject(
                                                                        this
                                                                );
                                                                
                                                        } else if (event.type == 'mouseup') {
                                                                
                                                                settings.dragObject = null;
                                                                
                                                                thisObj.off(
                                                                        'mousemove'
                                                                );
                                                        }
                                                }
                                                
                                        });
                                        
                                }
                                
                        });
                        
                },
                /********** dragBox - END **********/
                
                
                
                
                /************ addAjaxUrlParameter - BEGIN ************/
                addAjaxUrlParameter : function(settings){


                        var settings = jQuery.extend({// default settings
                                currentURL                      : '',
                                addParameterName        : 'ajaxContent',
                                addParameterValue       : 'true'
                        }, settings || {} );
                        
                        var currentURL = settings.currentURL;
                                
                        if( currentURL.indexOf(settings.addParameterName) != -1){
                                currentURL = currentURL;
                        } else {
                                if( currentURL.indexOf("?") != -1){
                                        var currentSeparator = "&";
                                } else {
                                        var currentSeparator = "?";
                                }
                                currentURL = currentURL + currentSeparator + settings.addParameterName + '=' + settings.addParameterValue;
                        }
                        
                        return currentURL;
                        
                },
                /************ addAjaxUrlParameter - END ************/
                
                
                
                
                /********** precache - BEGIN **********/
                precache : function(settings){
                        
                        // merge the plugin defaults with custom settings
                        var settings = jQuery.extend({}, defaults, settings);
                        
                        if( settings.selectorModalboxPreCacheContainer ){
                                if( jQuery(settings.selectorModalboxPreCacheContainer).length == 0 ){
                                        
                                        var prepareNameOfPreCacheContainer = methods.cleanupSelectorName({
                                                replaceValue : settings.selectorModalboxPreCacheContainer
                                        });
                                        
                                        var createModalboxContainer = methods.modalboxBuilder();
                                        
                                        var preCacheContainer = '';
                                        preCacheContainer += '<div id="' + prepareNameOfPreCacheContainer + '" style="position:absolute; left:-9999px; top:-9999px;">';
                                                preCacheContainer += createModalboxContainer;
                                        preCacheContainer += '</div>';
                                        
                                        jQuery("body").append(preCacheContainer);
                                        
                                        jQuery(settings.selectorModalbox).show();
                                }
                        }
                        
                },
                /********** precache - END **********/
                
                
                
                /********** modalboxBuilder - BEGIN **********/
                modalboxBuilder : function(settings){
                        
                        var settings = jQuery.extend({
                                customStyles : ''
                        }, settings || {} );
                
                        
                        // merge the plugin defaults with custom options
                        settings = jQuery.extend({}, defaults, settings);
                        
                        
                        var prepareNameOfModalboxContainer = methods.cleanupSelectorName({
                                replaceValue : settings.selectorModalbox
                        });
                        
                        var prepareNameOfModalboxBodyContainer = methods.cleanupSelectorName({
                                replaceValue : settings.selectorModalBoxBody
                        });
                        
                        var prepareNameOfModalboxContentContainer = methods.cleanupSelectorName({
                                replaceValue : settings.selectorModalBoxBodyContent
                        });
                        
                        var prepareNameOfCloseButtonContainer = methods.cleanupSelectorName({
                                replaceValue : settings.selectorModalBoxCloseButton
                        });
                        
                        var prepareNameOfAjaxLoader = methods.cleanupSelectorName({
                                replaceValue : settings.selectorModalBoxAjaxLoader
                        });
                        
                        var prepareNameOfCloseModalBox = methods.cleanupSelectorName({
                                replaceValue : settings.selectorCloseModalBox
                        });
                        
                        
                        var createModalboxContainer = '';
                        createModalboxContainer += '<div id="' + prepareNameOfModalboxContainer + '"' + settings.customStyles + '>';
                                createModalboxContainer += '<div id="' + prepareNameOfModalboxBodyContainer + '">';
                                        createModalboxContainer += settings.setModalboxLayoutContainer_Begin;
                                                
                                                createModalboxContainer += '<div class="' + prepareNameOfModalboxContentContainer + '">';
                                                        createModalboxContainer += '<div id="' + prepareNameOfAjaxLoader + '">' + settings.localizedStrings["messageAjaxLoader"] + '</div>';
                                                createModalboxContainer += '</div>';
                                                
                                        createModalboxContainer += settings.setModalboxLayoutContainer_End;
                                        createModalboxContainer += '<div id="' + prepareNameOfCloseButtonContainer + '"><a href="javascript:void(0);" class="' + prepareNameOfCloseModalBox + '"><span class="' + prepareNameOfCloseModalBox + '">' + settings.localizedStrings["messageCloseWindow"] + '</span></a></div>';
                                createModalboxContainer += '</div>';
                        createModalboxContainer += '</div>';
                        
                        return createModalboxContainer;
                        
                },
                /********** modalboxBuilder - END **********/
                
                
                
                /************ debugOutput - BEGIN ************/
                debugOutput : function(settings){
                
                        /*
                                Example:
                                -----------------------
                                <script type="text/javascript">
                                        try {
                                                if( blafasel ){ 
                                                        alert("tester"); 
                                                }
                                        } catch (error) {
                                                methods.debugOutput({ 
                                                        msg : error 
                                                });
                                        }
                                </script>
                        */
                        
                        var settings = jQuery.extend({//default settings
                                msg : null
                        }, settings || {} );
                        
                        
                        // merge the plugin defaults with custom options
                        settings = jQuery.extend({}, defaults, settings);
                        
                        
                        if( settings.debug && settings.msg && ( ("console" in window) && ("firebug" in console) ) ){
                                
                                if( typeof(settings.msg) == "object" ){
                                        
                                        console.info( 
                                                settings.msg
                                        );
                                        
                                } else {
                                        
                                        if( settings.msg.trim() != '' ){
                                                
                                                console.debug( 
                                                        settings.debugOuputMessagePrefix + settings.msg
                                                );
                                                
                                        } else {
                                                
                                                console.debug( 
                                                        settings.msg
                                                );
                                        }
                                        
                                }
                                
                        }
                }
                /************ debugOutput - END ************/
                
                
                
        };
        
        
        jQuery.fn.modalBox = function( method ) {
                // Method calling logic
                if ( methods[method] ) {
                        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
                } else if ( typeof method === 'object' || ! method ) {
                        return methods.init.apply( this, arguments );
                } else {
                        jQuery.error( 'Method ' +       method + ' does not exist on jQuery.modalBox' );
                }               
        };
        
        
        jQuery(document).ready(function(){//default Initializing
                
                jQuery.fn.modalBox(
                        "precache"
                );
                
                jQuery(
                        ".openmodalbox"
                ).modalBox();
                
        });
        
        
})(jQuery);
