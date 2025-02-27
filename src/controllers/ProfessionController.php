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
}