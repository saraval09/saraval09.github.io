/**
 * Main AngularJS Web Application
 */
var app = angular.module('ericWebApp', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
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



/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});


$(document).ready(function() {
    $('#mapForm').change(function() {

        var selectedCities = $('#mapForm option:selected').val();
        if (selectedCities == 'ALL'){
            $('a.dot').slideDown(1000);
        }else{
            $('a.dot[cities = "'+selectedCities+'"]').show(1000);
            $('a.dot[cities != "'+selectedCities+'"]').hide(1000);
        }

    });

    $('a.dot').click(function(){
        $('a.dot').removeClass('selected');
        $(this).addClass('selected');


        var cities = '.city_detail#' + $(this).attr('cities');
        var htmlCode = $(cities).html();

        $('.detail_container').fadeOut(500, function(){
            $('.detail_container .city_detail').html(htmlCode);
            $('.detail_container').fadeIn(500);
        });
    });
});


