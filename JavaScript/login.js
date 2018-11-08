function validateForm(){
    /*értelmes validáció kell*/
    var valid = true;
    var UserName = document.forms["login"]["UserName"].value;
    var UserPassword = document.forms['login']['UserPassword'].value;

    return valid;
}