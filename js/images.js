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
