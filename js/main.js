/**AngularJS**/
(function() {
var app = angular.module('ericWebApp', [
    'ngRoute'
]);
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

    /**Images**/

app.controller('homeController', ['$scope','$sce', function($scope,$sce) {
        $scope.greeting = 'Hola!';
    $scope.data={
        images: ['img/img1_preview.jpg', 'img/img2_preview.jpg', 'img/img3_preview.jpg',
            'img/img4_preview.jpg', 'img/img5_preview.jpg', 'img/img6_preview.jpg'
        ],
        videos: ['http://www.youtube.com/embed/SjGZoALjiLQ', 'http://www.youtube.com/embed/emel6lFmYPI'],
        videoThumbs: ['img/video_1.jpg'],
        selectedImage: "",
        selectedVideo:"https://www.youtube.com/embed/SjGZoALjiLQ"
    };

    if ($scope.data.images.length > 0){
        $scope.data.selectedImage = $scope.data.images[0]
    }

    $scope.showImage = function(image){
        $scope.data.selectedImage = image

    };
    $scope.playVideo = function(index){
        $scope.data.selectedVideo = $sce.trustAsResourceUrl($scope.data.videos[index])
    };
    }]);


        app.filter('trustAsResourceUrl', ['$sce', function($sce) {
            return function(val) {
                return $sce.trustAsResourceUrl(val);
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



/**Images**/
jQuery(document).ready(function($) {

    $('#myCarousel').carousel({
        interval: 5000
    });

    //Handles the carousel thumbnails
    $( '[id^=carousel-selector-]').on('click', function () {
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





