<?php

$date = $opponent = $character_1 = $character_2 = $games = "";

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$date        = test_input($_POST["date"]);
	$opponent    = test_input($_POST["opponent"]);
	$character_1 = test_input($_POST["character-1"]);
	$character_2 = test_input($_POST["character-2"]);
	$games       = test_input($_POST["games"]);

	if (!preg_match("/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/", $date)) {
		die("ERROR: Invalid Date - $date");
	}
	if (!preg_match("/^[A-Z#*][a-zA-Z0-9]+$/", $opponent)) {
		die("ERROR: Invalid Opponent Name - $opponent");
	}
	if (!preg_match("/^[A-Z]{2}$/", $character_1)) {
		die("ERROR: Invalid Character 1 - $character_1");
	}
	if (!preg_match("/^[A-Z]{2}$/", $character_2)) {
		die("ERROR: Invalid Character 2 - $character_2");
	}
	if (!preg_match("/^[1-4]+$/", $games)) {
		die("ERROR: Invalid Match Entry");
	}

	$games_played = strlen($games);
	$games_won    = preg_match_all("/[12]/", $games);

	echo "$date against $opponent \n";
	echo "$character_1 vs $character_2 \n";
	echo "Games: $games \n";
	echo "Games played: $games_played \n";
	echo "Games won   : $games_won \n";

	try{
		include('/var/private/ggst/db_connect.php');

		$sql = "INSERT INTO $match_log_table (date, opponent, character_1, character_2, games, played, won)
				VALUES ('$date', '$opponent', '$character_1', '$character_2', 
				        '$games', $games_played, $games_won)";
		$db->exec($sql);

	} catch (Exception $e) {
		die($e->getMessage());
	}

}

?>