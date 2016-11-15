$(function() { 
    var mockGet = { code: "12345",
                    firstname: "Christen3",
                    lastname: "Nguyen" };

    //holding off on this until login is implemented -- need to know form input names
    //var newGet = { code: document.getElementsByName('code')[0].value
    //               firstname: document.getElementsByName('firstname')[0].value
    //               lastname: document.getElementsByName('lastname')[0].value       

    var formCount;
    var dataGet = { code: getQueryVariable("code"),
                    firstname: getQueryVariable("firstname"),
                    lastname: getQueryVariable("lastname") };

    $.get('server/judge_form.php', dataGet, function(data) {
        console.log('Data Loading Get');
        console.log(data);

        //parse data
        var data = JSON.parse(data); 
        formCount = data.length;
        
        //create form buttons dynamically based on length of array
        for (i = 0; i < formCount; i++){;
            var buttonNav = document.getElementById('formbuttons');
            var btn = document.createElement('div');
            var num = i+1;
            btn.innerHTML = '<button type="button" class="buttonClass" onclick="showForm(this)" value="'+i+'" target="'+i+'">Group '+num+'</button><br/><br/>';
            buttonNav.appendChild(btn);
        }
        
        //create form dynamically based on length of array
        for(z=0; z < formCount; z++){

            var formDiv = document.getElementById('form');
        
            var groupDiv = document.createElement('div');
            groupDiv.setAttribute("id", "groupform"+z);
            groupDiv.setAttribute("class", "targetDiv");

            var projectId = document.createElement('p');
            projectId.setAttribute("id", "projectid"+z);
            projectId.setAttribute("type", "hidden");

            var title = document.createElement('div');
            title.setAttribute("id", "title"+z);
            //title.innerHTML = "<br/><h4>Title: </h4><br />"; 

            var description = document.createElement('div');
            description.setAttribute("id", "description"+z);
            //description.innerHTML = "<h4>Description: </h4><br />"; 
            
            var session = document.createElement('div');
            session.setAttribute("id", "session"+z);
            //session.innerHTML = "<h4>Session:</h4><br />";

            var category = document.createElement('div');
            category.setAttribute("id", "category"+z);
            //category.innerHTML = "<h4>Category:</h4><br />";

            var designProject = document.createElement('div');
            designProject.innerHTML = "<h2>Design Project</h2>";

            var techaccuracy = document.createElement('div');
            techaccuracy.setAttribute("id", "techaccuracy"+z);
            techaccuracy.innerHTML = "<br>Technical Accuracy<br>"
                    +'<input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="5"> 5 <br><br>';

            var creativity = document.createElement('div');
            creativity.setAttribute("id", "creativity"+z);
            creativity.innerHTML = "Creativity and Innovation <br>"
                    +'<input class="calc'+z+'" type="radio" name="creativity'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="5"> 5 <br><br>';

            var analytical = document.createElement('div');
            analytical.setAttribute("id", "analytical"+z);
            analytical.innerHTML = "Supporting Analytical Work <br>"
                    +'<input class="calc'+z+'" type="radio" name="analytical'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="5"> 5 <br><br>';

            var methodical = document.createElement('div');
            methodical.setAttribute("id", "methodical"+z);
            methodical.innerHTML = "Methodical Design Process Demonstrated <br>"
                    +'<input class="calc'+z+'" type="radio" name="methodical'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="5"> 5 <br><br>';

            var complexity = document.createElement('div');
            complexity.setAttribute("id", "complexity"+z);
            complexity.innerHTML = "Addresses Project Complexity Appropriately <br>"
                    +'<input class="calc'+z+'" type="radio" name="complexity'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="5"> 5 <br><br>';

            var completion = document.createElement('div');
            completion.setAttribute("id", "completion"+z);
            completion.innerHTML = "Expectation of Completion (by term's end) <br>"
                    +'<input class="calc'+z+'" type="radio" name="completion'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="5"> 5 <br><br>';

            var design = document.createElement('div');
            design.setAttribute("id", "design"+z);
            design.innerHTML = "Design and Analysis of Tests <br>"
                    +'<input class="calc'+z+'" type="radio" name="design'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="5"> 5 <br><br>';

            var qanda = document.createElement('div');
            qanda.setAttribute("id", "qanda"+z);
            qanda.innerHTML = "Quality of Response During Q&amp;A <br>"
                    +'<input class="calc'+z+'" type="radio" name="qanda'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="5"> 5 <br><br>';

            var presentation = document.createElement('div');
            presentation.innerHTML = "<h2>Presentation</h2>";

            var organization = document.createElement('div');
            organization.setAttribute("id", "organization"+z);
            organization.innerHTML = "<br>Organization <br>"
                    +'<input class="calc'+z+'" type="radio" name="organization'+z+'" value="0" checked> N/A'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="5"> 5 <br><br>';

            var time = document.createElement('div');
            time.setAttribute("id", "time"+z);
            time.innerHTML = "Use of Allotted Time <br>"
                    +'<input class="calc'+z+'" type="radio" name="time'+z+'" value="0" checked> N/A'
                                    +'<input class="calc'+z+'" type="radio" name="time'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="5"> 5 <br><br>';

            var visuals = document.createElement('div');
            visuals.setAttribute("id", "visuals"+z);
            visuals.innerHTML = "Visual Aids <br>"
                    +'<input class="calc'+z+'" type="radio" name="visuals'+z+'" value="0" checked> N/A'
                                    +'<input class="calc'+z+'" type="radio" name="visuals'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="5"> 5 <br><br>';

            var confidence = document.createElement('div');
            confidence.setAttribute("id", "confidence"+z);
            confidence.innerHTML = "Confidence and Poise <br>"
                    +'<input class="calc'+z+'" type="radio" name="confidence'+z+'" value="0" checked> N/A'
                                    +'<input class="calc'+z+'" type="radio" name="confidence'+z+'" value="1"> 1'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="5"> 5 <br><br>';

            var sum = document.createElement('div');
            sum.innerHTML = '<h4>Grand Total (Sum of Design Project and Presentation Totals) <input type="text" readonly="readonly" name="sum'+z+'"/></h4>';
            sum.setAttribute("id", "sum"+z);
            sum.setAttribute("class", "sumfield");
           
            var table = document.createElement('div');
            table.innerHTML = '<p>Please select each of the following considerations that were addressed by the presentation:</p>'
                                +'<table><tr>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="economic">Economic</th>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="environmental">Environmental</th>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="sustainability">Sustainability</th>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="manufacturability">Manufacturability</th>'
                                +' </tr><tr>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="ethical">Ethical</th>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="healthsafety">Health and Safety</th>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="social">Social</th>'
                                +'<th><input id="check" type="checkbox" name="considerations" value="political">Political</th>'
                                +'</tr></table>';

            var comment = document.createElement('div');
            comment.innerHTML = '<h2>Comments</h2><br/><input type="textarea" name="comment'+z+'"><br>';
            
            //append all elements
            groupDiv.appendChild(projectId);
            groupDiv.appendChild(title);
            groupDiv.appendChild(description);
            groupDiv.appendChild(session);
            groupDiv.appendChild(category);
            groupDiv.appendChild(designProject);
            groupDiv.appendChild(techaccuracy);
            groupDiv.appendChild(creativity);
            groupDiv.appendChild(analytical);
            groupDiv.appendChild(methodical);
            groupDiv.appendChild(complexity);
            groupDiv.appendChild(completion);
            groupDiv.appendChild(design);
            groupDiv.appendChild(qanda);
            groupDiv.appendChild(presentation);
            groupDiv.appendChild(organization);
            groupDiv.appendChild(time);
            groupDiv.appendChild(visuals);
            groupDiv.appendChild(confidence);
            groupDiv.appendChild(sum);
            groupDiv.appendChild(table);
            groupDiv.appendChild(comment);

            formDiv.appendChild(groupDiv);

        }
        //end for loop z

        //function to sum all radio buttons in a single form
        $('input[type="radio"]').click(function(){
        //console.log($(this).parent().parent().attr('id'));
        var groupnum = $(this).parent().parent().attr('id'); // gets the groupform parent of clicked item (groupform#)
        var sumfield = $('#'+groupnum+' .sumfield'); // get the sumfield of the groupform
        sumfield = sumfield.attr("class"); // makes 'sumfield' variable the class name (sumfield)
        //console.log(sumfield);
        $('input[type="radio"]').each(function(){ 
            $(this).each(function(){
                calcscore(groupnum, sumfield);
            });
        });
        });


        //pulls from db from csv to prepopulate project descriptions
        for (j=0; j<formCount; j++){
            document.getElementById("projectid"+j).value = data[j].id;    
            $('#title'+j).append("<h4> Title: "+data[j].title+"</h4>");
            $('#description'+j).append("<h4> Description: "+data[j].description+"</h4>");
            $('#session'+j).append("<h4> Session: "+data[j].session+"</h4>");
            $('#category'+j).append("<h4> Category: "+data[j].category+"</h4>");
        
        }

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
    
       
        var allData = [];
    
        //pushes each form as a dictionary into the array
        for(idIndex=0; idIndex<formCount; idIndex++){
            var newEntry = {"project_id": document.getElementById("projectid"+idIndex).value, 
                            "firstname": mockGet.firstname,
                            "lastname": mockGet.lastname, 
                            "techaccuracy": document.querySelector('input[name="techaccuracy'+idIndex+'"]:checked').value,
                            "creativity": document.querySelector('input[name="creativity'+idIndex+'"]:checked').value,
                            "analytical": document.querySelector('input[name="analytical'+idIndex+'"]:checked').value,
                            "methodical": document.querySelector('input[name="methodical'+idIndex+'"]:checked').value, 
                            "complexity": document.querySelector('input[name="complexity'+idIndex+'"]:checked').value,
                            "completion": document.querySelector('input[name="completion'+idIndex+'"]:checked').value,
                            "design": document.querySelector('input[name="design'+idIndex+'"]:checked').value, 
                            "qanda": document.querySelector('input[name="qanda'+idIndex+'"]:checked').value, 
                            "organization": document.querySelector('input[name="organization'+idIndex+'"]:checked').value, 
                            "time": document.querySelector('input[name="time'+idIndex+'"]:checked').value, 
                            "visuals": document.querySelector('input[name="visuals'+idIndex+'"]:checked').value, 
                            "confidence": document.querySelector('input[name="confidence'+idIndex+'"]:checked').value, 
                            "total": document.getElementsByName('sum'+idIndex)[0].value, 
                            "comment": document.getElementsByName('comment'+idIndex)[0].value};

            allData.push(newEntry);

        }

        var formData = { data: allData };
             
        // var formData = { data: [{"project_id": document.getElementById("projectid").value, 
        //                           "firstname": document.getElementsByName('firstname')[0].value,
        //                            "lastname": document.getElementsByName('lastname')[0].value, 
        //                        "techaccuracy": document.querySelector('input[name="techaccuracy"]:checked').value,
        //                          "creativity": document.querySelector('input[name="creativity"]:checked').value,
        //                          "analytical": document.querySelector('input[name="analytical"]:checked').value,
        //                          "methodical": document.querySelector('input[name="methodical"]:checked').value, 
        //                          "complexity": document.querySelector('input[name="complexity"]:checked').value,
        //                          "completion": document.querySelector('input[name="completion"]:checked').value,
        //                              "design": document.querySelector('input[name="design"]:checked').value, 
        //                               "qanda": document.querySelector('input[name="qanda"]:checked').value, 
        //                        "organization": document.querySelector('input[name="organization"]:checked').value, 
        //                                "time": document.querySelector('input[name="time"]:checked').value, 
        //                             "visuals": document.querySelector('input[name="visuals"]:checked').value, 
        //                          "confidence": document.querySelector('input[name="confidence'+z+'"]:checked').value, 
        //                               "total": document.getElementsByName('sum'+z)[0].value, 
        //                             "comment": document.getElementsByName('comment'+z)[0].value}] };                                                   
        formURL = $( "#projectEval" ).attr('action');
         
        $.post(formURL, formData, function(data, textStatus, jqXHR) {
            console.log('Judge PHP return');
            console.log(data);
            $( "#projectEval" ).hide();
            if (data.trim() === "true") {
                $( "#result" ).empty().append('<div id="container"><div id="header">Successfully Added</div><br><br><p>Thank you!</p></div>'); 
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

//shows form div based on which group button clicked
function showForm(objButton){
    formNumber = objButton.value;
    $('.buttonClass').click(function(){
        $('.targetDiv').hide();
        $('#groupform'+formNumber).show();
    });
};

//calculates the sum of the radiobuttons for each form
function calcscore(groupnum, sumfield){
    var score = 0;
    // go through each radio button within the groupform
    $('#'+groupnum+' input[type="radio"]:checked').each(function() {
        // update the sum with each radio value
        // this if statement is from
        // http://viralpatel.net/blogs/sum-html-textbox-values-using-jquery-javascript/
        if(!isNaN(this.value) && this.value.length!=0) {
            score += parseFloat(this.value);
        }

    });
    $('#'+groupnum+' input[type="text"]').val(score); // display score in the sumfield text area
}

//gets the GET value from URL
//https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for(var i=0; i<vars.length; i++){
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            return pair[1];
        }
    }
    return(false);
}

