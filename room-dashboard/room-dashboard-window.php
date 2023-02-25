<?php

$url = "http://localhost/assignment-03/room-service/room-service.py";

$type = $_POST["type"];
$value = $_POST["value"];
$data = array("type" => $type, "value" => $value);

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));

curl_exec($curl);

curl_close($curl);
