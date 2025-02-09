<?php

namespace models;

use PDO;
use PDOException;

class User
{
    private int $id;
    private string $username;
    private string $email;
    private string $role;
    private string $password;
    private PDO $db;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function create(string $username, string $email, string $role, string $password): void
    {
        $stmt = $this->db->prepare(
            "INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)");
        try {
            $stmt->execute([$username, $email, $role, $password]);
            echo 'User successfully created!';
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getById(int $id): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
}