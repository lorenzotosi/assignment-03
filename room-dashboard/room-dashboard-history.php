<?php

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data)) {
    $jsonContent = json_decode(file_get_contents("logs.json"), true);
    if ($data["type"] == "window") {
        adjustArray($jsonContent["data"]["window-log"], $data["content"]);
    } else {
        adjustArray($jsonContent["data"]["lights-log"], $data["content"]);
    }
    file_put_contents("logs.json", json_encode($jsonContent, JSON_PRETTY_PRINT));
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($data);
}

function adjustArray(&$dataArray, &$newElement)
{
    $dataArray[count($dataArray) - 1]["end"] = $newElement["start"];

    foreach ($dataArray as &$elementDate) {
        $elementDate["start"] = strtotime($elementDate["start"]);
        $elementDate["end"] = strtotime($elementDate["end"]);
    }
    unset($elementDate);

    $newElement["start"] = strtotime($newElement["start"]);
    $newElement["end"] = strtotime($newElement["end"]);

    $totalTime = 0;
    foreach ($dataArray as $elementDate) {
        $totalTime += ($elementDate["end"] - $elementDate["start"]);
    }
    $totalTime += ($newElement["end"] - $newElement["start"]);

    while (($totalTime - ($dataArray[0]["end"] - $dataArray[0]["start"])) > 24 * 60 * 60) {
        $totalTime -= ($dataArray[0]["end"] - $dataArray[0]["start"]);
        array_shift($dataArray);
    }

    if ($dataArray[count($dataArray) - 1]["status"] != $newElement["status"]) {
        array_push($dataArray, $newElement);
    } else {
        $dataArray[count($dataArray) - 1]["end"] = $newElement["end"];
    }

    if ($totalTime > 24 * 60 * 60) {
        $extraTime = 24 * 60 * 60 - $totalTime;
        $dataArray[0]["start"] += $extraTime;
    }

    foreach ($dataArray as &$elementDate) {
        $elementDate["start"] = date("H:i:s", $elementDate["start"]);
        $elementDate["end"] = date("H:i:s", $elementDate["end"]);
    }
}
