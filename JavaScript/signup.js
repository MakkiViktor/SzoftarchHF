function tryToRegister(){

	var response = "";
	
	var form = document.forms["signup"];
    var username = form["username"].value;
	var firstName = form["firstName"].value;
	var lastName = form["lastName"].value;
    var password = form['password'].value;
	var permission = form['permission'].value;
	var user = new User(new DBContext(), username, password, permission, firstName, lastName);

	if(user.existsInDB()) {
		response = "Már van ilyen nevű felhasználó!";
	}
	else {
		user.save();
		response = "Sikeres regisztráció!";
		form.reset();
	}
	
	console.log("response: " + response);
	document.getElementById("response").innerHTML = response;
	return false;
}