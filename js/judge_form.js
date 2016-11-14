$(function() { 
    var mockGet = { code: "12345",
                    firstname: "dobby",
                    lastname: "Mill" };

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
    // This will also hagve to be checked by the server-side code since some one
    // can modify the thing using a web tool
//    if ( $( ".required" ).val().length === 0 ) {
         
        event.preventDefault();
//    } else {
        
//    }
    
        var mockData = { data: [{"project_id": "1", 
                                  "firstname": "Abe",
                                   "lastname": "Millan", 
                               "techaccuracy": "1",
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
        formURL = $( "#projectEval" ).attr('action');
         
        $.post(formURL, mockData, function(data, textStatus, jqXHR) {
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
    // Now check whether the radio buttons are numbers
    // Check that the comment is sthring and not mallicious
    


    });
});



