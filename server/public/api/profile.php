<?php

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method === 'POST'){
    
    print($item);
}
elseif ($method === 'GET'){
    readfile('dummy-profile.json');
}
?>
