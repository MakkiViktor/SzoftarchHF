
$(document).ready(function(){
<<<<<<< HEAD
    $("#addheader").load("../html/header.html", "", setHeader);
=======
    $("#header").load("../html/header.html")
    .ready(function(){
        setHeader();
    });

>>>>>>> 444aac029ef95174228145ac2c2c2930798d2489
});

var setHeader = function(){
    if(getCookie(userNamec) !== ""){
        loggedIn();
    }
    else notLoggedIn();
}

var loggedIn = function(){
<<<<<<< HEAD
    $("#header").append("<b>" + getCookie(userNamec) + "    </b>")
    $("#header").append("<button id = 'logoutbtn'> Log out</button>.");
    $("#logoutbtn").on("click", function(){
=======
    $("#navBarRight").append("<li><b>" + getCookie(userNamec) + "</b></li>")
    $("#navBarRight").append("<li><a href='#' id='signout'>Sign out</a></li>");
    $("#signout").on("click", function(){
>>>>>>> 444aac029ef95174228145ac2c2c2930798d2489
        document.cookie = setCookie(userNamec, "", -1);
        alert("logged out");
        location = indexHtml;  
    })
}

var notLoggedIn = function(){
<<<<<<< HEAD
    $("#header").append("<a href = '../html/login.html'>login     <a/>");
    $("#header").append("<a href = '../html/signup.html'>sign up    <a/>");
=======
    $("#navBarRight").append("<li><a href='../html/login.html'>Login</a></li>");
    $("#navBarRight").append("<li><a href='../html/signup.html'>Signup</a></li>");
>>>>>>> 444aac029ef95174228145ac2c2c2930798d2489
}