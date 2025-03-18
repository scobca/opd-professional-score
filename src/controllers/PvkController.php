<?php

namespace controllers;

use models\Database;
use models\Profession;
use models\Pvk;
use models\User;
use utils\JWTHandler;

class PvkController
{
    public static function getPvkAll($jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Pvk.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";

        $db = new Database();
        $conn = $db->getConnection();
        $pvk = new Pvk($conn);
        $credentials = JWTHandler::getJWTData($jwt);

        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {
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
        } else {
            http_response_code(403);
            echo json_encode([
                "status" => 403,
                "message" => "You don't have enough permission"
            ]);
        }
    }

    public static function getPvkByProfessionId(string $professionId): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Pvk.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";
        $db = new Database();
        $conn = $db->getConnection();
        $pvk = new Pvk($conn);

        if ($pvk_data = $pvk->getByProfessionId($professionId)) {

            $average_ratings = self::calculateRatingPerUser($pvk_data);
            $pvk_data_validated = self::validateRatings($average_ratings);
            usort($pvk_data_validated, function ($a, $b) {
                return $b['rating'] <=> $a['rating'];
            });
            http_response_code(200);
            echo json_encode([
                "status" => 200,
                "data" => $pvk_data_validated
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "message" => "No pvk found"
            ]);
        }
    }

    public static function getPvkByProfessionIdByUserId(string $professionId, string $userId, string $jwt): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Pvk.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/utils/JWTHandler.php";
        $db = new Database();
        $conn = $db->getConnection();
        $pvk = new Pvk($conn);
        $credentials = JWTHandler::getJWTData($jwt);

        if ($credentials["role"] === "admin" || $credentials["role"] === "expert" || $credentials["role"] === "moderator") {

            if ($pvk_data = $pvk->getByProfessionIdByUserId($professionId, $userId)) {

                $pvk_validated_data = self::validateRatings($pvk_data);
                http_response_code(200);
                echo json_encode([
                    "status" => 200,
                    "data" => $pvk_validated_data
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

    private static function calculateRatingPerUser($ratings_data): array
    {
        $rows_uniq = [];
        foreach ($ratings_data as $item) {
            $key = $item['pc_id'] . '_' . $item['profession_id'];
            if (!isset($rows_uniq[$key])) {
                $rows_uniq[$key] = [
                    'pc_id' => $item['pc_id'],
                    'profession_id' => $item['profession_id'],
                    'user_id' => $item['user_id'],
                    'rating' => $item['rating'],
                    'count' => 1
                ];
            } else {
                $rows_uniq[$key]['rating'] += $item['rating'];
                $rows_uniq[$key]['count'] += 1;
            }
        }
        $averageRatings = [];
        foreach ($rows_uniq as $row) {
            $averageRatings[] = [
                "pc_id" => $row['pc_id'],
                "profession_id" => $row['profession_id'],
                "user_id" => $row['user_id'],
                "rating" => $row['rating'] / $row['count'],
            ];
        }
        return $averageRatings;
    }

    private static function validateRatings($data): array
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Pvk.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        $db = new Database();
        $conn = $db->getConnection();

        $pvk = new Pvk($conn);
        $user = new User($conn);
        $data_validated = [];
        foreach ($data as $item) {
            $data_validated[] = [
                "pvk" => $pvk->getById($item["pc_id"]),
                "rating" => $item["rating"],
                "expert" => $user->getById($item["user_id"]),
            ];
        }

        return $data_validated;
    }
}