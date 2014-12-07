<?php
header("Content-Type: text/html; charset=UTF-8");
?>
<!DOCTYPE html>
<html>
<head>
<title>TOS/EULA Online Reader</title>
<link href="style.css" rel="stylesheet" type="text/css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="js/engine.js"></script>
</head>
<body>
<div id="canvas">
Select the predefined TOS to load (refresh the page to return here): <br />
<?php
require_once('populateTOS.php');

$i = 1;
foreach($listOfTOS as $key) {
    echo "<br /><a href=\"javascript:nav.loadSlides('{$key->url}','{$key->typeOfContainer}','{$key->id}');\"title=\"{$key->name}\">{$key->name}</a>";
    $i++;
}
?>
</div>
</body>
</html>