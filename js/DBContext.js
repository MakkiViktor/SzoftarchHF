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

var getCourse = function(courseID, handleData){
    let urls = "http://tudvari.ddns.net:3000/courses/";
    $.ajax({
        url: urls + courseID,
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

var getTeacherCourses = function(userID, handleData){
    let urls =  "http://tudvari.ddns.net:3000/teachersCourses/";
    $.ajax({
        url: urls + userID,
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

function isUserAllowed(userName, pageName, handleData) {
	let urls =  "http://tudvari.ddns.net:3000/permission/";
    $.ajax({
        url: urls + userName + "/" + pageName,
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