<?php

$room;
if (isset($_POST["room"])) {
    $room = $_POST["room"];
    echo $room;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header("Content-Type: application/json; charset=UTF-8");
    echo $room;
}
