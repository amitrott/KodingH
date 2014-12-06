<?php
header("Content-Type: text/plain; charset=UTF-8");

function getTOS($url,$nodeType,$id) {
    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 0);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $dom = DOMDocument::loadHTML($response);
    $xpath = new DOMXPath($dom);
    $nodes = $xpath->query("//*[@$nodeType='$id']");
    $res = getCats(DOMDocument::loadHTML($dom->saveXML($nodes->item(0))));
    var_dump($res);
    
    $text = $nodes -> item(0)->nodeValue;
    var_dump($text);
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

getTOS("http://www.google.com/intl/en/policies/terms/","class","maia-article");
getTOS("https://koding.com/tos.html","class","tos");
?>