<?php
header("Content-Type: application/json");

require_once('tosToArray.php');

echo json_encode(getTOS($_GET["url"],$_GET["type"],$_GET["id"]));
?>