<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//Setup DB Username & Password
$user = 'root';
$pass = 'root';

$mysql=mysqli_init();
if (!$mysql)
{
    die("mysqli_init failed");
}

if (!mysqli_real_connect($mysql,"localhost",$user,$pass,"EricValMusic"))
{
    die("Connect Error: " . mysqli_connect_error());
}


if ($mysql->connect_errno) {
    printf("Connect failed: %s\n", $mysql->connect_error);
    exit();
}

//Need to select from both tables
$result = $mysql->query("select * from images");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"fileName":"'  . $rs["fileName"] . '",';
    $outp .= '"order":"'  . $rs["order"] . '"}';
}

$outImages ='"image":['.$outp.']';
//echo($outp);

//Need to select from both tables
$result = $mysql->query("select * from videos");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"url":"'  . $rs["url"] . '",';
    $outp .= '"title":"'  . $rs["title"] . '",';
    $outp .= '"thumbnails":"'  . $rs["thumbnails"] . '"}';
}

$outVideo ='"video":['.$outp.']';




$result = $mysql->query("select * from map");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"lat":"'  . $rs["lat"] . '",';
    $outp .= '"name":"'  . $rs["name"] . '",';
    $outp .= '"address":"'  . $rs["address"] . '",';
    $outp .= '"directions":"'  . $rs["directions"] . '",';
    $outp .= '"site":"'  . $rs["site"] . '",';
    $outp .= '"date":"'  . $rs["date"] . '",';
    $outp .= '"long":"'  . $rs["long"] . '"}';
}

$outMap ='"map":['.$outp.']';
$outp ='{"result": {'.$outVideo.', '.$outImages.', '.$outMap.'}}';
echo($outp);
?>
