<?php
// This file nneds to get the POST info from client,
// validate data on the server,
// and post to datastore

// TODO: Once form is submitted do we need to do something to provent same user to
// submit the form again?


include 'database.php';
 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $res = insert_judge_scores($_POST["data"]);
    echo json_encode($res);
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // This call initializes judge form with data corresponding to it session code
    $res = get_data_for_judgeform($_GET["code"], $_GET["firstname"], $_GET["lastname"]);
    echo json_encode($res); 
}
?>
