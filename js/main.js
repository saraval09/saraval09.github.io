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
jQuery(document).ready(function($) {

    $('#myCarousel').carousel({
        interval: 5000
    });

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            jQuery('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
        var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-'+id).html());
    });
});

/*$(document).ready(function() {
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
}*/




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

