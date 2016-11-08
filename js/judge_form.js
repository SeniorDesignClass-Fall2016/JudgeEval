$(function() { 
    var mockGet = { code: "12345",
                    firstname: "Abe",
                    lastname: "Millan" };

    //holding off on this until login is implemented -- need to know form input names
    //var newGet = { code: document.getElementsByName('code')[0].value
    //               firstname: document.getElementsByName('firstname')[0].value
    //               lastname: document.getElementsByName('lastname')[0].value       
    //}

    $.get('server/judge_form.php', mockGet, function(data) {
        console.log('Data Loading Get');
        console.log(data);
    }); 
    $( "#projectEval").submit(function( event ) {
    
    // VALIDATION - requiring required classes to be filled out
    // TODO: Actually you need to check every time a required class is changed or 
    // clicked and each time check whether they are all selected
    // If they are all then you need to make the submit button clickable
    //
    // This will also have to be checked by the server-side code since some one
    // can modify the thing using a web tool
//    if ( $( ".required" ).val().length === 0 ) {
         
        event.preventDefault();
//    } else {
        
//    }
    
        var mockData = { data: [{"project_id": "1", 
                                  "firstname": "Abe",
                                   "lastname": "Millan", 
                               "techaccuracy": "1",
                                 "creativity": "4",
                                 "analytical": "2",
                                 "methodical": "3", 
                                 "complexity": "4",
                                 "completion": "5",
                                     "design": "4", 
                                      "qanda": "3", 
                               "organization": "2", 
                                       "time": "1", 
                                    "visuals": "2", 
                                 "confidence": "3", 
                                      "total": "2", 
                                    "comment": "Good Job"}] };

        var formData = { data: [{"project_id": "1", 
                                  "firstname": document.getElementsByName('firstname')[0].value,
                                   "lastname": document.getElementsByName('lastname')[0].value, 
                               "techaccuracy": document.querySelector('input[name="techaccuracy"]:checked').value,
                                 "creativity": document.querySelector('input[name="techaccuracy"]:checked').value,
                                 "analytical": document.querySelector('input[name="techaccuracy"]:checked').value,
                                 "methodical": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                 "complexity": document.querySelector('input[name="techaccuracy"]:checked').value,
                                 "completion": document.querySelector('input[name="techaccuracy"]:checked').value,
                                     "design": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                      "qanda": document.querySelector('input[name="techaccuracy"]:checked').value, 
                               "organization": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                       "time": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                    "visuals": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                 "confidence": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                      "total": document.querySelector('input[name="techaccuracy"]:checked').value, 
                                    "comment": document.getElementsByName('comment')[0].value}] };
                                                                
        formURL = $( "#projectEval" ).attr('action');
         
        $.post(formURL, formData, function(data, textStatus, jqXHR) {
            console.log('Judge PHP return');
            console.log(data);
            $( "#projectEval" ).hide();
            if (data.trim() === "true") {
                $( "#result" ).empty().append('<h2>Successfully Added</h2>'); 
            } else {
                $( "#result" ).empty().append('<h2>' + data.trim() + '</h2>');
            } 
        }).fail(function(jqHXR, textStatus, errorThrown) {
            console.log('Judge PHP Error');
            console.log(errrorThrown);
        }); 
    // Now check whether the radio buttons are numbers -- not necessary since all radio buttons are checked by default
    // Check that the comment is sthring and not mallicious
    


    });
});



