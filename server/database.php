<?php
ini_set('display errors', 'On');
error_reporting(E_ALL);

$db_host = "dbserver.engr.scu.edu";
$db_user = "lmillan";
$db_pass = "00001025093";
$db_name = "sdb_lmillan";
$db_port = 3306;



$drop_if_project_exists_sql = "DROP TABLE IF EXISTS project";
$drop_if_student_exists_sql = "DROP TABLE IF EXISTS student";
$drop_if_advisor_exists_sql = "DROP TABLE IF EXISTS advisor";
$drop_if_judge_exists_sql = "DROP TABLE IF EXISTS judge";

$create_project_sql = "CREATE TABLE project (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100) NOT NULL,
description VARCHAR(255) NOT NULL,
session VARCHAR(10) NOT NULL,
category VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
) ENGINE=INNODB";

$create_student_sql = "CREATE TABLE student (
id INT NOT NULL AUTO_INCREMENT, 
project_id INT NOT NULL,
firstname VARCHAR(64) NOT NULL,
lastname VARCHAR(64) NOT NULL,
phone VARCHAR(10) NOT NULL,
email VARCHAR(64) NOT NULL,
major VARCHAR(32) NOT NULL,
INDEX proj_id (project_id),
FOREIGN KEY (project_id)
    REFERENCES project(id)
    ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE=INNODB";

$create_advisor_sql = "CREATE TABLE advisor(
id INT NOT NULL AUTO_INCREMENT,
project_id INT NOT NULL,
name VARCHAR(64) NOT NULL,
department VARCHAR(32) NOT NULL,
INDEX proj_id (project_id),
FOREIGN KEY (project_id)
    REFERENCES project(id)
    ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE=INNODB";

$create_judge_sql = "CREATE TABLE judge (
id INT NOT NULL AUTO_INCREMENT,
project_id INT NOT NULL,
firstname VARCHAR(64) NOT NULL,
lastname VARCHAR(64) NOT NULL,
techaccuracy int NOT NULL,
creativity int NOT NULL,
analytical int NOT NULL,
methodical int NOT NULL,
complexity int NOT NULL,
completion int NOT NULL,
design int NOT NULL,
qanda int NOT NULL,
organization int NOT NULL,
time int NOT NULL, 
visuals int NOT NULL, 
confidence int NOT NULL, 
total int NOT NULL,
comment VARCHAR(255) NOT NULL,
INDEX proj_id (project_id),
FOREIGN KEY (project_id)
    REFERENCES project(id)
    ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE=INNODB";

$SESSION_CODES = array("12345" => "COEN 1");

function create_database_schema() {
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    global $drop_if_student_exists_sql, $drop_if_judge_exists_sql;
    global $drop_if_advisor_exists_sql, $drop_if_project_exists_sql;
    global $create_project_sql, $create_student_sql, $create_advisor_sql, $create_judge_sql;
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $conn->query($drop_if_student_exists_sql);
    $conn->query($drop_if_judge_exists_sql);
    $conn->query($drop_if_advisor_exists_sql);
    $conn->query($drop_if_project_exists_sql);

    $conn->query($create_project_sql);
    $conn->query($create_student_sql);
    $conn->query($create_advisor_sql);
    $conn->query($create_judge_sql);
    $conn->close();
}

function insert_cleaned_scores($judge_scores) {
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    $column_keys = array("project_id", "firstname", "lastname", 
                         "techaccuracy", "analytical", "methodical", 
                         "complexity", "completion", "design", 
                         "qanda", "organization", "time", 
                         "visuals", "confidence", "total", "comment");
    $column_string_type = array("firstname", "lastname", "comment");
    $query_values = array();
    foreach($judge_scores as $row) {
        $values = array();
        foreach($column_keys as $key) {
            if (in_array($key, $column_string_type)) {
                //TODO IMPORTANT YOU NEED TO DO VALIDATION HERE
                $values[] = "'{$row[$key]}'";
            } else {
                $values[] = (int)$row[$key];
            }
        }
        $values_string = "(".implode(",", $values).")";
        $query_values[] = $values_string;
    }
    //return "INSERT INTO judge (".implode(",", $column_keys).") VALUES ".implode(",", $query_values);
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);   
    if ($conn->connect_error) {
        return $conn->connect_error;
    }
    $res = $conn->query("INSERT INTO judge (".implode(",", $column_keys).") VALUES ".implode(",", $query_values));
    $ret = TRUE;
    if (!$res === TRUE) {
        $ret = $conn->error;
    }
    $conn->close();
    return $ret;
}

