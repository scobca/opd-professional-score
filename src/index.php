<?php

use models\Database;

include 'models/Database.php';

$database = new Database();

$create_tables = [
    'CREATE TABLE Users 
        (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(30)
        )',
    'CREATE TABLE Types 
        (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL
        )',
    'CREATE TABLE Sections 
        (
            id INTEGER NOT NULL PRIMARY KEY,
            test_id INTEGER REFERENCES tests(id),
            section_type VARCHAR(255) NOT NULL,
            question VARCHAR(255) NOT NULL,
            options VARCHAR(255),
            answer VARCHAR(255)
        )',
    'CREATE TABLE ProfessionalCharacteristics
        (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL
        )',
    'CREATE TABLE Tests 
        (
            id INTEGER NOT NULL PRIMARY KEY,
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
    'CREATE TABLE  VerificationCodes
        (
            id INTEGER NOT NULL PRIMARY KEY,
            code INTEGER NOT NULL,
            code_type VARCHAR(255) NOT NULL,
            user_id INTEGER REFERENCES users(id)
        )',
    'CREATE TABLE Professions
        (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            pc_id INTEGER REFERENCES ProfessionalCharacteristics(id),
            author_id INTEGER REFERENCES users(id)
        )',
    'CREATE TABLE TestBlocks
        (
            id INTEGER NOT NULL PRIMARY KEY,
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