var getUser = function(userName, handleData){
    let urls =  "http://tudvari.ddns.net:3000/users/";
	console.log(urls + username);
    $.ajax({
        url: urls + userName,
        type : "GET",
        dataType: "jsonp", //sima json?
        success: function(data) {
            handleData(data);
        },
        error: function(data) { 
			alert(JSON.stringify(data)); 
		}
    });
}