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

var getCourseTests = function(courseID, handleData){
    let urls = "http://tudvari.ddns.net:3000/coursesTests/";
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

var getConcreteTests = function(userID, handleData){
    let urls = "http://tudvari.ddns.net:3000/concreteTests/";
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

var getTests = function(handleData){
    let urls = "http://tudvari.ddns.net:3000/tests";
    $.ajax({
        url: urls,
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

var getTest = function(testID, handleData){
    let urls = "http://tudvari.ddns.net:3000/tests/";
    $.ajax({
        url: urls + testID,
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
        url: urls+ courseID,
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

var getCourseUsers = function(courseID, handleData){
    let urls = "http://tudvari.ddns.net:3000/coursesUsers/";
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

var getUsersCourse = function(userID, handleData){
    let urls = "http://tudvari.ddns.net:3000/usersCourses/";
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
	let urls = "http://tudvari.ddns.net:3000/permission/";
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