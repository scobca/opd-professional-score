<?php

namespace controllers;

use models\Database;
use models\User;
use PDOException;

class UserController
{
    public static function getAllUsers(): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";

        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);

        try {
            $users = $user -> getAll();
            echo json_encode($users);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(
                [
                    'message' => $e->getMessage()
                ]);
        }
    }

    public static function updateRoleById(int $id, string $admin_email, $newRole): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";

        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);
        $user->getByEmail($admin_email);
        if ($user->role == "admin") {
            try {
                $user->updateRoleById($id, $newRole);
                http_response_code(200);
                echo json_encode([
                    "message" => "Role updated successfully"
                ]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode([
                    'message' => $e->getMessage()
                ]);
            }
        } else {
            http_response_code(403);
            echo json_encode([
                "message" => "You don't have permission to update role"
            ]);
        }
    }

}