<?php

namespace controllers;

use utils\JWTHandler;
use models\Database;
use models\User;
use PDOException;

class UserController
{
    public static function getAllUsers(string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $credentials = JWTHandler::getJWTData($jwt);
        if ($credentials["role"] == "admin") {
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
        } else {
            http_response_code(403);
            echo json_encode([
                "status" => 403,
                "message" => "You don't have permission to access this info"
            ]);
        }

    }

    public static function updateRoleById(int $id, string $newRole, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";
        $credentials = JWTHandler::getJWTData($jwt);
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