window.onload = () => {
    console.log("Hello")
    checkBlank = () => {
        var textInput = document.getElementById("question").value.trim().length;
        if (textInput == 0) {
            document.getElementById("error").hidden = false;
            document.getElementById("error").innerHTML = "Not Blank!";
        } else {
            document.getElementById("error").hidden = true;
            // send question to server 
            // url param
            // url query 
            const content = document.getElementById("question").value;
            fetch(`/create-question`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        questionContent: content,
                    }
                ),

            })
                .then((res)=>{
                    return res.json();

                })
                .then((data)=>{
                    if(data.success){
//redirect to question detail
                    }else{
                        window.alert(data.message);
                    }
                })
                .catch(function (error) {
                    console.log('Looks like there was a problem: \n', error);
                    window.alert(error.message)
                });
        }
    }
}