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

    $(document).ready(function(){
        $("a[rel^='prettyPhoto']").prettyPhoto();
    });

$(document).ready(function(){
    $("area[rel^='prettyPhoto']").prettyPhoto();

    $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: true});
    $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});

    $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
        custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
        changepicturecallback: function(){ initialize(); }
    });

    $("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
        custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
        changepicturecallback: function(){ _bsap.exec(); }
    });
});


/**Google Map**/
function initialize() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
}

/*function initMap() {
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
}*/

