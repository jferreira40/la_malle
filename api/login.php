<?php
include_once './database.php';
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;


$email = '';
$password = '';

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$table_name = 'Users';

$query = "SELECT Id, Name, Lastname, Password FROM " . $table_name . " WHERE Mail = ? order by Id desc LIMIT 0,1";

$stmt = $conn->prepare( $query );
$stmt->bindParam(1, $email);
$stmt->execute();
$num = $stmt->rowCount();

if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['Id'];
    $firstname = $row['Name'];
    $lastname = $row['Lastname'];
    $password2 = $row['Password'];
    if(password_verify($password, $password2))
    {
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
                "firstname" => $firstname,
                "lastname" => $lastname,
                "email" => $email
            ));
        http_response_code(200);
        $jwt = JWT::encode($token, $secret_key);
        echo json_encode(
            array(
                "User" => $firstname,
                "Id" => $id,
                "jwt" => $jwt
            ));
    }
    else{
        http_response_code(401);
        echo json_encode(array("message" => "Login failed."));
    }
}
