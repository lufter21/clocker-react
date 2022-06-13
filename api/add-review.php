<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');
// $file_post = $_SERVER["DOCUMENT_ROOT"] . "/qlocker/api/post.log";
// $file_get = $_SERVER["DOCUMENT_ROOT"] . "/qlocker/api/get.log";

// $fw = fopen($file_post, "a");
// fwrite($fw, "POST " . var_export(file_get_contents('php://input'), true));
// fclose($fw);


// $fw = fopen($file_get, "a");
// fwrite($fw, "GET " . var_export($_GET, true));
// fclose($fw);


// echo json_encode($_POST);
$inputArr = json_decode(file_get_contents('php://input'), true);

if (!empty($inputArr['user_name'])) {
    $inp = file_get_contents('reviews.json');
    $tempArray = json_decode($inp, true);
    
    if ($tempArray) {
        array_push($tempArray, $inputArr);
        $jsonData = json_encode($tempArray);
    } else {
        $jsonData = json_encode(array($inputArr));
    }
    
    file_put_contents('reviews.json', $jsonData);
    
    echo json_encode($jsonData);
} else {
    echo json_encode(array(
        'error'=>'Input Arr is empty', 
        'n'=>empty($inputArr['user_name']),
        'inp'=>file_get_contents('php://input')
    ));
}

?>