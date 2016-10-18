/**AngularJS**/
(function() {
var app = angular.module('ericWebApp', [
    'ngRoute'
]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html"})
        // Pages
        .when("/bio", {templateUrl: "partials/bio.html"})
        .when("/contact", {templateUrl: "partials/contact.html"})
        .when("/images", {templateUrl: "partials/images.html"})
        .when("/videos", {templateUrl: "partials/videos.html"})
        // else 404
        .otherwise("/404", {templateUrl: "partials/404.html"});
}]);

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
    $( '.hide-bullets #carousel-selector-0').on('click', function () {
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


/**Google Map**/
/*(function() {

    var app = angular.module('ericWebApp', []);

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

    // Passing google as a dependency into this module
})(google);*/

