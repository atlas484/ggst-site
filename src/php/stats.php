<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try{
        include('/var/private/ggst/db_connect.php');

        $sql = "SELECT * FROM $stats_table";
        $response = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        
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