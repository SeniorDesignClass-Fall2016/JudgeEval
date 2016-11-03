$(function() {
    // Pre populae data
    $.get('server/admin_request.php', { flag: "prepopulate" }, function(data) {
        var formData = JSON.parse(data);
        var teamData = formData['team'];
        var advisorData = formData['advisor'];
        var sessionData = formData['session'];  
        
        if (!Object.keys(sessionData).length) {
                $( "#session").append("<p> Sorry, No Advisors</p>"); 
                                
        } else {
            // '<input type="radio" name="department" value="' + key + '">' + key
            // '<input type="radio" name="department" value="' + sessionData[key] + '">' + sessionData[key]
            
            // List Departents
            //for (var key in sessionData) {
            //    $( "#session").append('<option value="' + advisorData[key] + '">' + key + "</option>"); 
            //}
            // List Sessions per Department
            //for (var i = 0; i < parseInt(session
            //$( "#advisor").append('</seleect>');
         }
        
        if (!Object.keys(advisorData).length) {
                $( "#advisor").append("<p> Sorry, No Advisors</p>"); 
        } else {
            $( "#advisor").append('<select id="advisorselect" name="advisor">');
            for (var key in advisorData) {
                $( "#advisorselect").append('<option value="' + advisorData[key] + '">' + key + "</option>"); 
            }
            $( "#advisor").append('</seleect>');
         }
        
        if (!Object.keys(teamData).length) {
            $( "#team").append("<p> Sorry, No Teams</p>");  
        } else {
            $( "#team").append('<select id="teamselect" name="advisor">');
            for (var key in teamData) {
                $( "#teamselect").append('<option value="' + teamData[key] + '">' + key + "</option>"); 
            }
            $( "#team").append('</select>');
        }
        $( "#team" ).hide();    
        $( "#advisor").hide();
    
    }); 

    
    var querymode;
    $( "#scorerequest input[name=querymode]" ).change(function() {
        querymode = $('input[name=querymode]:checked', '#scorerequest').val();     
        console.log('Mode Changed: ');
        console.log(querymode);
        if (querymode == 'advisor') {
            $( "#team" ).hide();    
            $( "#advisor").show();

            
        } else if (querymode == 'team') {
            $( "#team" ).show();    
            $( "#advisor").hide();

        } else {
            $( "#team" ).hide();    
            $( "#advisor").hide();
        }

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
