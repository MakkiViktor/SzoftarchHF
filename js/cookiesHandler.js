function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setCookies(nameVal, exmins){
    var d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    var cookiestr = "";
    for (var i = 0; i < nameVal.length; i++){
        cookiestr = cookiestr +  nameVal[i]["name"] + "=" + nameVal[i]["value"] + ";"
    }
    document.cookie = cookiestr + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
