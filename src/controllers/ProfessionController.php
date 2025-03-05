<?php

namespace controllers;

use models\Database;
use models\Profession;
use models\Pvk;
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
            sort($professions);
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

    public static function getProfessionById(int $id): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";

        $db = new Database();
        $conn = $db->getConnection();
        $profession = new Profession($conn);
        if ($data = $profession->getById($id)) {
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "data" => $data
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "message" => "Profession not found"
            ]);
        }
    }

    public static function createProfession(string $name, string $description, string $requirements, string $sphere, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $db = new Database();
        $conn = $db->getConnection();
        $profession = new Profession($conn);
        $credentials = JWTHandler::getJWTData($jwt);

        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {
            if ($profession->create($name, $description, $requirements, $sphere)) {
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

    public static function updateProfessionById(int $id, string $name, string $description, string $requirements, string $sphere, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $db = new Database();
        $conn = $db->getConnection();
        $profession = new Profession($conn);
        $credentials = JWTHandler::getJWTData($jwt);

        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {
            if ($profession->updateById($id, $name, $description, $requirements, $sphere)) {
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

    public static function rateProfession($data, $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Profession.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Pvk.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $credentials = JWTHandler::getJWTData($jwt);
        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {
            $profession_id = htmlspecialchars(trim($data['profession_id']));
            $pvk_names = [];
            $pvk_ratings = [];
            foreach ($data as $key => $value) {
                if (str_starts_with($key, 'pvk')) {
                    if (str_ends_with($key, 'rate')) {
                        $pvk_ratings[] = htmlspecialchars(trim($value));
                    } else {
                        $pvk_names[] = htmlspecialchars(trim($value));
                    }
                }
            }
            if (count($pvk_names) == count($pvk_ratings)) {
                $db = new Database();
                $conn = $db->getConnection();
                $prof = new Profession($conn);
                $prof ->deleteAllByUserId($credentials['id']);
                for ($i = 0; $i < count($pvk_names); $i++) {
                    $profession = new Profession($conn);
                    $pvk = new Pvk($conn);
                    if (!($pvk -> getByName($pvk_names[$i])) || !($profession->getById($profession_id))) {
                        http_response_code(404);
                        echo json_encode([
                            "status" => 404,
                            "message" => "Profession or pvk not found"
                        ]);
                        return;
                    }
                    if (!($profession->rate($profession_id, $pvk->id, $credentials['id'], $pvk_ratings[$i]))) {
                        http_response_code(500);
                        echo json_encode([
                            "status" => 500,
                            "message" => "Insertion error"
                        ]);
                        return;
                    }
                }
            } else {
                http_response_code(400);
                echo json_encode([
                    "status" => 400,
                    "message" => "Rates and professions count do not match"
                ]);
            }
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "message" => "Profession rated successfully"
            ]);
        } else {
            http_response_code(403);
            echo json_encode([
                "status" => 403,
                "message" => "You don't have enough permission"
            ]);
        }
    }
}