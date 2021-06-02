<?php
class DatabaseService
{
    private $db_host = "localhost";
    private $db_name = "la_malle";
    private $db_user = "lamalle";
    private $db_password = "5eZ*87nap";
    public function getConnection()
    {
        $connection = null;
        try {
            $connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
        } catch (PDOException $exception) {
            echo "Connection failed: " . $exception->getMessage();
        }
        return $connection;
    }
}
