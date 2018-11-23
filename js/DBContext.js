var getUser = function(userName, handleData){
    let urls =  "http://tudvari.ddns.net:3000/users/";
    $.ajax({
        url: urls + userName,
        type : "GET",
        dataType: "json",
        success: function(data) {
            handleData(data);
        },
        error: function(jqXHR, textStatus, errorThrown ) { 
			console.log(jqXHR); 
			console.log(textStatus);
			console.log(errorThrown);
		}
    });
}

var authenticate = function(){
    var userName = getCookie(userNamec);
    if(userName === "")
        window.location = noPermissionHtml;
    getUser(userName, function(user){
        if(user[permissionc] !== pagePermission)
            window.location = noPermissionHtml;
    });
}

var alreadyLoggedIn = function(){
    var userName = getCookie(userNamec);
    if(userName !== "")
        window.location = noPermissionHtml;
}