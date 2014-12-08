<?php
header("Content-Type: application/json");

require_once('tosToArray.php');
require_once('unirest-php/lib/Unirest.php');

//echo json_encode(getTOS($_GET["url"],$_GET["type"],$_GET["id"]));
$res = getTOS($_GET["url"],$_GET["type"],$_GET["id"]);

$slideN = $_GET['slide'];//-1;
//echo "$slideN\n";
$text = $res[$slideN][1];

$response = Unirest::post("https://textanalysis-text-summarization.p.mashape.com/text-summarizer-text",
  array(
    "X-Mashape-Key" => "yIIX4gwgZ9mshHkNCnGpZ4PKjVBop14ebesjsn5iukFVC1Co03",
    //"Content-Type" => "application/x-www-form-urlencoded"
  ),
  array(
    "sentnum" => 5,
    "text" => $text
  )
);

echo json_encode(array(0=>$res[$slideN][0],1=>implode(" ",$response->body->sentences)));
?>