function submit(){
    document.getElementsByClassName("btn btn-primary form-control").addEventListener("click", function(event){
        event.preventDefault()
        const keyword= document.querySelector("#keyword")
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`)
        .then(response => response.json())
        .then(data => {
          console.log(data) // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    
      });
}
