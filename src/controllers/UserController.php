<?php

namespace controllers;

use libs\jwt\JWT;
use libs\jwt\Key;
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
                    "status" => 500,
                    'message' => $e->getMessage()
                ]);
        }
    }

    public static function updateRoleById(int $id, string $newRole, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/config/core.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/JWTExceptionWithPayloadInterface.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/BeforeValidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/ExpiredException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/SignatureInvalidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/Key.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/JWT.php";

        $decoded = (array) JWT::decode($jwt, new Key($key, 'HS256'));
        $credentials = (array) $decoded["data"];
        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);
        if ($credentials["role"] == "admin") {
            try {
                $user->updateRoleById($id, $newRole);
                http_response_code(200);
                echo json_encode([
                    "status" => 200,
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
                "status" => 403,
                "message" => "You don't have permission to update role"
            ]);
        }
    }

}