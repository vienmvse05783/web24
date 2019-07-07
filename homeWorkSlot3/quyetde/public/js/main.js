const maxLength = 200;
document.getElementById("textarea").maxLength = maxLength;

countCharacter = () => {
    var textInput = document.getElementById("textarea").value.length;
    var numLess = maxLength - textInput;
    document.getElementById("numChar").innerHTML = numLess;
}

checkBlank = () => {
    var textInput = document.getElementById("textarea").value.trim().length;
    if(textInput == 0){
        document.getElementById("error").hidden = false;
        document.getElementById("error").innerHTML = "Not Blank!";
    } else {
        document.getElementById("error").hidden = true;
    }
}