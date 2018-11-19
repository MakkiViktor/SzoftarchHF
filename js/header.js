$(document).ready(function(){
    $("#addheader").load("../html/header.html")
    .ready(function(){
        setHeader();
    });

});

var setHeader = function(){
    if(getCookie(userNamec) !== ""){
        logedIn();
    }
    else notLogedIn();
}

var logedIn = function(){
    $("#header").append("<b>" + getCookie(userNamec) + "    </b>")
    $("#header").append("<button id = \"logoutbtn\"> Log out</button>.");
    $("#logoutbtn").on("click", function(){
        document.cookie = setCookie(userNamec, "", -1);
        alert("logged out");
        location = indexHtml;  
    })
}

var notLogedIn = function(){
    $("#header").append("<a href = \"../html/login.html\">login     <a/>");
    $("#header").append("<a href = \"../html/signup.html\">sign up    <a/>");
}