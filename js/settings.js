$(function() {
    // Consider putting this in its own function to be 
    // Called in on-load
    $("#configure-view").show();
    $("#code-view").hide();
    $("#btn-codes").prop("disabled", true);
    //$("#Upload").prop("disabled", true);

    $.get('server/settings.php', { flag: "prepopulate" }, function(data) {
        var data = JSON.parse(data);
        console.log(data['session_table'].length);
        if (data['session_table'].length) {
            $("#session_table").empty();
            $("#session_table").append(data["session_table"]);
            $("#btn-codes").prop("disabled", false);
	    $("#btn-configure").addClass('currentButton');
        }
    });



    // Events
    $("#btn-configure").click(function() {
        $("#configure-view").show();
        $("#code-view").hide();
	$(this).addClass('currentButton');
	$("#btn-codes").removeClass('currentButton');
        
    });
    $("#btn-codes").click(function() {
        $("#configure-view").hide();
        $("#code-view").show();
	$(this).addClass('currentButton');
	$("#btn-configure").removeClass('currentButton');
    });

    $("#upload-form").submit(function(event) {
        var formData = new FormData($(this)[0])
        //var formData = new FormData(this);
        //var Data = {}; 
        //for (var [key, value] of formData.entries()) { 
        //    Data[key] = value;
        //}
        //console.log(Data);
        formData.append('flag', 'upload');
        event.preventDefault();
        $.ajax({
            url:$("#upload-form").attr('action'),
            type:"POST",
            data: formData,
            dataType:"json",
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR){
                console.log('Succuess');
                console.log(data);
            
                // Sucess Case:
                // update the codes view
                if (data["status"] == "success") {
                    
                    // Add the information to the codes view and enable the button
                    $("#session_table").empty();
                    $("#session_table").append(data["session_table"]);
                    $("#btn-codes").prop("disabled", false);

                    alert("Successfully added new database! You will find the session codes to hand out by pressing the session codes button.");
                
                } else {
                    alert("Sorry, the file was not added. Please make sure that you are using and following the template format");
                }
            }
        });
      
      });
             
    
    $("#template-form").submit(function(event) {
        event.preventDefault();
        $.post($("#template-form").attr("action"), {flag: "download"}, function(data, textStatus, jqXHR) {
            //popup.document.write(data);
            var uriContent = "data:text/csv," + encodeURIComponent(data);
            window.location.assign(uriContent);
        });
    }); 
});
 
