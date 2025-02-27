<?php

namespace utils;

use libs\jwt\JWT;
use libs\jwt\Key;

class JWTHandler
{
    public static function getJWTData(string $jwt): ?array
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/config/core.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/JWTExceptionWithPayloadInterface.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/BeforeValidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/ExpiredException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/SignatureInvalidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/Key.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/JWT.php";

        if ($decoded = (array) JWT::decode($jwt, new Key($key, 'HS256'))) {
            return (array) $decoded["data"];
        }
        return null;
    }
}