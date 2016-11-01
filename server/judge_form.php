<?php
// This file nneds to get the POST info from client,
// validate data on the server,
// and post to datastore

// TODO: Once form is submitted do we need to do something to provent same user to
// submit the form again?

// Currently we will have static datastore to test proof of concept

//    class JudgeEval() {
//     };
include 'database.php';
 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //foreach ($FORM_KEYS as $value) {
    //    $DATA[] = $_POST[$value];
    //}
    //$success = insert_key_array($DATA);
    //echo $success;
    //create_database_schema();
    $res = insert_cleaned_scores($_POST["data"]);
    echo json_encode($res);
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $res = get_data_for_session($_GET["code"], $_GET["firstname"], $_GET["lastname"]);
    echo json_encode($res); 
}
?>
