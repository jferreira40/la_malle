<?php
include_once './protected.php';

$protector = new jwtVerify();
$state = false;

$state =   $protector->verify();

if ($state === true){
   echo json_encode(

       $jayParsedAry = [
           "favorites" => [
               "infiltré",
               "loup"
           ],
           "most_popular" => [
               "loup"
           ],
           "history" => [
               [
                   "date" => "2015.01.13",
                   "game" => "loup",
                   "player_count" => "13"
               ],
               [
                   "date" => "2201.03.06",
                   "game" => "infiltré",
                   "player_count" => "1"
               ]
           ],
           "friends" => [
               "josé",
               "pierre-adelin"
           ]
       ]
);
} else {
    echo $state;
}
