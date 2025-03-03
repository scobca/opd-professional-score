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

    public function getById(int $id): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM professions WHERE id = ?");
        try {
            $stmt->execute([$id]);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->name = $data["name"];
            $this->description = $data["description"];
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function create(string $name, string $description, string $requirements, string $sphere): bool
    {
        $stmt = $this->db->prepare(
            "INSERT INTO professions (name, description, requirements, sphere) VALUES (?, ?, ?, ?)");
        try {
            $stmt->execute([$name, $description, $requirements, $sphere]);
            return true;
        } catch (PDOException $e) {
            return false;
        }
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