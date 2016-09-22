if(Modernizr.audio){
    var theAudio= document.getElementById("audio")

    console.log(Modernizr);

}else{


}


var audio;

window.onload= function(){

    audio=document.getElementById("audio");
};

function clicked(){

    audio.currentTime +=10;

}

var srcVid =document.getElementById("vid1");

srcVid.play();

setInterval(function(){

    ctx.drawImage(srcVid, 0,0, 480, 270);

}, 30);


