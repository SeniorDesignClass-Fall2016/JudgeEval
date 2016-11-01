<?php
// This module will need to get POST data from admin
// validate the data
// then form the query for the chosen datastore

// Then call the csv export module
include 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($_GET["flag"] == "prepopulate") { 
        //$admin_data = get_admin_form_data();
        echo json_encode(array(
                        "projects" => array("proj1", "proj2"),
                        "advisors" => array("Fang Yi", "bob"),
                        "sessions" => array("yoooooo")
                        )); 
    } else if ($_GET["flag"] == "session") {
        
    } else if ($_GET["flag"] == "advisor") {
    } else if ($_GET["flag"] == "team") {
    }



}

    
?>
