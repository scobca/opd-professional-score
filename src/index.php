<?php

use models\Database;

include 'models/Database.php';

$database = new Database();

$create_tables = [
    'CREATE TABLE IF NOT EXISTS Users 
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            role VARCHAR(30) NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_verified BOOLEAN NOT NULL
        )',
    'CREATE TABLE IF NOT EXISTS RefreshTokens 
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            token VARCHAR(255) NOT NULL,
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP NOT NULL,
            expired_at TIMESTAMP NOT NULL
        )',
    'CREATE TABLE IF NOT EXISTS Types 
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL
        )',
    'CREATE TABLE IF NOT EXISTS Tests 
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) UNIQUE NOT NULL,
            header VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            min_points INTEGER NOT NULL,
            max_points INTEGER NOT NULL,
            min_time INTEGER NOT NULL,
            max_time INTEGER NOT NULL,
            type_id INTEGER REFERENCES types(id), 
            author_id INTEGER REFERENCES users(id)
        )',
    'CREATE TABLE IF NOT EXISTS Sections 
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            test_id INTEGER REFERENCES tests(id),
            section_type VARCHAR(255) NOT NULL,
            question VARCHAR(255) NOT NULL,
            options VARCHAR(255),
            answer VARCHAR(255)
        )',
    'CREATE TABLE IF NOT EXISTS ProfessionalCharacteristics
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL
        )',
    'CREATE TABLE  IF NOT EXISTS VerificationCodes
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            code INTEGER NOT NULL,
            user_email VARCHAR(255) REFERENCES users(email)
        )',
    'CREATE TABLE IF NOT EXISTS Professions
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            pc_id INTEGER REFERENCES ProfessionalCharacteristics(id),
            author_id INTEGER REFERENCES users(id)
        )',
    'CREATE TABLE IF NOT EXISTS TestBlocks
        (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            author_id INTEGER REFERENCES users(id)
        )'
];

foreach ($create_tables as $table_query) {
    try {
        $database->createTable($table_query);
        echo "Database created!<br>";
    } catch (PDOException $e) {
        echo $e->getMessage() . "<br>";
    }
}

$code = rand(100000, 999999);
$to      = "max06safin@yandex.ru";
$subject = 'the subject';
$message = 'hello \r\n';
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$success = imap_mail($to, $subject, $message, $headers);
var_dump($success);