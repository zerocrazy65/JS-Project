window.onload = pageLoad;
function pageLoad(){
    var form = document.getElementById("myForm");
    form.onsubmit = validateForm;
	
}

function validateForm() {
   
    var lastname = document.forms["myForm"]["lastname"];
    var gender = document.forms["myForm"]["gender"];
    var birtday = document.forms["myForm"]["bday"];
    var email = document.forms["myForm"]["email"];
    var username = document.forms["myForm"]["username"];
    var password = document.forms["myForm"]["password"];
    var errormsg = document.getElementById("errormsg")
    errormsg.innerText = "";
    

    var result = true;

    if(lastname.value == ""){
        errormsg.innerText += "errorlastname"
        result = false; 

    }
    if(gender.value == ""){
        errormsg.innerText += "errorgender"
        result = false; 

    }
    if(birtday.value == ""){
        errormsg.innerText += "errorbirtday"
        result = false; 

    }
    if(email.value == ""){
        errormsg.innerText += "erroremail"
        result = false; 

    }
    if(username.value == ""){
        errormsg.innerText += "errorusername"
        result = false; 

    }

    if(password[0].value != password[1].value )
    {
        errormsg.innerText += "no pass"
        result = false;
    }
    if (result == false)
    {
        return false;
    }
    
   
}