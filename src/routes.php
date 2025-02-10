<?php
header("Access-Control-Allow-Origin: http://authentication-jwt/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once __DIR__ . '/router.php';
include $_SERVER['DOCUMENT_ROOT'] . "/controllers/AuthController.php";

post('/sign-in', function () {
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->email) && !empty($data->password)) {
        $email = trim($data->email);
        $password = trim($data->password);
        \controllers\AuthController::login($email, $password);
    } else {
        echo json_encode(array(
            "message" => "Missing email or password."
        ));
    }
});

post('/sign-up', function () {
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->username) && !empty($data->email) && !empty($data->role) && !empty($data->password)) {
        $username = htmlspecialchars($data->username);
        $email = htmlspecialchars(trim($data->email));
        $role = htmlspecialchars(trim($data->role));
        $password = htmlspecialchars(trim($data->password));
        \controllers\AuthController::register($username, $email, $role, $password);
    } else {
        echo json_encode(array(
            "message" => "Fill empty fields",
        ));
    }
});

post('/email-verify', function() {
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->email) && !empty($data->code)) {
        \controllers\AuthController::verify($data->email, $data->code);
    } else {
        echo json_encode(
            array
                (
                    "message" => "Missing email or code"
                )
        );
    }
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
