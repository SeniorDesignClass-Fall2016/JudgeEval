$(function() {
    // Prepopulate data
    $.get('server/admin_request.php', { flag: "prepopulate" }, function(data) {
        var formData = JSON.parse(data);
        var teamData = formData['team'];
        var advisorData = formData['advisor'];
        var sessionData = formData['session'];  
        //console.log(sessionData); //check sessions
        //console.log(advisorData); //check advisors
        //console.log(teamData); //check teams
        console.log("PAGE IS UPDATED 1");
        
        if (!Object.keys(sessionData).length) {
                $( "#session").append("<p> Sorry, No Departments</p>"); 
                                
        } else{
            // '<input type="radio" name="department" value="' + key + '">' + key
            // '<input type="radio" name="department" value="' + sessionData[key] + '">' + sessionData[key]
         

            // **************** Department Sessions ****************** //

            // List Department radio buttons
            //for (var key in sessionData) {
            //    $( "#session").append('<input type="checkbox" name="department" value="' + key + '">' + key + "</option>");
            //}

            // The "Select All Sessions" Button and make it check all Sessions
            $("#session").append('<input id="checkAll" type="checkbox" name="allsession" value="ALLSESS">Select All</input>');
            $("#checkAll").click(function(){
                    $('input:checkbox').not(this).prop('checked',this.checked);
            });

           // List each Session
           for (var key in sessionData) {
                $("#session").append('<div class="'+key+'"></div>');
                $('.'+key).append('<h2>'+key+' Sessions</h2>');
                for(i = 0;i<sessionData[key]; i++){
                    $('.'+key).append('<input type="checkbox" name="session" value="' + key + " " + [i+1] + '">'+ [i+1] + '</input>');
                  //$('.'+key).hide();
                }
            }
        }

        // **************** Advisor List ****************** //

        if (!Object.keys(advisorData).length) {
                $( "#advisor").append("<p> Sorry, No Advisors</p>"); 
        } else {
            $( "#advisor").append('<div id="advisorselect"><h2>Advisor List</h2>');
            for (var key in advisorData) {
                $( "#advisorselect").append('<input name="advisor" type="radio" value="' + key + '">' + key + '</input></br>'); 
            }
         }
        

        // **************** Team List ****************** //

        if (!Object.keys(teamData).length) {
            $( "#team").append("<p> Sorry, No Teams</p>");  
        } else {
            $( "#team").append('<div id="teamselect"><h2>Team List</h2>');
            for (var key in teamData) {
                $( "#teamselect").append('<input name="team" type="radio" value="' + teamData[key] + '">' + key + '</input></br>'); 
            }
            //$( "#team").append('</select>');
        }


        // Hide all sections initially
        $( "#team" ).hide();    
        $( "#advisor").hide(); 
        $( "#session").hide();
    }); 


	// Form submit data
        var fieldtitle; var numArray;
        var submitQuery = []; var chosenquery = [];
        $("#scorerequest").submit(function(event){
                event.preventDefault();
                //var test;
                $.each($('#scorerequest').serializeArray(), function(i, field) {
                 //if(field.name == "department"){
                //    test = field.value; chosenquery[test] = parseInt(field.value);
                 // }           
                 if(field.name == "session" ){
                      //console.log('-- SESSION CHOSEN');
                      //console.log('field.name: '+field.name);
                      //console.log('field.value: '+field.value);
                      fieldtitle = field.name;
                      chosenquery.push(field.value);
                  }
                 else if(field.name == "advisor"){
                      console.log('-- ADVISOR CHOSEN');
                      console.log('field.name: '+field.name);
                      console.log('field.value: '+field.value);
                      //numArray = field.value.split(",");
                      fieldtitle = field.name;
                      chosenquery = field.value;
                  }
                 else if(field.name == "team"){
                      //console.log('-- TEAM CHOSEN');
                      //console.log('field.name: '+field.name);
                      //console.log('field.value: '+field.value);
                      fieldtitle = field.name;
                      chosenquery = field.value;
                  }                         
                });
                console.log("++ Submit Query:");
                console.log(chosenquery);
                submitQuery = {flag: fieldtitle, data: chosenquery};
                console.log("++ Final Query:");
                console.log(submitQuery);
               
                var url; 

                if (fieldtitle == "session") {
                    url = 'server/admin_request.php?flag='+fieldtitle;
                    chosenquery.forEach(function(element) {
                        url += "&";
                        url += "data[]=" + element; 
                    });
                } else {
                    url = 'server/admin_request.php?flag='+fieldtitle+'&data='+chosenquery;
                }
                document.location.href = url; 
                //    console.log(data);
                //});

                chosenquery=[]; // Clear query

                 
         });
    

    // Show the chosen section and hide the others until revealed
    var querymode;
    $( "#scorerequest input[name=querymode]" ).change(function() {
        querymode = $('input[name=querymode]:checked', '#scorerequest').val();     
        console.log('Mode Changed: '+querymode);
        if (querymode == 'advisor') {
            $( "#team" ).hide();    
            $( "#session" ).hide();    
            $( "#advisor").show();
        } else if (querymode == 'team') {
            $( "#team" ).show();   
            $( "#session" ).hide();  
            $( "#advisor").hide();

        } else if (querymode == 'session') {
            $( "#team" ).hide();   
            $( "#session" ).show();  
            $( "#advisor").hide();

        } else {
            $( "#session" ).hide(); 
            $( "#team" ).hide();    
            $( "#advisor").hide();
        }
    });

    // Clear each section of inputs when going to another section
    // Prevents previously chosen inputs to be entered on submit
    $("input[name=querymode]").bind("click", function() {
        $('input[name=session]').attr('checked',false);
        $('input[name=advisor]').attr('checked',false);
        $('input[name=team]').attr('checked',false);
        //$("#teamselect).val('0');
    });

//    $( "#scorerequest").submit(function(event) {
//    
//    //TODO Validation
//        event.preventDefault();
//        mockDataSession = {flag: "session",
//                           data: ["COEN 1", "COEN 2"] };
//        mockDataAdvisor = {flag: "advisor",
//                           data: ["0"] };
//    });

});
