<?php
$host = "localhost";
$username = "sowadrahman";
$password = "kikhobor";
$database = "admin_panel";

$con = mysqli_connect($host, $username, $password, $database);


if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
