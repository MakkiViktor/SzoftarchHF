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
                    setCookie(userNamec, formData[0]["value"], 90);
                    window.location = mainPageHtml; 
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