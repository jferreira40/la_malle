<?php
include_once './protected.php';

$protector = new jwtVerify();
$state = false;

$state = $protector->verify();

if ($state === true) {
    echo "ok";
} else {
    echo $state;
}
