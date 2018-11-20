var getUser = function(userName, handleData){
    let urls =  "http://tudvari.ddns.net:3000/users/";
    $.ajax({
        url: urls + userName,
        type : "GET",
        dataType: "jsonp",
        success: function(data) {
            handleData(data);
        },
        error: function(data) { 
			alert(JSON.stringify(data)); 
		}
    });
}