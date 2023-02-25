<?php

$data = json_decode(file_get_contents("php://input"), true);

// TODO ogni tot secondi bisogna ricevere in ogni caso i dati e aggiornare l'end datetime con now
// sistemare adjustArray di conseguenza
// dentro deve controllare se il nuovo elemento ha lo stesso status dell'ultimo
// se non lo ho aggiungere il nuovo elemento, altrimenti aggiornare l'ultimo

if (isset($data)) {
    $jsonContent = json_decode(file_get_contents("logs.json"), true);
    if ($data["type"] == "window") {
        adjustArray($jsonContent["data"]["window-log"], $data["content"]);
    } else {
        adjustArray($jsonContent["data"]["lights-log"], $data["content"]);
    }
    file_put_contents("temp.json", json_encode($jsonContent, JSON_PRETTY_PRINT));
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    header("Content-Type: application/json; charset=UTF-8");
    echo $data;
}

function adjustArray($dataArray, $newElement)
{
    foreach ($dataArray as &$elementDate) {
        $elementDate["start"] = strtotime($elementDate["start"]);
        $elementDate["end"] = strtotime($elementDate["end"]);
    }
    $newElement["start"] = strtotime($newElement["start"]);
    $newElement["end"] = strtotime($newElement["end"]);

    $totalTime = 0;
    foreach ($dataArray as $elementDate) {
        $totalTime += ($elementDate["end"] - $elementDate["start"]);
    }
    $totalTime += ($newElement["end"] - $newElement["start"]);

    while (($totalTime - ($dataArray[0]["end"] - $dataArray[0]["start"])) > 24 * 60 * 60) {
        $deletedElement = array_shift($dataArray);
        $totalTime -= ($deletedElement["end"] - $deletedElement["start"]);
    }

    array_push($dataArray, $newElement);

    if ($totalTime > 24 * 60 * 60) {
        $extraTime = 24 * 60 * 60 - $totalTime;
        $dataArray[0]["start"] += $extraTime;
    }

    foreach ($dataArray as &$elementDate) {
        $elementDate["start"] = date("H:i:s", $elementDate["start"]);
        $elementDate["end"] = date("H:i:s", $elementDate["end"]);
    }
    $newElement["start"] = date("H:i:s", $newElement["start"]);
    $newElement["end"] = date("H:i:s", $newElement["end"]);
}
