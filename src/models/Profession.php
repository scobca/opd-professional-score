<?php

namespace models;

use PDO;

class Profession
{
    public int $id;
    public string $name;
    public string $description;
    public PDO $db;

    public function __construct(PDO $conn)
    {
        $this->db = $conn;
    }
    public function getAll(): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM professions");
        $stmt->execute();
        return $stmt->fetchAll();
    }
}