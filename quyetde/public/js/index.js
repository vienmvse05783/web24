var questionId;

fetch(`/get-random-question`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },

})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.success) {
      questionId = data.id;
      const totalVote = data.like + data.dislike;
      document.getElementById('question-content').innerHTML = data.questionContent;
      document.getElementById('question-vote').innerHTML = totalVote + ' vote';
      
    } else {
      window.alert(data.message);
    }
  })
  .catch((error) => {
    console.log(error);
    window.alert(error.message);
  });
    //like
  function updateLike() {
    fetch(`/updateLike-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: questionId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          //redirect to question detail
          window.location.href = "/question/" + data.id;
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }

  //Dislike
  function updateDislike() {
    fetch(`/updateDislike-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: questionId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          //redirect to question detail
          window.location.href = "/question/" + data.id;
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }