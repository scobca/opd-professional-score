<?php

namespace models;

use PDO;
use PDOException;

class Database
{
    private string $host = "postgresql";
    private string $db_name = "postgres";
    private string $user = "opd";
    public string $pass = "score";
    public PDO | false $conn;

    public function getConnection(): PDO
    {
        try {
            $this->host = $_ENV["DB_HOST"];
            $this->db_name = $_ENV["DB_NAME"];
            $this->user = $_ENV["DB_USER"];
            $this->pass = $_ENV["DB_PASSWORD"];

            $this->conn = new PDO('pgsql:host='.$this->host.';dbname='.$this->db_name, $this->user, $this->pass);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }

        return $this->conn;
    }

    public function createTable($query): bool
    {
        $database = $this->getConnection();
        $stmt = $database->prepare($query);
        return $stmt->execute();
    }
}
