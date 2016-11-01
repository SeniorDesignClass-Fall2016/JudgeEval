<?php
include 'database.php';

echo json_encode(load_table_with_csv('test.csv'));

?>
