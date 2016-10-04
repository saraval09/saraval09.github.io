/**AngularJS**/

var app = angular.module('ericWebApp', [
    'ngRoute'
]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        // Pages
        .when("/bio", {templateUrl: "partials/bio.html", controller: "PageCtrl"})
        .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
        .when("/images", {templateUrl: "partials/images.html", controller: "PageCtrl"})
        .when("/videos", {templateUrl: "partials/videos.html", controller: "PageCtrl"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


/**Images**/

$(document).ready(function() {
    $(".gallery_thumbnails a").click(function(e){
        //Disable the links
        e.preventDefault();
        //Create var to hold the links from the thumbnail
        var photo_fullview = $(this).attr("href");
        //Create our preview link
        var photo_preview = photo_fullview.replace("_fullview", "_preview");
        //Fade out the preview area
        $(".gallery_preview").fadeOut(500, function(){
            //Preload our clicked image
            $(".gallery_preload_area").html('<img src="'+photo_preview+'" />');

            //Once image is preloaded then we can use it

            $(".gallery_preload_area img").imgpreload(function(){

                //Change the picture and link for the preview area
                $(".gallery_preview").html('<a class="overlayLink" href="'+photo_fullview+'" style="background-image:url('+photo_preview+')"</a>');
                //Fade Back in the preview window
                $(".gallery_preview").fadeIn(500);
                setFancyBoxLinks();
                updateThumbnails();
            });
        });
    });//end of click

    //Create first variables
    var first_photo_fullview= $(".gallery_thumbnails a").first().attr("href");
    var first_photo_preview=first_photo_fullview.replace("_fullview", "_preview");

    $(".gallery_preview").html('<a class="overlayLink" " href="'+first_photo_fullview+'" style="background-image:url('+first_photo_preview+');"></a>');
    setFancyBoxLinks();
    updateThumbnails();

}); //end of ready

function setFancyBoxLinks(){
    $("a.overlayLink").fancybox({
        'overlayColor': '#000',
        'overlayOpacity':.8 ,
        'transitionIn':'elastic',
        'transitionOut':'elastic',
        'autoScale': true
    });
}

function updateThumbnails(){

    $(".gallery_thumbnails a").each(function(index){

        if($(".gallery_preview a").attr("href")==$(this).attr("href")){
            //If the anchor tag is the same as the preview anchor
            //Shade the thumbnail and give it a class of selected
            $(this).addClass("selected");
            $(this).children().fadeTo(250, .4);
        }else{
            //Remove the selected class and fade up to 100%
            $(this).removeClass("selected");
            $(this).children().css("opacity", "1");
        }
    });
}

/**Music**/

(function(){
    var isIE = (/msie (6|7|8)/i).test(navigator.userAgent) && !(/opera/i).test(navigator.userAgent);

    var soundcloud = window.soundcloud = {
        version: "0.1",
        debug: false,
        _listeners: [],
        // re-dispatches widget events in the DOM, using JS library support, the events also should bubble up the DOM
        _redispatch: function(eventType, flashId, data) {
            var playerNode,
                lsnrs  = this._listeners[eventType] || [],
                // construct the custom eventType  e.g. 'soundcloud:onPlayerReady'
                customEventType = 'soundcloud:' + eventType;

            try{
                // find the flash player, might throw an exception
                playerNode = this.getPlayer(flashId);
            }catch(e){
                if(this.debug && window.console){
                    console.error('unable to dispatch widget event ' + eventType + ' for the widget id ' + flashId, data, e);
                }
                return;
            }
            // re-dispatch SoundCloud events up in the DOM
            if(window.jQuery){
                // if jQuery is available, trigger the custom event
                jQuery(playerNode).trigger(customEventType, [data]);
            }else if(window.Prototype){
                // if Prototype.js is available, fire the custom event
                $(playerNode).fire(customEventType, data);
            }else{
                // TODO add more JS libraries that support custom DOM events
            }
            // if there are any listeners registered to this event, trigger them all
            for(var i = 0, l = lsnrs.length; i < l; i += 1) {
                lsnrs[i].apply(playerNode, [playerNode, data]);
            }
            // log the events in debug mode
            if(this.debug && window.console){
                console.log(customEventType, eventType, flashId, data);
            }

        },
        // you can add multiple listeners to a certain event
        // e.g. soundcloud.addEventListener('onPlayerReady', myFunctionOne);
        //      soundcloud.addEventListener('onPlayerReady', myFunctionTwo);
        addEventListener: function(eventType, callback) {
            if(!this._listeners[eventType]){
                this._listeners[eventType] = [];
            }
            this._listeners[eventType].push(callback);
        },
        // you can also remove the function listener if e.g you want to trigger it only once
        // soundcloud.removeEventListener('onMediaPlay', myFunctionOne);
        removeEventListener: function(eventType, callback) {
            var lsnrs = this._listeners[eventType] || [];
            for(var i = 0, l = lsnrs.length; i < l; i += 1) {
                if(lsnrs[i] === callback){
                    lsnrs.splice(i, 1);
                }
            }
        },
        // get widget node based on its id (if object tag) or name (if embed tag)
        // if you're using SWFObject or other dynamic Flash generators, please make sure that you set the id parameter
        //  only if the DOM has an id/name it's possible to call player's methods.
        // Important!: because of the bug in Opera browser, the Flash can't get its own id
        // so the generator should set it additionally through flashvars parameter 'object_id'
        getPlayer: function(id){
            var flash;
            try{
                if(!id){
                    throw "The SoundCloud Widget DOM object needs an id atribute, please refer to SoundCloud Widget API documentation.";
                }
                flash = isIE ? window[id] : document[id];
                if(flash){
                    if(flash.api_getFlashId){
                        return flash;
                    }else{
                        throw "The SoundCloud Widget External Interface is not accessible. Check that allowscriptaccess is set to 'always' in embed code";
                    }
                }else{
                    throw "The SoundCloud Widget with an id " + id + " couldn't be found";
                }
            }catch(e){
                if (console && console.error) {
                    console.error(e);
                }
                throw e;
            }
        },
        // fired when widget has loaded its data and is ready to accept calls from outside
        // the widget will call these functions only if in it's flashvars there's a parameter enable_api=true
        // @flashId: the widget id, basically the Flash node should be accessible to JS with soundcloud.getPlayer(flashId)
        // @data: an object containing .mediaUri (eg. 'http://api.soundcloud.com/tracks/49931') .mediaId (e.g. '4532')
        // in buffering events data contains also .percent = (e.g. '99')
        onPlayerReady: function(flashId, data) {
            this._redispatch('onPlayerReady', flashId, data);
        },
        // fired when widget starts playing current track (fired only once per track)
        onMediaStart : function(flashId, data) {
            this._redispatch('onMediaStart', flashId, data);
        },
        // fired when the track/playlist has finished playing
        onMediaEnd : function(flashId, data) {
            this._redispatch('onMediaEnd', flashId, data);
        },
        // fired when widget starts playing current track (fired on every play, seek)
        onMediaPlay : function(flashId, data) {
            this._redispatch('onMediaPlay', flashId, data);
        },
        // fired when track was paused
        onMediaPause : function(flashId, data) {
            this._redispatch('onMediaPause', flashId, data);
        },
        // fired when the widget is still buffering, means you can't seek in the track fully yet
        onMediaBuffering : function(flashId, data) {
            this._redispatch('onMediaBuffering', flashId, data);
        },
        // fired when the user seeks in the track
        onMediaSeek : function(flashId, data) {
            this._redispatch('onMediaSeek', flashId, data);
        },
        // fired when the widget is done buffering and the whole track length is seekable
        onMediaDoneBuffering : function(flashId, data) {
            this._redispatch('onMediaDoneBuffering', flashId, data);
        },
        // fired when the widget can't get the requested data from the server (the resource is removed, hidden, etc.)
        onPlayerError : function(flashId, data) {
            this._redispatch('onPlayerError', flashId, data);
        }
    };

})();

/**Google Map**/
function initMap() {
    function init_map() {
        var myOptions = {
            zoom:10,center:new google.maps.LatLng(27.044224,-82.23592539999999),mapTypeId: google.maps.MapTypeId.SATELLITE
        };
    }
    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

    marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(27.044224,-82.23592539999999)});

    infowindow = new google.maps.InfoWindow({content:'<strong>X</strong><br>North port<br>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
