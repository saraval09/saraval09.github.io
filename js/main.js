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

Amplitude.init({
    "songs": [
        {
            "name": "Living Proof",
            "artist": "Gregory Alan Isakov",
            "album": "The Weatherman",
            "url": "http://a1537.phobos.apple.com/us/r30/Music4/v4/60/af/eb/60afeba7-f8d9-a920-ff5b-b8666fdc2de4/mzaf_3379426683594665460.plus.aac.p.m4a",
            "live": false,
            "cover_art_url": "images/theweatherman.jpg"
        },
        {
            "name": "Rooms",
            "artist": "Mia and Jonah",
            "album": "Rooms For Adelaide",
            "url": "http://a656.phobos.apple.com/us/r30/Music/2d/d1/52/mzm.oymgnziu.aac.p.m4a",
            "live": false,
            "cover_art_url": "images/roomsforadelaide.jpg"
        },
        {
            "name": "Suburban War",
            "artist": "The Arcade Fire",
            "album": "The Suburbs",
            "url": "https://p.scdn.co/mp3-preview/f5b1bef707e8be7052a1efa5a39555c48e913d36",
            "live": false,
            "cover_art_url": "images/thesuburbs.jpeg"
        },
        {
            "name": "Amsterdam",
            "artist": "Gregory Alan Isakov",
            "album": "The Weatherman",
            "url": "http://a464.phobos.apple.com/us/r30/Music4/v4/4d/94/69/4d9469df-4b5c-31e1-a1b1-bc5b3421cb2d/mzaf_1227645205170517026.plus.aac.p.m4a",
            "live": false,
            "cover_art_url": "images/theweatherman.jpg"
        },
        {
            "name": "Saint Valentine",
            "artist": "Gregory Alan Isakov",
            "album": "The Weatherman",
            "url": "http://a1105.phobos.apple.com/us/r30/Music4/v4/2a/23/1d/2a231dec-3efb-f7a8-b190-b26f0790e8a6/mzaf_1799531085554015341.plus.aac.p.m4a",
            "live": false,
            "cover_art_url": "images/theweatherman.jpg"
        },
        {
            "name": "Second Chances",
            "artist": "Gregory Alan Isakov",
            "album": "The Weatherman",
            "url": "http://a1766.phobos.apple.com/us/r30/Music4/v4/de/2c/ae/de2caeb2-67a2-b19f-2b7e-f3aa38f69bfa/mzaf_4842981864723411733.plus.aac.p.m4a",
            "live": false,
            "cover_art_url": "images/theweatherman.jpg"
        },
        {
            "name": "City WIth No Children",
            "artist": "The Arcade Fire",
            "album": "The Suburbs",
            "url": "http://a1086.phobos.apple.com/us/r1000/099/Music/v4/6c/35/c3/6c35c369-b2c7-053d-04c3-6345bf9b62dd/mzaf_2986025997008722081.m4a",
            "live": false,
            "cover_art_url": "images/thesuburbs.jpeg"
        }
    ],
    "default_album_art": "images/no-cover-large.png",
    "callbacks": {
        "after_init": "album_change",
        "after_album_change": "album_change",
        "after_song_ended": "album_change"
    }
});

function album_change(){
    var activeSong = Amplitude.getActiveSongMetadata();

    $('.album-display').hide();
    $('.album-container').removeClass('active-album-container');

    switch( activeSong.album ){
        case 'The Weatherman':
            $('.the-weatherman-display').show();
            $('.the-weatherman').addClass('active-album-container');
            break;
        case 'Rooms For Adelaide':
            $('.rooms-for-adelaide-display').show();
            $('.rooms-for-adelaide').addClass('active-album-container');
            break;
        case 'The Suburbs':
            $('.the-suburbs-display').show();
            $('.the-suburbs').addClass('active-album-container');
            break;
    }
}
$('.album-container').click(function(){
    $('.album-display').hide();
    $('.album-container').removeClass('active-album-container');

    if( $(this).hasClass('the-weatherman') ){
        $('.the-weatherman-display').show();
        $('.the-weatherman').addClass('active-album-container');
    }

    if( $(this).hasClass('rooms-for-adelaide') ){
        $('.rooms-for-adelaide-display').show();
        $('.rooms-for-adelaide').addClass('active-album-container');
    }

    if( $(this).hasClass('the-suburbs') ){
        $('.the-suburbs-display').show();
        $('.the-suburbs').addClass('active-album-container');
    }
});

/**Google Map**/
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
