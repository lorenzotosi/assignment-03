<?php

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["room"])) {
    $room = $data["room"];
    file_put_contents("temp.json", json_encode($data));
    echo $room;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header("Content-Type: application/json; charset=UTF-8");
    echo $room;
}
