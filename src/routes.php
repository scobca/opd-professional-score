<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once __DIR__ . '/router.php';
include $_SERVER['DOCUMENT_ROOT'] . "/controllers/AuthController.php";
include $_SERVER['DOCUMENT_ROOT'] . "/controllers/UserController.php";
include $_SERVER['DOCUMENT_ROOT'] . "/controllers/ProfessionController.php";
include $_SERVER['DOCUMENT_ROOT'] . "/controllers/PvkController.php";

post('/sign-in', function () {
    if (!empty($_POST['email']) && !empty($_POST['password'])) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        \controllers\AuthController::login($email, $password);
    } else {
        http_response_code(400);
        echo json_encode(array(
            "status" => 400,
            "message" => "Fill empty fields",
        ));
    }
});

post('/sign-up', function () {
    if (!empty($_POST['username']) && !empty($_POST['email'])
        && !empty($_POST['password']) && !empty($_POST['password-confirm'])) {
        if ($_POST['password'] == $_POST['password-confirm']) {
            $username = htmlspecialchars($_POST['username']);
            $email = htmlspecialchars(trim($_POST['email']));
            $password = htmlspecialchars(trim($_POST['password']));
            $role = "user";
            if ($email == 'max06safin@yandex.ru') {
                $role = "admin";
            }
            \controllers\AuthController::register($username, $email, $role, $password);
        } else {
            http_response_code(400);
            echo json_encode(array(
                "status" => 400,
                "message" => "Passwords don't match",
            ));
        }

    } else {
        http_response_code(400);
        echo json_encode(array(
            "status" => 400,
            "message" => "Fill empty fields",
        ));
    }
});

post('/email-verify', function() {
    if (!empty($_POST['email']) && !empty($_POST['code'])) {
        \controllers\AuthController::verify($_POST['email'], $_POST['code']);
    } else {
        http_response_code(400);
        echo json_encode(
            array
                (
                    "status" => 400,
                    "message" => "Fill empty fields"
                )
        );
    }
});

post('/resend-code', function () {
    if (!empty($_POST['email'])) {
        \controllers\AuthController::sendCode($_POST['email']);
    }
});

post('/update-role', function () {
    $bearer = getallheaders()["Authorization"];
    $jwt = preg_split("/\s+/", $bearer)[1];
    if (!empty($_POST['new_role']) && !empty($_POST['user_id']) && !empty($jwt)) {
        $role = htmlspecialchars(trim($_POST['new_role']));
        $id = htmlspecialchars(trim($_POST['user_id']));
        \controllers\UserController::updateRoleByID($id, $role, $jwt);
    } else {
        http_response_code(400);
        echo json_encode(array(
            "status" => 400,
            "message" => "Fill empty fields",
        ));
    }
});

post('/update-profession', function () {
    $bearer = getallheaders()["Authorization"];
    $jwt = preg_split("/\s+/", $bearer)[1];
    if (!empty($_POST['profession_id']) && !empty($_POST['profession_name']) &&
        !empty($_POST['profession_description']) && !empty($jwt)) {
        $id = htmlspecialchars(trim($_POST['profession_id']));
        $name = htmlspecialchars(trim($_POST['profession_name']));
        $description = htmlspecialchars(trim($_POST['profession_description']));
        \controllers\ProfessionController::updateProfessionById($id, $name, $description, $jwt);
    } else {
        http_response_code(400);
        echo json_encode(array(
            "status" => 400,
            "message" => "Fill empty fields",
        ));
    }
});

post('/create-profession', function () {
    $bearer = getallheaders()["Authorization"];
    $jwt = preg_split("/\s+/", $bearer)[1];
    if (!empty($_POST['name']) && !empty($_POST['description']) && !empty($jwt)
    && !empty($_POST['requirements']) && !empty($_POST['sphere'])) {
        $name = htmlspecialchars(trim($_POST['name']));
        $description = htmlspecialchars(trim($_POST['description']));
        $requirements = htmlspecialchars(trim($_POST['requirements']));
        $sphere = htmlspecialchars(trim($_POST['sphere']));
        \controllers\ProfessionController::createProfession($name, $description, $requirements, $sphere, $jwt);
    } else {
        http_response_code(400);
        echo json_encode(array(
            "status" => 400,
            "message" => "Fill empty fields",
        ));
    }
});

get('/get-users-all', function () {
    $bearer = getallheaders()["Authorization"];
    $jwt = preg_split("/\s+/", $bearer)[1];
    if (!empty($jwt)) {
        \controllers\UserController::getAllUsers($jwt);
    } else {
        http_response_code(401);
        echo json_encode(array(
            "status" => 401,
            "message" => "You are not authorized to access this data",
        ));
    }
});

get('/get-pvk-all', function () {
    $bearer = getallheaders()["Authorization"];
    $jwt = preg_split("/\s+/", $bearer)[1];
    if (!empty($jwt)) {
        \controllers\PvkController::getPvkAll($jwt);
    } else {
        http_response_code(401);
        echo json_encode(array(
            "status" => 401,
            "message" => "You are not authorized to access this data",
        ));
    }
});

get('/get-professions-all', function () {
    \controllers\ProfessionController::getAllProfessions();
});


get('/profession/$id', function ($id) {
    \controllers\ProfessionController::getProfessionById($id);
});












// ##################################################
// ##################################################
// ##################################################

// Static GET
// In the URL -> http://localhost
// The output -> Index
get('/', 'index.php');

// Dynamic GET. Example with 1 variable
// The $id will be available in user.php
get('/user/$id', 'views/user');

// Dynamic GET. Example with 2 variables
// The $name will be available in full_name.php
// The $last_name will be available in full_name.php
// In the browser point to: localhost/user/X/Y
get('/user/$name/$last_name', 'views/full_name.php');

// Dynamic GET. Example with 2 variables with static
// In the URL -> http://localhost/product/shoes/color/blue
// The $type will be available in product.php
// The $color will be available in product.php
get('/product/$type/color/$color', 'product.php');

// A route with a callback
get('/callback', function(){
  echo 'Callback executed';
});

// A route with a callback passing a variable
// To run this route, in the browser type:
// http://localhost/user/A
get('/callback/$name', function($name){
  echo "Callback executed. The name is $name";
});

// Route where the query string happends right after a forward slash
get('/product', '');

// A route with a callback passing 2 variables
// To run this route, in the browser type:
// http://localhost/callback/A/B
get('/callback/$name/$last_name', function($name, $last_name){
  echo "Callback executed. The full name is $name $last_name";
});

// ##################################################
// ##################################################
// ##################################################
// Route that will use POST data
post('/user', '/api/save_user');

// ##################################################
// ##################################################
// ##################################################
// any can be used for GETs or POSTs

// For GET or POST
// The 404.php which is inside the views folder will be called
// The 404.php has access to $_GET and $data
any('/404','views/404.php');
