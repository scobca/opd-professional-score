<?php

namespace controllers;

use models\Database;
use models\Pvk;

class PvkController
{
    public static function getPvkAll($jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Pvk.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";

        $db = new Database();
        $conn = $db->getConnection();
        $pvk = new Pvk($conn);

        if ($pvk_list = $pvk->getAll()) {
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "data" => $pvk_list
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