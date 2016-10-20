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


app.controller('homeController', ['$scope', function($scope) {
        $scope.greeting = 'Hola!';
    $scope.data={
        images: ['img/img1_preview.jpg', 'img/img2_preview.jpg', 'img/img3_preview.jpg',
            'img/img4_preview.jpg', 'img/img5_preview.jpg', 'img/img6_preview.jpg'
        ],
        videos: ['http://www.youtube.com/embed/SYAojqkcYzw']
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





