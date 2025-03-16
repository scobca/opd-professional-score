<?php

namespace utils;
class ApiResolver {

    public static function resolve($sentences): void {

        $url = "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2"; // Replace with the correct URL if needed
        $data = array("inputs" => get_object_vars($sentences)); // Replace with your actual data array

        $jsonData = json_encode($data);
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Receive server response
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer TOKEN',
            'Content-Type: application/json'
        ));

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Curl error: ' . curl_error($ch);
        }

        curl_close($ch);

// Decode the JSON response
        $result = json_decode($response, true);

// Output the result (or handle it as needed)
        echo json_encode([
            "status" => 200,
            "data" => $result
        ]);
    }
}