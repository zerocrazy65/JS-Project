var header;
var comment1;
var comment2;

window.onload = setvar;
function setvar(){
    header = document.getElementById("header");
    comment1 = document.getElementById("comment1");
    comment2 = document.getElementById("comment2");
}
function postFunction(){
    var Posttext = document.getElementById("text1").value;
    if (header.innerText ==""){
        header.innerText = Posttext;
    }
    else if(comment1.innerText ==""){
        comment1.innerText = Posttext;
    }
    else if(comment2.innerText ==""){
        comment2.innerText = Posttext;
    }
    document.getElementById("text1").value ="";
}
function clearFunction(){
    header.innerText = null;
    comment1.innerText = null;
    comment2.innerText = null;
}

