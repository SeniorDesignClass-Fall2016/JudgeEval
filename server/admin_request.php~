<?php
// This module will need to get POST data from admin
// validate the data
// then form the query for the chosen datastore

// Then call the csv export module
include 'database.php';
  

function make_table_with_data($data) {
    $html_string = "<table><thead><tr><th>Project Name</th><th>Average Score</th></tr></thead><tbody>";
    foreach($data as $title => $score) {
        $html_string .= "<tr><td>{$title}</td><td>{$score}</td></tr>";
    }
    $html_string .= "</tbody></table>";
    return $html_string;
        
}


//echo make_table_with_data(get_scores_by_session(array("COEN 1")));
if ($_SERVER["REQUEST_METHOD"] == "POST") {

} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($_GET["flag"] == "prepopulate") { 
        $admin_data = get_admin_form_data();
        echo json_encode($admin_data); 
    } else if ($_GET["flag"] == "session") {
        $data = get_scores_by_session($_GET["data"]);
        echo make_table_with_data($data);             
    } else if ($_GET["flag"] == "advisor") {
        $data = get_scores_by_advisor($_GET["data"]);
        echo make_table_with_data($data); 
    } else if ($_GET["flag"] == "team") {
        $data = get_scores_by_team($_GET["data"]);
        echo make_table_with_data($data); 
    }

}

    
?>
