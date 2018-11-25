$(document).ready(function(){
    authenticate();
})

var authenticate = function(){
    var userName = getCookie(userNamec);
    if(userName === "")
        window.location = noPermissionHtml;
	
	let pageName = getPageName();
    isUserAllowed(userName, pageName, function(isAllowed){
        if(!isAllowed)
            window.location = noPermissionHtml;
    });
}

var getPageName = function() {
	var path = window.location.pathname;
	var fileName = path.split("/").pop();
	var pageName = fileName.split(".")[0];
	return pageName;
}

var alreadyLoggedIn = function(){
    var userName = getCookie(userNamec);
    if(userName !== "")
        window.location = noPermissionHtml;
}