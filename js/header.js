
$(document).ready(function(){
    $("#header").load("../html/header.html", "", setHeader);

	$(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });

	
});

var setHeader = function(){
    if(getCookie(userNamec) !== ""){
        loggedIn();
    }
    else notLoggedIn();
}

var loggedIn = function(){

    $("#rightNavBar").append("<li><b>" + getCookie(userNamec) + "</b></li>")
    $("#rightNavBar").append("<li><a href='#' id='signout'>Kijelentkezés</a></li>");
    $("#signout").on("click", function(){
        document.cookie = setCookie(userNamec, "", -1);
        location = indexHtml;  
    })
}

var notLoggedIn = function(){
    $("#rightNavBar").append("<li><a href='../html/login.html'>Bejelentkezés</a></li>");
    $("#rightNavBar").append("<li><a href='../html/signup.html'>Regisztráció</a></li>");
}