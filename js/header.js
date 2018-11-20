
$(document).ready(function(){
    $("#addheader").load("../html/header.html", "", setHeader);
});

var setHeader = function(){
    if(getCookie(userNamec) !== ""){
        loggedIn();
    }
    else notLoggedIn();
}

var loggedIn = function(){
    $("#header").append("<b>" + getCookie(userNamec) + "    </b>")
    $("#header").append("<button id = 'logoutbtn'> Log out</button>.");
    $("#logoutbtn").on("click", function(){
        document.cookie = setCookie(userNamec, "", -1);
        alert("logged out");
        location = indexHtml;  
    })
}

var notLoggedIn = function(){
    $("#header").append("<a href = '../html/login.html'>login     <a/>");
    $("#header").append("<a href = '../html/signup.html'>sign up    <a/>");
}