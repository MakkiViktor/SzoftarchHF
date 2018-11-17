var urls = "http://tudvari.ddns.net:3000/users/";

$(document).ready(function(){
    var userName = "TesztElek"; 
    $.ajax({
        url: urls + userName,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data ) { alert(data); },
        error: function(data) { alert(data); },
    })
});
