$( "#judge_form").submit(function( event ) {
    
    // VALIDATION - requiring required classes to be filled out
    // TODO: Actually you need to check every time a required class is changed or 
    // clicked and each time check whether they are all selected
    // If they are all then you need to make the submit button clickable
    //
    // This will also hagve to be checked by the server-side code since some one
    // can modify the thing using a web tool
    if ( $( ".required" ).val().length === 0 ) {
         
        event.preventDefault();
    } else {
        
    }
    

    // Now check whether the radio buttons are numbers
    // Check that the comment is sthring and not mallicious
    


    formData = $( "judge_form" ).serializeArray();

    $.ajax({
        type: 'POST',
        url: $( "judge_form" ).attr('action')
        data: formData
    }).done( function(response) {
    }).fail( function(response) {
    }) ;
});



