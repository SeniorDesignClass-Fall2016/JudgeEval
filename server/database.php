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
phone VARCHAR(13) NOT NULL,
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

function reset_database_schema() {
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    global $drop_if_student_exists_sql, $drop_if_judge_exists_sql;
    global $drop_if_advisor_exists_sql, $drop_if_project_exists_sql;
    global $create_project_sql, $create_student_sql, $create_advisor_sql, $create_judge_sql;
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);    
    if ($conn->connect_error) {
        return $conn->connect_error;
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

function insert_judge_scores($judge_scores) {
    $schema = array("project_id", "firstname", "lastname", 
                         "techaccuracy", "analytical", "methodical", 
                         "complexity", "completion", "design", 
                         "qanda", "organization", "time", 
                         "visuals", "confidence", "total", "comment");

    #TODO: May need to do validation here
    return insert_cleaned_array_into_table("judge", $schema, $judge_scores);
 
}

function insert_cleaned_array_into_table($table_name, $schema, $data_array) {
    // Action: Inserts cleaned arrays into specified tables
    // Inputs:
    //        $table_name (string): The table to be inserted to
    //        $schema (array(string)): An array of the schema strings to be inserted
    //        $data_array (array(array(string))): An array of arrays of strings of the values to be inserted 
    //                                            into the table in the order of the $schema array 
    global $db_host, $db_user, $db_pass, $db_name, $db_port;
    $schema_string = "(".implode(",", $schema).")";
    $values_string_array = array();

    foreach($data_array as $row) {
        $values = array();
        foreach($row as $item) {
            if (is_numeric($item)) {
                $values[] = intval($item);
            } else {
                $values[] = '"'.$item.'"';
            }
        }
        $values_string = "(".implode(",", $values).")";
        $values_string_array[] = $values_string;
    }
    $all_values_string = implode(",", $values_string_array);

    $sql = "INSERT INTO ".$table_name." ".$schema_string." VALUES ".$all_values_string;
    //return $sql;
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);   
    if ($conn->connect_error) {
        return $conn->connect_error;
    }
    $res = $conn->query($sql);
    $ret = TRUE;
    if (!$res === TRUE) {
        $ret = FALSE;//$conn->error;
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

function load_table_with_csv($csv_file_path) {
    // Purpose: Loads data from file to the project, advisor, student tables
    // Input: The file path of the csv database

    // Project Fields
    $PROJECT_COLUMNS = array("title", "description", "session", "category");
    $ADVISOR_COLUMNS = array("faculty");
    $STUDENT_COLUMNS = array("first", "last", "phone", "email", "major");
    
    $projects = array();
    $students = array();
    $advisors = array();

    $csv = array_map('str_getcsv', file($csv_file_path));

    // Take the normalized column names from the first row of csv
    $col_names = array_map('strtolower', array_shift($csv));

    foreach($csv as $ith_csv_row => $row) {

        $students_per_row = array();
        $advisors_per_row = array();
        $project_per_row = array(); 

        foreach(array_values($row) as $i => $item) {
            // This seperates the keys to find which keys have numbers:
            // Ex: First 2, and therefore find out with columns belong to
            // which table
            $current_col = explode(" ", $col_names[$i]);
            
            // This case is for Student and Advisor Tables
            if (is_numeric(end($current_col))) {
                if (in_array($current_col[0], $STUDENT_COLUMNS)) {
                    // Student Column 
                    if ($current_col[0] == "first") {
                        $students_per_row[end($current_col)]["firstname"] = $item;
                    } else if ($current_col[0] == "last") {
                        $students_per_row[end($current_col)]["lastname"] = $item;
                    } else if ($current_col[0] == "phone") {
                        $students_per_row[end($current_col)]["phone"] = $item;
                    } else if ($current_col[0] == "email") {
                        $students_per_row[end($current_col)]["email"] = $item;
                    } else if ($current_col[0] == "major") {
                        $students_per_row[end($current_col)]["major"] = $item;
                    }

                } else if (in_array($current_col[0], $ADVISOR_COLUMNS)) {
                    // Advisor Column
                    if (count($current_col) == 2) {
                        $advisors_per_row[end($current_col)]["name"] = $item;
                    } else {
                        $advisors_per_row[end($current_col)]["department"] = $item;
                    }
                }

            } else if ((count($current_col) == 1) &&  in_array($current_col[0], $PROJECT_COLUMNS)) {
                $project_per_row[$current_col[0]] = $item;
            }

        } 
        // Get rid of empty rows in arrays
        foreach($students_per_row as $j => $student) {
            if (!$student["firstname"]) {
                unset($students_per_row[$j]);
            } else {
                $students_per_row[$j]["project_id"] = $ith_csv_row + 1;  
                ksort($students_per_row[$j]);
            }
        }
        foreach($advisors_per_row as $j => $advisor) {
            if (!$advisor["name"]) {
                unset($advisors_per_row[$j]);
            } else {
                $advisors_per_row[$j]["project_id"] = $ith_csv_row + 1; 
                ksort($students_per_row[$j]);
            } 
        }

        $projects[] = $project_per_row;
        foreach($students_per_row as $student) {
            $students[] = $student; 
        }
        foreach($advisors_per_row as $advisor) {
            $advisors[] = $advisor;
        }
        //if ($ith_row == 0) {
        //    return array( "project" => $project, "students" => array_values($students), "advisors" => array_values($advisors));
        //}
    }
    //return array("projects" => $projects, "students" => $students, "advisors" => $advisors);
    #TODO: May need to do validation here 
    $project_ret = insert_cleaned_array_into_table("project", array_keys($projects[0]), $projects);  
    $advisor_ret = insert_cleaned_array_into_table("advisor", array_keys($advisors[0]), $advisors);  
    $student_ret = insert_cleaned_array_into_table("student", array_keys($students[0]), $students);  

    ////return $students;

    //return array("proj" => $projects[27], "adv" => array_keys($projects[0]), "stud" => $student_ret);
    if ($project_ret != TRUE && $student_ret != TRUE && $advisor_ret != TRUE) {
        reset_database_schema();        
        return FALSE;
    } else {
        return TRUE;
    }

}
?>

