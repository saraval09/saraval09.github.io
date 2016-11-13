/**AngularJS**/
(function() {
var app = angular.module('ericWebApp', [
    'ngRoute'
]);

    /** Navigation Bar **/
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html"})
        // Pages
        .when("/bio", {templateUrl: "partials/bio.html"})
        .when("/contact", {templateUrl: "partials/contact.html"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html"});
}]);

    /** Header **/
    app.directive('header', function () {
        return {
            restrict: 'E',
            replace: true,
            // scope: {user: '='},
            templateUrl: "/templates/header.html",
            controller: 'headerController'
        }
    });

    /** Footer **/
    app.directive('footer', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "templates/footer.html"
        }
    });


    /** Images and Videos **/
app.controller('headerController', ['$scope','$sce','$http', function($scope,$sce,$http) {
    $scope.data={
        /** Main Images **/
        images: [],
        /** Main Videos **/
        videosUrl: [],
        /** Video Thumbnails **/
        videoThumbs: [],
        /** Video Names **/
        videosTitle: [],
        /** Selected Video and Image **/
        selectedImage: "",
        selectedVideo: ""
    };

    $http.get("php/datacall.php")
        .then(function (response) {
            response.data.result.image.forEach(function(element) {
               $scope.data.images.push('img/' + element.fileName);
            });

            if ($scope.data.images.length > 0){
                $scope.data.selectedImage = $scope.data.images[0]
            }

            response.data.result.video.forEach(function(element) {
                $scope.data.videoThumbs.push('img/' + element.thumbnails);
                $scope.data.videosUrl.push(element.url);
                $scope.data.videosTitle.push(element.title);
            });

            if ($scope.data.videosUrl.length > 0){
                $scope.data.selectedVideo = $scope.data.videosUrl[0]
            }
        });

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
                if(val){
                    return $sce.trustAsResourceUrl(val.toString());
                }
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
                center: new google.maps.LatLng(41.2426819, -76.7247813),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            initialize();
        }
    }

});
})(google);


function initialize() {
    var labelIndex = 0;
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var markers=[
        ['The Spartan Pub', 41.2426819, -76.7247813],
        ['Riepstines Pub', 41.2401443, -77.0543222 ],
        ['Hulls Landing', 41.2114086, -76.7602284],
        ['The Mill Tavern Bar & Restaurant', 41.2498221, -76.92892 ]
    ];
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var label;
    var bounds = new google.maps.LatLngBounds();

    var mapOptions = {
        center: {lat: 41.2426819, lng: -76.7247813},
        zoom: 10,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    for (i = 0; i < markers.length; i++) {
        var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(pos);
        marker = new google.maps.Marker({
            position: pos,
            map: map,
            label:labels[labelIndex++ % labels.length]
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
    map.fitBounds(bounds);
    marker.setMap(map);

/*    document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infowindow);
    });*/
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);



