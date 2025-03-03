<?php

namespace controllers;

use models\Database;
use models\Profession;
use utils\JWTHandler;

class ProfessionController
{
    public static function getAllProfessions(): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";

        $db = new Database();
        $conn = $db->getConnection();
        $profession = new Profession($conn);

        if ($professions = $profession->getAll()) {
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "data" => $professions
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "message" => "No professions found"
            ]);
        }

    }

    public static function createProfession(string $name, string $description, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $db = new Database();
        $conn = $db->getConnection();
        $profession = new Profession($conn);
        $credentials = JWTHandler::getJWTData($jwt);

        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {
            if ($profession->create($name, $description)) {
                http_response_code(200);
                echo json_encode([
                    "status" => 200,
                    "message" => "Profession added successfully"
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "status" => 500,
                    "message" => "Insertion Error"
                ]);
            }
        } else {
            http_response_code(403);
            echo json_encode([
                "status" => 403,
                "message" => "You don't have enough permission"
            ]);
        }
    }

    public static function updateProfessionById(int $id, string $name, string $description, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $db = new Database();
        $conn = $db->getConnection();
        $profession = new Profession($conn);
        $credentials = JWTHandler::getJWTData($jwt);

        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {
            if ($profession->updateById($id, $name, $description)) {
                http_response_code(200);
                echo json_encode([
                    "status" => 200,
                    "message" => "Profession updated successfully"
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => 404,
                    "message" => "No professions found"
                ]);
            }
        } else {
            http_response_code(403);
            echo json_encode([
                "status" => 403,
                "message" => "You don't have enough permission"
            ]);
        }

    }
}