<?php 
require_once 'db_connection.php';
require_once 'functions.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ( isset( $_SESSION['isGuide']) || isset($_SESSION['userEmail']) ){
  $guide = $_SESSION['isGuide'];
  $email = $_SESSION['userEmail'];
  if ( $method === 'GET'){
    if ( $guide ){
      $query = "SELECT b.packageId, GROUP_CONCAT( b.dates ) AS dates, b.tuuristEmail, b.tuuristId, p.title, p.description, p.tags, p.location, p.mainImage,p.images 
      FROM `booking` AS b 
      JOIN `package` AS p ON p.id = b.packageId 
      WHERE p.profileEmail = '{$email}'
      GROUP BY b.packageId, b.tuuristId, b.tuuristEmail";
      $result = mysqli_query( $conn, $query );
      $output = [];
      while ( $row = mysqli_fetch_assoc( $result )){
        $output[] = $row;
      }
      print_r( json_encode( $output ));
    }
  }
}





?>