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

$REQUIRED_DATA_FIELDS = array("techaccuracy", "creativity", "analytical", 
                                   "methodical", "complexity", "completion", 
                                     "design", "qanda", "organization", "time", 
                                     "visuals", "confidence");
 
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    judgeDB = new JudgeDatabase();
    $FORM_KEYS = $REQUIRED_DATA_FIELDS;
    $DATA = array();
    foreach ($FORM_KEYS as $value) {
        $DATA[] = $_POST[$value];
    }
    $success = judgeDB.insert_key_array($DATA);
    echo $success;
    //$judge_eval = JudgeEval($DATA);
} 
echo json_encode($DATA);
/*    foreach ($project_evaluation as $value) {
        // TODO: Store ratings to datastore
    }*/
>
