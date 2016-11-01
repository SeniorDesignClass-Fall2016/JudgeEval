<?php
ini_set('display errors', 'On');
error_reporting(E_ALL);

$db_host = "dbserver.engr.scu.edu";
$db_user = "lmillan";
$db_pass = "00001025093";
$db_name = "sdb_lmillan";
$db_port = 3306;

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$drop_if_project_exists_command = "DROP TABLE IF EXISTS project";
$drop_if_student_exists_command = "DROP TABLE IF EXISTS student";
$drop_if_advisor_exists_command = "DROP TABLE IF EXISTS advisor";
$drop_if_judge_exists_command = "DROP TABLE IF EXISTS judge";

$create_projects_table_command = "CREATE TABLE project (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100) NOT NULL,
description VARCHAR(255) NOT NULL,
sess VARCHAR(10) NOT NULL,
category VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
) ENGINE=INNODB";

$create_students_table_command = "CREATE TABLE student (
id INT NOT NULL AUTO_INCREMENT, 
project_id INT NOT NULL,
first_name VARCHAR(64) NOT NULL,
last_name VARCHAR(64) NOT NULL,
phone VARCHAR(10) NOT NULL,
email VARCHAR(64) NOT NULL,
major VARCHAR(32) NOT NULL,
INDEX proj_id (project_id),
FOREIGN KEY (project_id)
    REFERENCES project(id)
    ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE=INNODB";

$create_advisors_table_command = "CREATE TABLE advisor(
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

$create_judges_table_command = "CREATE TABLE judge (
id INT NOT NULL AUTO_INCREMENT,
project_id INT NOT NULL,
first_name VARCHAR(64) NOT NULL,
last_name VARCHAR(64) NOT NULL,
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
INDEX proj_id (project_id),
FOREIGN KEY (project_id)
    REFERENCES project(id)
    ON DELETE CASCADE,
PRIMARY KEY (id)
) ENGINE=INNODB";

function create_database_schema() {
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);    
    $conn->query($drop_if_student_exists_sql);
    $conn->query($drop_if_judge_exists_sql);
    $conn->query($drop_if_advisor_exists_sql);
    $conn->query($drop_if_projects_exists_sql);

    $conn->query($create_project_sql);
    $conn->query($create_student_sql);
    $conn->query($create_advisor_sql);
    $conn->query($create_judges_sql);
    $conn->close();
}

function insert_cleaned_scores($judge_scores) {
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
                $values[] = "'".mysql_real_escape_string($row[$key])."'";
            } else {
                $values[] = (int)$row[$key];
            }
        }
        $values_string = "(".implode(",", $values).")";
        $query_values[] = $values_string;
    }
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);   
    $conn->query("INSERT INTO judges ".implode(",", $column_keys)." VALUES ".implode(",", $query_values);
    $conn->close();
}

function get_scores_by_session($sessions) {
    $column_keys = array("project_id", "firstname", "lastname", 
                         "techaccuracy", "analytical", "methodical", 
                         "complexity", "completion", "design", 
                         "qanda", "organization", "time", 
                         "visuals", "confidence", "total", "comment");
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);   
    $get_projects_by_scores_sql = "SELECT {$FIELDS} FROM judge
                                INNER JOIN project
                                ON judge.project_id=project.id
                                WHERE project.sess in (".implode(",", $sessions).")";
 
    $result = $conn->query($sql);
    $row = $result->fetch_array(MYSQLI_NUM);
    $conn->close();
    return $row;
} 



?>

