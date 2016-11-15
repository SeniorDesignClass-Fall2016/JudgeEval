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

 

$data = get_scores_by("team", "26");
array_to_csv_download($data, "team");

//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//
//} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
//    if ($_GET["flag"] == "prepopulate") { 
//        $admin_data = get_data_for_adminform();
//        echo json_encode($admin_data); 
//    } else {
//        $data = get_scores_by($_GET["flag"], $_GET["data"]);
//        array_to_csv_download($data, $_GET["flag"]);             
//    }
//
//}

    
?>
