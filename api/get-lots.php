<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

$content = file_get_contents('lots.json');
$tempArray = json_decode($content, true);

$inputArr = json_decode(file_get_contents($_GET['userId']), true);

$result = [];

foreach ($tempArray as $key => $value) {
    if (in_array($_GET['userId'], $value['usersTakedPart'])) {
        $value['takesPart'] = true;
    }

    $result[] = $value;
}

echo json_encode($result);
?>