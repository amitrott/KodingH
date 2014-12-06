<?php
class TOSTemplate {
    public $url,$typeOfContainer,$id,$name;
    
    function __construct($a,$b,$c,$d) {
        $this->url=$a;
        $this->typeOfContainer = $b;
        $this->id = $c;
        $this->name = $d;
    }
}

$listOfTOS = array();

$listOfTOS[] = new TOSTemplate("http://www.google.com/intl/en/policies/terms/","class","maia-article","Google");
$listOfTOS[] = new TOSTemplate("https://koding.com/tos.html","class","tos","Koding");
$listOfTOS[] = new TOSTemplate("http://mediatemple.net/legal/terms-of-service/","class","grid-col  span8  legal-content","mediatemple");
?>