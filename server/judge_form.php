<?php
// This file nneds to get the POST info from client,
// validate data on the server,
// and post to datastore

// TODO: Once form is submitted do we need to do something to provent same user to
// submit the form again?

    class JudgeEval() {

    };

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $FORM_KEYS = JudgeEval.REQUIRED_DATA_FIELDS;
        $DATA = array();
        foreach ($FORM_KEYS as $value) {
            $DATA[] = $_POST[$value);
        }
    
        $judge_eval = JudgeEval($DATA);
        $project_evaluation = $judge_eval.get_rating_by_project();
    
        foreach ($project_evaluation as $value) {
            // TODO: Store ratings to datastore
        }
             
?>
