<?php

namespace controllers;


use libs\jwt\JWT;
use models\Database;
use models\User;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class AuthController
{
    public static function register(string $username, string $email, string $role, string $password): void
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/User.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/models/Database.php";
        require 'libs/mailer/src/Exception.php';
        require 'libs/mailer/src/PHPMailer.php';
        require 'libs/mailer/src/SMTP.php';

        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);

        if ($user->create($username, $email, $role, password_hash($password, PASSWORD_BCRYPT))) {
            $code = $user->generateConfirmCode($email);
            $mail = new PHPMailer(true);
            try {
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = $_ENV['SMTP_MAIL'];   //SMTP username
                $mail->Password   = $_ENV['SMTP_PASSWORD'];                           //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                $mail->Port       = 465;//TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                //Recipients
                $mail->setFrom('gustavo_fring@gmail.com', 'Gustavo Fring');
                $mail->addAddress($email, $username);     //Add a recipient

                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'Verify email on OPD-PROFESSIONAL-SCAM';
                $mail->Body    =
                    'Hello, ' . $username . '! You decided to verify your email address, so this is your verification code: <b>' . $code . '</b>
                    <br>By the way, don\'t forget to visit our Los Pollos Hermanos restaurant!
                    <img src="https://i.mycdn.me/image?id=951009744332&t=50&plc=WEB&tkn=*_JTw9fc8_r5tiWm4VcBHQ-jOYsQ&fn=external_8">';
                $mail->AltBody = 'This is your verification code <b>' . $code . '</b>';
                $mail->SMTPDebug = 0;
                $mail->send();

            } catch (Exception $e) {
                http_response_code(554);
                json_encode(
                    array(
                        "message" => "Email could not be sent. Mailer Error: {$mail->ErrorInfo}",
                    ))
                ;
            }
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Registration successful, now verify your email.",
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

        $db = new Database();
        $conn = $db->getConnection();
        $user = new User($conn);
        if ($user->getByEmail($email) && $user->email == $email && password_verify($password, $user->password)) {
            if ($user->isVerified) {
                http_response_code(200);
                $jwt = self::createJWT($user);
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
            if ($user->setVerified($email)) {
                $user->getByEmail($email);
                $jwt = self::createJWT($user);
                $user->deleteConfirmCode($email);
                echo json_encode(
                    array(
                        "message" => "Authentication successful",
                        "jwt" => $jwt
                    )
                );
            }
        } else {
            http_response_code(401);
            echo json_encode(
                array(
                    "message" => "Code is incorrect"
                )
            );
        }
    }

    public static function createJWT($user): string
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . "/config/core.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/JWTExceptionWithPayloadInterface.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/BeforeValidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/ExpiredException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/SignatureInvalidException.php";
        include_once $_SERVER['DOCUMENT_ROOT'] . "/libs/jwt/JWT.php";

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