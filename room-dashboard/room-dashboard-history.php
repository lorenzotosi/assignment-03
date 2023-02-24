<?php

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data)) {
    $jsonContent = json_decode(file_get_contents("logs.json"), true);

    file_put_contents("temp.json", json_encode($data, JSON_PRETTY_PRINT));
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header("Content-Type: application/json; charset=UTF-8");
    echo $room;
}
