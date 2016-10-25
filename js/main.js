/**AngularJS**/
(function() {
var app = angular.module('ericWebApp', [
    'ngRoute'
]);

    /** Navigation Bar **/

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html", controller: 'homeController'})
        // Pages
        .when("/bio", {templateUrl: "partials/bio.html"})
        .when("/contact", {templateUrl: "partials/contact.html"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html"});
}]);
    /** Header **/
    app.directive('header', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {user: '='},
            templateUrl: "../templates/header.html"
        }
    });

    /** Footer **/
    app.directive('footer', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "../templates/footer.html"
        }
    });



    /** Images and Videos **/

app.controller('homeController', ['$scope','$sce', function($scope,$sce) {
    $scope.data={

        /** Main Images **/
        images: ['img/img1_preview.jpg', 'img/img2_preview.jpg', 'img/img3_preview.jpg',
            'img/img4_preview.jpg', 'img/img5_preview.jpg', 'img/img6_preview.jpg'
        ],

        /** Main Videos **/
        videos: ['http://www.youtube.com/embed/SjGZoALjiLQ', 'http://www.youtube.com/embed/emel6lFmYPI', 'http://www.youtube.com/embed/SYAojqkcYzw',
        'http://www.youtube.com/embed/y6HgGV0QhlE', 'http://www.youtube.com/embed/Zs3qY0wts1c', 'http://www.youtube.com/embed/-L1FpZ6gprI'],

        /** Video Thumbnails **/
        videoThumbs: ['img/video_1.jpg', 'img/video_2.jpg','img/video_3.jpg', 'img/video_4.jpg', 'img/video_5.jpg', 'img/video_6.jpg'],

        /** Selected Video and Image **/
        selectedImage: "",
        selectedVideo: ""
    };

    /** If the video selected is greater than 0 in the array select the  **/
    if ($scope.data.videos.length > 0){
        $scope.data.selectedVideo = $scope.data.videos[0]
    }

    if ($scope.data.images.length > 0){
        $scope.data.selectedImage = $scope.data.images[0]
    }
    $scope.showImage = function(image){
        $scope.data.selectedImage = image

    };
    $scope.playVideo = function(index){
        $scope.data.selectedVideo = $sce.trustAsResourceUrl($scope.data.videos[index]).toString();
    };
    }]);

    /**Filter to make the video page work properly**/

        app.filter('trustAsResourceUrl', ['$sce', function($sce) {
            return function(val) {
                return $sce.trustAsResourceUrl(val.toString());
            };
        }]);

/**Google Map**/
app.directive('googleMap', function () {
    return {

        restrict: 'AE',

        template: '<div id="map"></div>',

        controller: function ($scope) {

            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(41.1725694, -76.8663396),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        }
    }

});
})(google);

function initialize() {
    var mapOptions = {
        center: {lat: 41.1725694, lng: -76.8663396},
        zoom: 10,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));

    // Create the autocomplete helper, and associate it with
    // an HTML text input box.
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace(/** @type {!google.maps.Place} */ ({
            placeId: place.place_id,
            location: place.geometry.location
        }));
        marker.setVisible(true);

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
        infowindow.open(map, marker);
    });
}

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    console.log('This is your location ' + showPosition());
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);



