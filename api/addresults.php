<?php

include_once './api.php';

$instance = new api();
echo json_encode($instance->addResults());