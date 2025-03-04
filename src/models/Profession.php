<?php

namespace models;

use PDO;
use PDOException;

class Profession
{
    public int $id;
    public string $name;
    public string $description;
    public string $requirements;
    public string $sphere;
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

    public function getById(int $id): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM professions WHERE id = ?");
        try {
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return null;
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

    public function updateById(int $id, string $name, string $description, string $requirements, string $sphere): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE professions SET name = ?, description = ?, requirements = ?, sphere = ? WHERE id = ?");
        try {
            $stmt->execute([$name, $description, $requirements, $sphere, $id]);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function rate(int $id, int $pvk_id, int $user_id, int $rating): bool
    {
        $stmt = $this->db->prepare("
                INSERT INTO professions_ratings (profession_id, pc_id, user_id, rating) VALUES (?, ?, ?, ?)
        ");
        try {

            $stmt->execute([$id, $pvk_id, $user_id, $rating]);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function deleteAllByUserId(int $userId): bool
    {
        $stmt = $this->db->prepare("DELETE FROM professions_ratings WHERE user_id = ?");
        try {
            $stmt->execute([$userId]);
            return true;
        } catch (PDOException $e) {
            var_dump($e->getMessage());
            return false;
        }
    }
}