function get_scores_by_session($sessions) {
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    $column_keys = array("project.title",  
                         "judge.techaccuracy", "judge.analytical", "judge.methodical", 
                         "judge.complexity", "judge.completion", "judge.design", 
                         "judge.qanda", "judge.organization", "judge.time", 
                         "judge.visuals", "judge.confidence" );
    $column_ints = array( 
                         "techaccuracy", "analytical", "methodical", 
                         "complexity", "completion", "design", 
                         "qanda", "organization", "time", 
                         "visuals", "confidence");

    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);   
    $get_projects_by_scores_sql = "SELECT ".implode(",", $column_keys)." FROM judge
                                INNER JOIN project
                                ON judge.project_id=project.id
                                WHERE project.session in ('".implode(",", $sessions)."')";
 
    $result = $conn->query($get_projects_by_scores_sql);
    if (!$result) {
        return $conn->error;
    }
    $data = array();
    $session_counts = array();
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        if (!array_key_exists($row["title"], $session_counts)) {
            $session_counts[$row["title"]] = 1;
        } else {
            $session_counts[$row["title"]] += 1;
        }
        $total_count = 0;
        foreach($column_ints as $key) {
            $total_count += (int)$row[$key];
        }
        if (!array_key_exists($row["title"], $data)) {
            $data[$row["title"]] = $total_count;
        } else {
            $data[$row["title"]] += $total_count;
        } 
    }
    foreach($data as $title => $count) {
        $data[$title] = ((float)$count )/$session_counts[$title];
    }
  
    $conn->close();
    return $data;
} 


function get_scores_by_advisor($advisor) {
    $column_keys = array("project_id", "firstname", "lastname", 
                         "techaccuracy", "analytical", "methodical", 
                         "complexity", "completion", "design", 
                         "qanda", "organization", "time", 
                         "visuals", "confidence");
    $conn = new mysqli($db_host , $db_user, $db_pass, $db_name, $db_port);
    $sql = "SELECT {$column_keys} FROM judge
            INNER JOIN advisor
            ON judge.project_id=advisor.project_id
            WHERE advisor.name in ({$advisor})";
    $result = $conn->query($sql);
    $row = $result->fetch_array(MYSQLI_NUM);
    $conn->close();
    return $row; 
}

function get_data_for_session($code, $firstname, $lastname) {
    // THE FIRST PART OF THIS SHOULD PROBABLY BE PART OF AUTHENTATION METHOD
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    global $SESSION_CODES; 
    if (!in_array($code, array_keys($SESSION_CODES))) {
        return "INVALID CODE";
    }
    $duplicate_submission_sql = "SELECT id FROM judge
                                 WHERE firstname in ('{$firstname}')
                                 AND lastname in ('{$lastname}')";
    $conn = new mysqli($db_host , $db_user, $db_pass, $db_name, $db_port);
    $result = $conn->query($duplicate_submission_sql);
    $row = $result->fetch_array(MYSQLI_NUM);
    if ($row) {
        $conn->close();
        return "YOU ALREADY JUDGED";
    } 
    $session = $SESSION_CODES[$code];
    $get_session_project_sql = "SELECT * FROM project
                                WHERE session in ('{$session}')";
    $result = $conn->query($get_session_project_sql);
    $data = array();
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $data[] = $row;
    }
    //TODO: NEED TO GET THE STUDENTS BASED OFF OF THE PROJ ID 
    $conn->close();
    return $data;
}

