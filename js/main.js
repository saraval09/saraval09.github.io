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
            "name": "Symphonica (Thibault Remix)",
            "artist": "Thibault",
            "album": "Nicky Romero Remixes",
            "url": "https://soundcloud.com/thibaultmusic/nicky-romero-symphonica",
            "cover_art_url": "images/song_NickyRomero-SymphonicaThibaultRemix.jpg"
        },
        {
            "name": "Emulator",
            "artist": "The Crystal Method",
            "album": "Emulator (Single)",
            "url": "https://soundcloud.com/the-crystal-method/emulator",
            "cover_art_url": "images/song_TheCrystalMethod-Emulator.jpg"
        },
        {
            "name": "Burial feat. Pusha T",
            "artist": "Yogi",
            "album": "YOGI",
            "url": "https://soundcloud.com/yogitrf/yogi-burial-feat-pusha-t",
            "cover_art_url": "images/song_YogiBurial.jpg"
        }
    ],
    "soundcloud_client": '7f4a6ed1488c1ebdf31600767b9b6350',
    "default_album_art": "images/no-cover-large.png",
    "use_visualizations": true,
    "visualization_backup": "album-art",
    "preload": "auto"
});

Amplitude.registerVisualization( MichaelBromleyVisualization, {
    width: '370',
    height: '370'
} );

var expanded = true;
var playlistEpxanded = true;
/*
 Set fully expanded defaults
 */
$('.hidden-on-collapse').show();
$('.hidden-on-expanded').hide();

$('#small-player').css('border-top-left-radius', '0px');
$('#small-player').css('border-top-right-radius', '0px');

$('#small-player-playlist').show();

$('#small-player').css('border-bottom-left-radius', '0px');
$('#small-player').css('border-bottom-right-radius', '0px');

$('#visualization').css('border-bottom-left-radius', '0px');
$('#visualization').css('border-bottom-right-radius', '0px');
/*
 jQuery Visual Helpers
 */
$('#small-player').hover(function(){
    $('#small-player-middle-controls').show();
    $('#small-player-middle-meta').hide();
}, function(){
    $('#small-player-middle-controls').hide();
    $('#small-player-middle-meta').show();

});

$('#visualization').hover(function(){
    $('#top-header').show();
    $('#small-player').show();
}, function(){
    if( !$('#top-header').is(':hover') && !$('#small-player').is(':hover') ){
        $('#top-header').fadeOut(1000);
        $('#small-player').fadeOut(1000);
    }
});

$('#top-header').hover(function(){
    $('#top-header').show();
    $('#small-player').show();
}, function(){

});

/*
 Toggles Album Art
 */
$('#small-player-toggle').click(function(){
    $('.hidden-on-collapse').show();
    $('.hidden-on-expanded').hide();
    /*
     Is expanded
     */
    expanded = true;

    $('#small-player').css('border-top-left-radius', '0px');
    $('#small-player').css('border-top-right-radius', '0px');
});

$('#top-header-toggle').click(function(){
    $('.hidden-on-collapse').hide();
    $('.hidden-on-expanded').show();
    /*
     Is collapsed
     */
    expanded = false;

    $('#small-player').css('border-top-left-radius', '5px');
    $('#small-player').css('border-top-right-radius', '5px');
});

$('.playlist-toggle').click(function(){
    if( playlistEpxanded ){
        $('#small-player-playlist').hide();

        $('#small-player').css('border-bottom-left-radius', '5px');
        $('#small-player').css('border-bottom-right-radius', '5px');

        $('#visualization').css('border-bottom-left-radius', '5px');
        $('#visualization').css('border-bottom-right-radius', '5px');

        playlistEpxanded = false;
    }else{
        $('#small-player-playlist').show();

        $('#small-player').css('border-bottom-left-radius', '0px');
        $('#small-player').css('border-bottom-right-radius', '0px');

        $('#visualization').css('border-bottom-left-radius', '0px');
        $('#visualization').css('border-bottom-right-radius', '0px');

        playlistEpxanded = true;
    }
})

/**Google Map**/
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
