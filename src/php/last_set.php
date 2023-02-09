<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try{
        include('/var/private/ggst/db_connect.php');

        $sql = "SELECT date, opponent, character_1, character_2, played, won FROM $last_sets_table WHERE last_set IS TRUE LIMIT 1";
        $response = $db->query($sql)->fetch(PDO::FETCH_ASSOC);
        
        if (gettype($response) == "array") {
            echo json_encode($response + ["successful" => True]);
        } 
        else {
            echo json_encode(["successful" => FALSE]);
        }
    } catch (Exception $e) {
        die($e->getMessage());
    }
}

?>