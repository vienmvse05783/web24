window.onload = () => {

    var pathName = window.location.pathname.split("/");
    var id = pathName[2];

  fetch(`/get-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      questionId: id,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        var totalVote = data.like + data.dislike;
        var likePercent;
        var dislikePercent;
        if(totalVote == 0){
          likePercent = 50;
          dislikePercent = 50;
        } else {
          likePercent = (data.like / totalVote) * 100;
          dislikePercent = (data.dislike / totalVote) * 100;
        }
        
        const inputContainerElement = document.querySelector('.detail-container');
        if (inputContainerElement) {
          inputContainerElement.insertAdjacentHTML(
            'beforeend',
            `<div class='question-content' style='text-align: center;'>${data.questionContent}</div> <br> <br>`,
          )
          inputContainerElement.insertAdjacentHTML(
            'beforeend',
            `<div class='question-vote' style='text-align: center;'>${totalVote} vote</div> <br> <br>`,
          )
          inputContainerElement.insertAdjacentHTML(
            'beforeend',
            `<div class='question-answer-right' style='display: inline-block;margin-left: 25%;'>${likePercent}%</div>`,
          )
          inputContainerElement.insertAdjacentHTML(
            'beforeend',
            `<div class='question-answer-wrong' style='display: inline-block;margin-left: 50%;'>${dislikePercent}%</div>`,
          )
          inputContainerElement.insertAdjacentHTML(
            'beforeend',
            `<div class='other-question' style='margin-left: 46%;'><button type="button" 
            onclick="window.location.href='/'">Cau hoi khac</button></div>`,
          )
        }
      } else {
        window.alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    });
}