<?php
include_once './database.php';
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;



$firstName = '';
$lastName = '';
$email = '';
$password = '';
$conn = null;

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$data = json_decode(file_get_contents("php://input"));

$Name = $data->firstname;
$LastName = $data->lastname;
$Email = $data->email;
$Password = $data->password;

$Age = DateTime::createFromFormat('Y-m-d', $data->age);
$Age = $Age->format('Y-m-d');

$table_name = 'Users';

$query = "INSERT INTO ".$table_name."  SET Name = :firstname, Lastname = :lastname, Mail = :email, Age = :age,  Password = :password ;";

$stmt = $conn->prepare($query);
$stmt->bindParam(':firstname', $Name);
$stmt->bindParam(':lastname', $LastName);
$stmt->bindParam(':email', $Email);
$stmt->bindParam(':age', $Age);

$password_hash = password_hash($Password, PASSWORD_DEFAULT);

$stmt->bindParam(':password', $password_hash);


if ($stmt->execute()) {
    $id = $conn->lastInsertId();

    $secret_key = "rpaijb2289849tertZERZRZfafze289";
    $issuer_claim = "LaMalleApi"; // this can be the servername
    $audience_claim = "LaMalleApp";
    $issuedat_claim = time(); // issued at
    $notbefore_claim = $issuedat_claim + 10; //not before in seconds
    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "data" => array(
            "id" => $id,
            "firstname" => $Name,
            "lastname" => $LastName,
            "email" => $Email
        ));
    $jwt = JWT::encode($token, $secret_key);


    http_response_code(200);
    echo json_encode(
        array(
            "User" => $Name,
            "Id" => $id,
            "jwt" => $jwt
        ));

} else {
    http_response_code(400);
    echo json_encode(array("message" => $stmt->errorInfo()));
}