function get_scores_by_team($team) {
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    $column_keys = array("project_id", "firstname", "lastname", 
                         "techaccuracy", "analytical", "methodical", 
                         "complexity", "completion", "design", 
                         "qanda", "organization", "time", 
                         "visuals", "confidence", "total", "comment");
    $conn = new mysqli($db_host , $db_user, $db_pass, $db_name, $db_port);
    $sql_ = "SELECT {$column_keys} FROM judge
             WHERE judge.project_id in ({$team})";
}    

function get_admin_form_data() {
    global $db_host, $db_user, $db_pass, $db_name, $db_port; 
    
    $conn = new mysqli($db_host , $db_user, $db_pass, $db_name, $db_port);
    // For Session Data
    $session_sql = "SELECT distinct session FROM project";
    $session_data = array();
    $result = $conn->query($session_sql);
    while($sess = $result->fetch_array(MYSQLI_NUM)) {
        if (preg_match("/COEN [0-9]/", $sess[0])) {
            if (!array_key_exists("COEN", $session_data)) {
                $session_data["COEN"] = 1;
            } else {
                $session_data["COEN"] += 1;
            }
        } else if (preg_match("/MECH [0-9]/", $sess[0])) {
            if (!array_key_exists("MECH", $session_data)) {
                $session_data["MECH"] = 1;
            } else {
                $session_data["MECH"] += 1;
            }
        } else if (preg_match("/BIOE [0-9]/", $sess[0])) {
            if (!array_key_exists("BIOE", $session_data)) {
                $session_data["BIOE"] = 1;
            } else {
                $session_data["BIOE"] += 1;
            }
        } else if (preg_match("/CENG [0-9]/", $sess[0])) {
            if (!array_key_exists("CENG", $session_data)) {
                $session_data["CENG"] = 1;
            } else {
                $session_data["CENG"] += 1;
            }
        } else if (preg_match("/INTR [0-9]/", $sess[0])) {
            if (!array_key_exists("INTR", $session_data)) {
                $session_data["INTR"] = 1;
            } else {
                $session_data["INTR"] += 1;
            }
        } 
      }
    
      //Advisor Data
      $advisor_data = array();
      $advisor_sql = "SELECT project_id, name FROM advisor";
      $result = $conn->query($advisor_sql);
      while($adv = $result->fetch_array(MYSQLI_ASSOC)) {
          if(!array_key_exists($adv["name"], $advisor_data)) {
              $advisor_data[$adv["name"]] = array($adv["project_id"]);
          } else {
              $advisor_data[$adv["name"]][] = $adv["project_id"];
          }
      }
    
      //Team Data
      $team_data = array();
      $team_sql = "SELECT id, title FROM project";
      $result = $conn->query($team_sql);
      while($team = $result->fetch_array(MYSQLI_ASSOC)) {
          $team_data[$team["title"]] = $team["id"];
      }
      $conn->close();      
      return array(
                    "session" => $session_data,
                    "advisor" => $advisor_data,
                    "team"    => $team_data
                  );
}

//function load_table_with_csv($csv_file_path) {
//    $csv = array_map('str_getcsv', file($csv_file_path));
//    $col_name = array_map('strtolower', array_shift($csv));
//    $project_fields = array();
//    $advisor_fields = array();
//    $student_fields = array();
// 
//    foreach($csv as $row) {
//        foreach(array_values($row) as $i => $col) {
//            if (!$col) {
//                continue;
//            } 
//            $field = $col_name[$i];
//            if fnmatch("[:alpha:]+", $field) {
//            } else if fnmatch("* [0-9]") {
//          
//            } else {
//                continue;
//            }
//        } 
//    }
//    //create_database_schema();    
//    
//    return fnmatch("* [0-9]", "email a");
//}
?>

