<?php
require_once 'db_connection.php';
session_unset();
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

// var_dump( $_SESSION['isGuide'] ) ;
// var_dump( $_SESSION['userEmail']);
if ( isset( $_SESSION['isGuide']) || isset($_SESSION['userEmail']) ){
  print_r( json_encode( ['isGuide' => $_SESSION['isGuide'], 'userEmail' => $_SESSION['userEmail'], 'loggedIn' => true]));
} else {
  print_r( json_encode( ['isGuide' => false, 'userEmail' => false, 'loggedIn' => false]));
}

?>