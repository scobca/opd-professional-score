<?php

namespace models;

use PDO;
use PDOException;

class Pvk
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

    public function getByName(string $name): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM professional_characteristics WHERE name = ?");
        try {
            $stmt->execute([$name]);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $data['id'];
            $this->name = $data['name'];
            $this->description = $data['description'];
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getById(int $id): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM professional_characteristics WHERE id = ?");
        try {
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return null;
        }
    }

    public function getByProfessionId(string $id): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM professions_ratings WHERE profession_id = ?");
        try {
            $stmt->execute([$id]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            return null;
        }
    }

    public function getByProfessionIdByUserId(string $professionId, string $userId): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM professions_ratings WHERE profession_id = ? AND user_id = ?");
        try {
            $stmt->execute([$professionId, $userId]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            return null;
        }
    }
}