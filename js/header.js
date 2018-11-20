
$(document).ready(function(){
    $("#header").load("../html/header.html")
    .ready(function(){
        setHeader();
    });

});

var setHeader = function(){
    if(getCookie(userNamec) !== ""){
        loggedIn();
    }
    else notLoggedIn();
}

var loggedIn = function(){
    $("#navBarRight").append("<li><b>" + getCookie(userNamec) + "</b></li>")
    $("#navBarRight").append("<li><a href='#' id='signout'>Sign out</a></li>");
    $("#signout").on("click", function(){
        document.cookie = setCookie(userNamec, "", -1);
        alert("logged out");
        location = indexHtml;  
    })
}

var notLoggedIn = function(){
    $("#navBarRight").append("<li><a href='../html/login.html'>Login</a></li>");
    $("#navBarRight").append("<li><a href='../html/signup.html'>Signup</a></li>");
}