function tryToRegister(){

	var response = "";
	
	var form = document.forms["signup"];
    var username = ["username"].value;
	var firstName = form["firstName"].value;
	var lastName = form["signup"]["lastName"].value;
    var password = form['signup']['password'].value;
	var permission = form['signup']['permission'].value;
	var user = new User(new DBContext(), username, password, permission, firstName, lastName);

	if(user.existsInDB()) {
		response = "Már van ilyen nevű felhasználó!";
	}
	else {
		user.save();
		response = "Sikeres regisztráció!";
		form.reset();
	}
	
	document.getElementById("response").innerHTML = response;
}