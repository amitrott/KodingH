<?php
function getTOS($url,$nodeType,$id) {
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 0);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $dom = new DOMDocument;
    $dom->loadHTML($response);
    $xpath = new DOMXPath($dom);
    $nodes = $xpath->query("//*[@$nodeType='$id']");
    $cats = getCats(DOMDocument::loadXML($dom->saveXML($nodes->item(0))));
    
    $text = $nodes -> item(0)->nodeValue;
    //echo $text;
    //var_dump($text);
    
    //var_dump(interleaveArrays($cats,$text));
    return interleaveArrays($cats,$text);
}

function getCats($element) {
    $xpath = new DOMXPath($element);
    $cats = $xpath->query("//b | //h1 | //h2 | //h3");
    $res = array();
    foreach($cats as $key) {
        $res[]=$key->nodeValue;
    }
    return $res;
}

function interleaveArrays($h,$b) {
    $len = sizeof($h);
    $res = array();
    for($i=0;$i<$len;$i++) {
        $matches = array();
        if ($i == $len-1) {
            $m = '/'.preg_quote($h[$i]).'(.*)/s';
            preg_match($m,$b,$matches);
            $res[]=array(0=>$h[$i],1=>$matches[1]);
        } else {
            $m = '/'.preg_quote($h[$i]).'(.*)'.preg_quote($h[$i+1]).'/Us';
            preg_match($m,$b,$matches);
            $res[]=array(0=>$h[$i],1=>$matches[1]);
        }
    }
    return $res;
}

/*var_dump(getTOS("http://www.google.com/intl/en/policies/terms/","class","maia-article"));
var_dump(getTOS("https://koding.com/tos.html","class","tos"));
var_dump(getTOS("https://koding.com/tos.html","id","LuckyAnchor_761053000_165"));*/
?>