<?php

namespace models;

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
        try {
            $stmt->execute([$username, $email, $role, $password, "false"]);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getByEmail(string $email): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $this->fillData($stmt);
    }


    public function generateConfirmCode(string $email): mixed
    {
        $code = rand(100000, 999999);
        $to      = $email;
        $subject = 'the subject';
        $message = 'hello';
        $headers = 'From: webmaster@example.com' . "\r\n" .
            'Reply-To: webmaster@example.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        $success = mail($to, $subject, $message, $headers);
        if ($success) {
            $stmt = $this->db->prepare("INSERT INTO VerificationCodes (code, user_email) VALUES (?, ?)");
            $stmt->execute([$code, $email]);
            return $code;
        } else {
            return $email;
        }
    }

    public function getConfirmCode(string $email): ?int
    {
        $stmt = $this->db->prepare("SELECT code FROM VerificationCodes WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC)['code'];
    }

    public function getById(int $id): bool
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $this->fillData($stmt);
    }

    public function fillData($stmt): bool
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