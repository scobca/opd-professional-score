<?php

namespace controllers;


use lib\JWT;
use models\Database;
use models\User;

class AuthController
{
    public static function register(string $username, string $email, string $role, string $password): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);
        $prime_code = $user->generateConfirmCode($email);
        if ($user->create($username, $email, $role, password_hash($password, PASSWORD_BCRYPT))) {
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => $prime_code,
                )
            );
        } else {
            http_response_code(401);
            echo json_encode(
                array(
                    "message" => "Email already exists"
                )
            );
        }
    }

    public static function login($email, $password): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/config/core.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/lib/JWTExceptionWithPayloadInterface.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/lib/BeforeValidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/lib/ExpiredException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/lib/SignatureInvalidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/lib/JWT.php";

        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);;
        if ($user->getByEmail($email) && $user->email == $email && password_verify($password, $user->password)) {
            if ($user->isVerified) {

                http_response_code(200);

                $jwt = self::createJWT();
                echo json_encode(
                    array(
                        "message" => "Authentication successful",
                        "jwt" => $jwt
                    )
                );
            } else {
                http_response_code(401);

                echo json_encode(
                    array(
                        "message" => "User not verified"
                    )
                );
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Email or password is incorrect"));
        }
    }

    public static function verify($email, $code)
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);


        if ($user->getConfirmCode($email) == $code) {
            $stmt = $conn -> prepare("UPDATE users SET isVerified = true WHERE email = ?");
            $stmt -> execute([$email]);
            $jwt = self::createJWT();
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Verification successful",
                    "jwt" => $jwt
                )
            );
        } else {
            http_response_code(401);
            echo json_encode(
                array(
                    "message" => "Code is incorrect"
                )
            );
        }
    }

    public static function createJWT(): string
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/config/core.php";

        $token = array(
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "nbf" => $nbf,
            "data" => array(
                "id" => $user->id,
                "username" => $user->username,
                "email" => $user->email,
                "role" => $user->role,
            )
        );

        // Создание jwt
        return JWT::encode($token, $key, 'HS256');
    }
}