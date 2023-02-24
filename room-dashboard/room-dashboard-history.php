<?php

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data)) {
    $jsonContent = json_decode(file_get_contents("logs.json"), true);
    if ($data["type"] == "window") {
        $jsonContent["data"]["window-log"][] = $data["content"];
    } else {
        $jsonContent["data"]["lights-log"][] = $data["content"];
    }
    file_put_contents("temp.json", json_encode($jsonContent, JSON_PRETTY_PRINT));
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header("Content-Type: application/json; charset=UTF-8");
    echo $data;
}
