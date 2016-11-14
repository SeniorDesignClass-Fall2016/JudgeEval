$(function() { 
    var mockGet = { code: "12345",
                    firstname: "Christen1",
                    lastname: "Nguyen" };

    //holding off on this until login is implemented -- need to know form input names
    //var newGet = { code: document.getElementsByName('code')[0].value
    //               firstname: document.getElementsByName('firstname')[0].value
    //               lastname: document.getElementsByName('lastname')[0].value       

    $.get('server/judge_form.php', mockGet, function(data) {
        console.log('Data Loading Get');
        console.log(data);

        //parse data
        var data = JSON.parse(data); 
        var formCount = data.length;
        
        //create form buttons dynamically based on length of array
        for (i = 1; i <= formCount; i++){
            //var btn = $("<button/>");
            //btn.text('Group '+i);
            //$('#formbuttons').append(btn);
            var buttonNav = document.getElementById('formbuttons');
            var v = document.createElement('input');
            var att = document.createAttribute("class");
            v.type="button";
            v.value="Group "+i;
            att.value = "buttongroup";
            v.setAttributeNode(att);
            buttonNav.appendChild(v);
            var linebreak = document.createElement("br");
            buttonNav.appendChild(linebreak);
            buttonNav.appendChild(linebreak);
            //buttonNav.appendChild(linebreak);
        }
        
        //create form dynamically based on length of array
        for(z=0; z < formCount; z++){
            //var children = ["title", "description", "session", "category", "designProject", "techaccuracy", "creativity"];

            var formDiv = document.getElementById('form');

            var projectId = document.createElement('input');
            projectId.setAttribute("id", "projectid"+z);
            projectId.setAttribute("type", "hidden");

            var title = document.createElement('div');
            title.setAttribute("id", "title"+z);
            //title.innerHTML = "<br/>Title<br />"; 

            var description = document.createElement('div');
            description.setAttribute("id", "description"+z);
            //description.innerHTML = "<br/>Description<br />"; 
            
            var session = document.createElement('div');
            session.setAttribute("id", "session"+z);
            //session.innerHTML = "<br/>session<br />";

            var category = document.createElement('div');
            category.setAttribute("id", "category"+z);
            //category.innerHTML = "<br/>category<br />";

            var designProject = document.createElement('div');
            designProject.innerHTML = "<hr><h2>Design Project</h2><hr>";

            var techaccuracy = document.createElement('div');
            techaccuracy.setAttribute("id", "techaccuracy"+z);
            techaccuracy.innerHTML = "<br>Technical Accuracy<br>"
                                    +'<input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="techaccuracy'+z+'" value="5"> 5 <br><br>';

            var creativity = document.createElement('div');
            creativity.setAttribute("id", "creativity"+z);
            creativity.innerHTML = "Creativity and Innovation <br>"
                                    +'<input class="calc'+z+'" type="radio" name="creativity'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="creativity'+z+'" value="5"> 5 <br><br>';

            var analytical = document.createElement('div');
            analytical.setAttribute("id", "analytical"+z);
            analytical.innerHTML = "Supporting Analytical Work <br>"
                                    +'<input class="calc'+z+'" type="radio" name="analytical'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="analytical'+z+'" value="5"> 5 <br><br>';

            var methodical = document.createElement('div');
            methodical.setAttribute("id", "methodical"+z);
            methodical.innerHTML = "Methodical Design Process Demonstrated <br>"
                                    +'<input class="calc'+z+'" type="radio" name="methodical'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="methodical'+z+'" value="5"> 5 <br><br>';

            var complexity = document.createElement('div');
            complexity.setAttribute("id", "complexity"+z);
            complexity.innerHTML = "Addresses Project Complexity Appropriately <br>"
                                    +'<input class="calc'+z+'" type="radio" name="complexity'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="complexity'+z+'" value="5"> 5 <br><br>';

            var completion = document.createElement('div');
            completion.setAttribute("id", "completion"+z);
            completion.innerHTML = "Expectation of Completion (by term's end) <br>"
                                    +'<input class="calc'+z+'" type="radio" name="completion'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="completion'+z+'" value="5"> 5 <br><br>';

            var design = document.createElement('div');
            design.setAttribute("id", "design"+z);
            design.innerHTML = "Design and Analysis of Tests <br>"
                                    +'<input class="calc'+z+'" type="radio" name="design'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="design'+z+'" value="5"> 5 <br><br>';

            var qanda = document.createElement('div');
            qanda.setAttribute("id", "qanda"+z);
            qanda.innerHTML = "Quality of Response During Q&amp;A <br>"
                                    +'<input class="calc'+z+'" type="radio" name="qanda'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="qanda'+z+'" value="5"> 5 <br><br>';

            var presentation = document.createElement('div');
            presentation.innerHTML = "<hr><h2>Presentation</h2><hr>";

            var organization = document.createElement('div');
            organization.setAttribute("id", "organization"+z);
            organization.innerHTML = "<br>Organization <br>"
                                    +'<input class="calc'+z+'" type="radio" name="organization'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="organization'+z+'" value="5"> 5 <br><br>';

            var time = document.createElement('div');
            time.setAttribute("id", "time"+z);
            time.innerHTML = "Use of Allotted Time <br>"
                                    +'<input class="calc'+z+'" type="radio" name="time'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="time'+z+'" value="5"> 5 <br><br>';

            var visuals = document.createElement('div');
            visuals.setAttribute("id", "visuals"+z);
            visuals.innerHTML = "Visual Aids <br>"
                                    +'<input class="calc'+z+'" type="radio" name="visuals'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="visuals'+z+'" value="5"> 5 <br><br>';

            var confidence = document.createElement('div');
            confidence.setAttribute("id", "confidence"+z);
            confidence.innerHTML = "Confidence and Poise <br>"
                                    +'<input class="calc'+z+'" type="radio" name="confidence'+z+'" value="1" checked> 1'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="2"> 2'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="3"> 3'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="4"> 4'
                                    +' <input class="calc'+z+'" type="radio" name="confidence'+z+'" value="5"> 5 <br><br>';

            var sum = document.createElement('div');

            sum.innerHTML = '<h4>Grand Total (Sum of Design Project and Presentation Totals) <input type="text" name="sum'+z+'"/></h4>';
            sum.setAttribute("id", "sum"+z);
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
            comment.innerHTML = '<h2>Comments</h2<hr><input type="textarea" name="comment'+z+'"><br>';
            //append all elements
            formDiv.appendChild(projectId);
            formDiv.appendChild(title);
            formDiv.appendChild(description);
            formDiv.appendChild(session);
            formDiv.appendChild(category);
            formDiv.appendChild(designProject);
            formDiv.appendChild(techaccuracy);
            formDiv.appendChild(creativity);
            formDiv.appendChild(analytical);
            formDiv.appendChild(methodical);
            formDiv.appendChild(complexity);
            formDiv.appendChild(completion);
            formDiv.appendChild(design);
            formDiv.appendChild(qanda);
            formDiv.appendChild(presentation);
            formDiv.appendChild(organization);
            formDiv.appendChild(time);
            formDiv.appendChild(visuals);
            formDiv.appendChild(confidence);
            formDiv.appendChild(sum);
            formDiv.appendChild(table);
            formDiv.appendChild(comment);


            //didn't work
            // for(arrayIndex=0; arrayIndex< children.length; arrayIndex++){
            //     formDiv.appendChild(children[arrayIndex]);
            // }
            //console.log("Name is "+document.getElementById("techaccuracy"+z).name);
            //console.log("title is "+document.getElementById("title"+z).id);
            //console.log("description is "+document.getElementById("description"+z).id);

            //this works for just the first form
            function calcscore(){
                var score = 0;
                $(".calc0:checked").each(function(){
                    score+=parseInt($(this).val(),10);
                });
                $("input[name=sum0]").val(score)
            }
            $().ready(function(){
                $(".calc0").change(function(){
                    calcscore();
                });
            });
        }

        //pulls from db from csv
        for (j=0; j<formCount; j++){
            document.getElementById("projectid"+z).value = data[j].id;    
            $('#title'+z).append('<h4> Title: '+data[j].title+'</h4>');
            $('#description'+z).append('<h4> Description: '+data[j].description+'</h4>');
            $('#session'+z).append('<h4> Session: '+data[j].session+'</h4>');
            $('#category'+z).append('<h4> Category: '+data[j].category+'</h4>');
        }

        //console.log("project id is "+document.getElementById("projectid").value);


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

        console.log("sum is "+document.getElementsByName('sum')[0].value);
       
        var formData = { data: [{"project_id": document.getElementById("projectid").value, 
                                  "firstname": document.getElementsByName('firstname')[0].value,
                                   "lastname": document.getElementsByName('lastname')[0].value, 
                               "techaccuracy": document.querySelector('input[name="techaccuracy"]:checked').value,
                                 "creativity": document.querySelector('input[name="creativity"]:checked').value,
                                 "analytical": document.querySelector('input[name="analytical"]:checked').value,
                                 "methodical": document.querySelector('input[name="methodical"]:checked').value, 
                                 "complexity": document.querySelector('input[name="complexity"]:checked').value,
                                 "completion": document.querySelector('input[name="completion"]:checked').value,
                                     "design": document.querySelector('input[name="design"]:checked').value, 
                                      "qanda": document.querySelector('input[name="qanda"]:checked').value, 
                               "organization": document.querySelector('input[name="organization"]:checked').value, 
                                       "time": document.querySelector('input[name="time"]:checked').value, 
                                    "visuals": document.querySelector('input[name="visuals"]:checked').value, 
                                 "confidence": document.querySelector('input[name="confidence"]:checked').value, 
                                      "total": document.getElementsByName('sum')[0].value, 
                                    "comment": document.getElementsByName('comment')[0].value}] };
             
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


