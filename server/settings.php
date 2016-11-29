<?php
include "database.php";

function build_table_for_session_codes($session_codes) {
    if ($session_codes) {
        $table_string = "<table><tr><td>Session</td><td>Code</td></tr>";
        //echo json_encode($session_codes);
        foreach(array_keys($session_codes) as $code) {
            $table_string .= "<tr><td>".$session_codes[$code]."</td><td>".$code."</td></tr>";
        }
        return $table_string; 
    } else {
        return False;
    } 
}
function init_database_with_upload($files) {
    $target_file = basename($files["fileToUpload"]["name"]);
    $uploadOk = 1;


    // Check if file already exists
    if (file_exists($target_file)) {
        $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 500000) {
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk) {
        if (!move_uploaded_file($files["fileToUpload"]["tmp_name"], $target_file)) {
            $uploadOk = 0;
        } else {
            $session_data = load_table_with_csv($target_file); 
            $target_file = getcwd()."/". $target_file; 
            chmod($target_file,0755); 
            unlink($target_file);
            
            if (!$session_data) {
                $uploadOk = 0;
            } else {
                $session_data = get_session_codes(); 
            }  
        }        
    }
    if ($uploadOk) {
        $ret_val = array("status" => "success", "session_table" => build_table_for_session_codes($session_data));
    } else {
        $ret_val = array("status" => "fail");
    }
    return $ret_val;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
//    echo json_encode($_POST);
    //print_r($_POST);
    //print_r($_FILES);
    if ($_POST["flag"] == "upload") {
      $data = init_database_with_upload($_FILES);
      echo json_encode($data);     
    } else if ($_POST["flag"] == "download") {
      download_template();
    } else {
    
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($_GET["flag"] == "prepopulate") {
        $db_populated = is_populated();  
        if ($db_populated) {
            $session_data = get_session_codes();
            echo json_encode(array( "session_table" => build_table_for_session_codes($session_data)));
        } else {
            echo json_encode(array( "session_table" => "")); 
        } 
    }
}
?>
