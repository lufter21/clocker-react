<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

$inputArr = json_decode(file_get_contents('php://input'), true);

if (!empty($inputArr['id'])) {
    $inp = file_get_contents('lots.json');
    $tempArray = json_decode($inp, true);

    foreach ($tempArray as $key => $value) {
        if ($value['id'] == $inputArr['id']) {
            array_push($tempArray[$key]['usersTakedPart'], $inputArr['userId']);
        }
    }
    
    $jsonData = json_encode($tempArray);
    
    file_put_contents('lots.json', $jsonData);
    
    echo json_encode($jsonData);
}
?>