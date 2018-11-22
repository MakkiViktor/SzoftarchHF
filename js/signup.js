var urls = "http://tudvari.ddns.net:3000/users";

$(document).ready(function(){
    $("#signup").submit(function(event){
        var formData = $(this).serializeArray();
        $.ajax({
            url: urls,
            type : "POST",
            dataType: "json",
            data : formData,
            success: function(data ) { 
                alert("Sikeres regisztráció");
                window.location = loginHtml;
             },
            error: function(data) { 
                console.log(JSON.stringify(data));
                alert(serverError); 
            },
        });
        return false;
    })
});
