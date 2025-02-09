<?php
header('Access-Control-Allow-Origin: *');

$username = $_POST["username"];
$password = $_POST["password"];

if (isset($username) && isset($password)) {
    $res = $username . ": " . $password;
    echo json_encode($res);
}
