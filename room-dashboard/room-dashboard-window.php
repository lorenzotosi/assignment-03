<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $jsonContent = json_decode(file_get_contents("logs.json"), true);
    $data["window"] = end($jsonContent["data"]["window-log"])["status"];
    $data["lights"] = end($jsonContent["data"]["lights-log"])["status"];
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($data);
}
