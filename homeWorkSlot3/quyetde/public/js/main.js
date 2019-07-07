checkBlank = () => {
    var textInput = document.getElementById("textarea").value.trim().length;
    if(textInput == 0){
        document.getElementById("error").hidden = false;
        document.getElementById("error").innerHTML = "Not Blank!";
    } else {
        document.getElementById("error").hidden = true;
    }
}