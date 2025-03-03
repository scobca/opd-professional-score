<?php

namespace models;

use PDO;
use PDOException;

class Pvk
{
    public string $name;
    public string $description;

    public PDO $db;

    public function __construct(PDO $conn)
    {
        $this->db = $conn;
    }
    public function getAll(): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM professional_characteristics");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function create(string $name, string $description, string $category): bool
    {
        $stmt = $this->db->prepare("INSERT INTO professional_characteristics 
            (name, description, category) VALUES (?, ?, ?)");
        try {
            $stmt->execute([$name, $description, $category]);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}