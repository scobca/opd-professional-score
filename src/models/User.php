<?php

namespace models;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

use PDO;
use PDOException;
use Random\RandomException;

class User
{
    public int $id;
    public string $username;
    public string $email;
    public string $role;
    public string $password;
    public bool $isVerified;
    private PDO $db;

    public function __construct(PDO $conn)
    {
        $this->db = $conn;
    }

    public function create(string $username, string $email, string $role, string $password): bool
    {
        $stmt = $this->db->prepare(
            "INSERT INTO users (username, email, role, password, is_verified) VALUES (?, ?, ?, ?, ?)");
        if ($stmt->execute([$username, $email, $role, $password, "false"])) {
            return true;
        }
        return false;
    }

    public function setVerified(string $email): bool
    {
        $stmt = $this->db->prepare("UPDATE users SET is_verified = 'true' WHERE email = ?");
        if ($stmt->execute([$email])) {
            return true;
        }
        return false;
    }

    public function getByEmail(string $email): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $this->fillData($stmt);
    }


    public function generateConfirmCode(string $email): ?int
    {
        $stmt = $this->db->prepare("DELETE FROM verification_codes WHERE 
                                   EXISTS (SELECT * FROM verification_codes WHERE user_email = ?)");
        $stmt->execute([$email]);
        $code = rand(100000, 999999);
        $stmt = $this->db->prepare(
            'INSERT INTO verification_codes (user_email, code) VALUES (?, ?)'
        );
        if ($stmt->execute([$email, $code])) {
            return $code;
        }
        return null;
    }

    public function deleteConfirmCode(string $email): bool
    {
        $stmt = $this->db->prepare(
            'DELETE FROM verification_codes WHERE user_email = ?'
        );
        return $stmt->execute([$email]);
    }

    public function getConfirmCode(string $email): ?int
    {
        $stmt = $this->db->prepare("SELECT code FROM verification_codes WHERE user_email = ?");
        if ($stmt->execute([$email])) {
            return $stmt->fetchColumn();
        }
        return null;
    }

    public function getById(int $id): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $this->fillData($stmt);
    }

    private function fillData($stmt): bool
    {
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            $this->id = $data['id'];
            $this->username = $data['username'];
            $this->email = $data['email'];
            $this->role = $data['role'];
            $this->password = $data['password'];
            $this->isVerified = $data['is_verified'];
            return true;
        }
        return false;
    }
}