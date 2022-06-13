window.onload = loginLoad;
function loginLoad(){
	var form = document.getElementById("mylogin")
	form.onsubmit = checkLogin;
}

function checkLogin(){

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const username = urlParams.get("username");
	const password = urlParams.get("password");

	var cusername = document.forms["mylogin"]["username"];
	var cpassword = document.forms["mylogin"]["password"];

	if(username != cusername.value){
		alert("WrongUsername");
		return false;
	}
	else if(password != cpassword.value){
		alert("Unpass");
		return false;
	}
	else{alert("pass")}

	
}

			