<?php
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;

class jwtVerify
{
    private $secret_key = "rpaijb2289849tertZERZRZfafze289";

    public function verify()
    {
        $jwt = null;
        $data = json_decode(file_get_contents("php://input"));

        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];

        $arr = explode(" ", $authHeader);
        if (array_key_exists(1, $arr)) {
            $jwt = $arr[1];
            $decoded = false;
            try {
                $decoded =  JWT::decode($jwt, $this->secret_key, array('HS256'));
            } catch (Exception $exception){

            }
            if ($decoded) {
                return true;
            } else {
                return "invalid_token";
            }
        } else {
            return "no_token";
        }
    }
}

