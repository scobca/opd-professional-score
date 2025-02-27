<?php

namespace models;

use PDO;
use PDOException;

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

    public function updateById(int $id, string $name, string $description): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE professions SET name = ?, description = ? WHERE id = ?");
        try {
            $stmt->execute([$name, $description, $id]);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}