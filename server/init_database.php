<?php
include 'database.php';

echo json_encode(reset_database_schema());
echo "<br>";
echo json_encode(load_table_with_csv('JudgeEvalDatabase.csv'));

//echo "Projects: <br>";
//echo $data["proj"];
//echo "<br>";
//echo "<br>";
//echo "<br>";
//echo $data["stud"];
//echo "<br>";
//echo "<br>";
//echo $data["adv"];
?>
