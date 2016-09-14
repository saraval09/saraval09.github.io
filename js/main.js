



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