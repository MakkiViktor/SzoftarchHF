var urls = "http://tudvari.ddns.net:3000/users";

$(document).ready(function(){
    $("#signup").submit(function(event){
        var formData = $(this).serializeArray();
        $.ajax({
            url: urls,
            type : "POST",
            dataType: "json",
            data : formData,
            success: function(data ) { alert("added" + data); },
            error: function(data) { alert(JSON.stringify(data)); },
            complete: function(xhr, status){ alert(status);}
        });
        return false;
    })
});
