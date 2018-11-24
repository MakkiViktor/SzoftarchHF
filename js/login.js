var urls = "http://tudvari.ddns.net:3000/login"; 

$(document).ready(function(){
    $("#login").submit(function(event){
        var formData = $(this).serializeArray();
        $.ajax({
            url: urls,
            type : "POST",
            dataType: "json",
            data : formData,
            success: function(data ) {
                if(data === true){ 
					getUser(formData[0]["value"], function(user){
                        setCookie(userNamec, user["Username"], 90);
                        setCookie(userIDc, user["_id"], 90);
						if(user["Permission"] === 1)
							window.location = teacherIndexHtml;
						else 
							window.location = studentIndexHtml;
					});
                    
                } else if(data === false){
                    alert("Helytelen felhasználónév, vagy jelszó");
                } else {
                    alert(serverError);
                }
             },
            error: function(data) { alert(JSON.stringify(data)); },
        });
        
		return false;
		
    })
});