$(function() {
    // Pre populae data
    var formData;
    $.get('server/admin_request.php', { flag: "prepopulate" }, function(data) {
        formData = data;
        console.log('Prepopulate Data:');
        console.log(data); 
    }); 

    var querymode;
    $( "#scorerequest input[name=querymode]" ).change(function() {
        querymode = $('input[name=querymode]:checked', '#scorerequest').val();     
        console.log('Mode Changed: ');
        console.log(querymode);
    });

    $( "#scorerequest").submit(function(event) {
    
    //TODO Validation
        event.preventDefault();

        mockDataSession = {flag: "session",
                           data: ["COEN 1", "COEN 2"] };
        mockDataAdvisor = {flag: "advisor",
                           data: ["0"] };
    });








});
