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
        .when("/videos", {templateUrl: "/partials/videos.html"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html"});
}]);

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
                zoom: 15,
                center: new google.maps.LatLng(28.602432, -81.200264),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        }
    }

});
})(google);







