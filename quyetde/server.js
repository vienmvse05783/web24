const express = require(`express`);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionModel = require('./models/question.model');


mongoose.connect('mongodb://localhost:27017/quyetde', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("connect success ");
    const app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/index.html'));
    });

    app.get('/ask', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
    });



    // app.post('/create-question', (req, res) => {
    //   // save question to database
    //   // questionContent
    //   // like
    //   // dislike
    //   // createdAt

    //   // save newQuestion
    //   fs.readFile('./data.json', (error, data) => {
    //     if (error) {
    //       res.status(500).json({
    //         success: false,
    //         message: error.message,
    //       });
    //     } else {
    //       const questionList = JSON.parse(data);
    //       const newQuestionId = new Date().getTime();
    //       const newQuestion = {
    //         id: newQuestionId,
    //         questionContent: req.body.questionContent,
    //         like: 0,
    //         dislike: 0,
    //         createdAt: new Date().toString(),
    //       };
    //       questionList.push(newQuestion);

    //       fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
    //         if (error) {
    //           res.status(500).json({
    //             success: false,
    //             message: error.message,
    //           });
    //         } else {
    //           res.status(201).json({
    //             success: true,
    //             id: newQuestionId,
    //           });
    //         }
    //       });
    //     }
    //   });
    // });
    app.post('/create-question', (req, res) => {
      questionModel.create({
        questionContent: req.body.questionContent,
      }, (err,data) => {
        console.log(err)
        console.log(data)
        if(err){
          res.status(500).json({
            success: false,
            message: err.message,
          })
        }else{
          res.status(201).json({
            success:true,
            id: data._id,
          })

        }
       });
    })

    app.get('/question/:questionId', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/detail-question.html'));
    })

    app.post('/get-question', (req, res) => {

      // fs.readFile('./data.json', (error, data) => {
      //   if (error) {
      //     res.status(500).json({
      //       success: false,
      //       message: error.message,
      //     });
      //   } else {
      //     const questionList = JSON.parse(data);
      //     var questionId = req.body.questionId;
      //     var question = {};
      //     for (var key in questionList) {
      //       if (questionList[key].id == questionId) {
      //         question = {
      //           id: questionList[key].id,
      //           questionContent: questionList[key].questionContent,
      //           like: questionList[key].like,
      //           dislike: questionList[key].dislike,
      //         };
      //         break;
      //       }
      //     }
      //     res.status(201).json({
      //       success: true,
      //       id: question.id,
      //       questionContent: question.questionContent,
      //       like: question.like,
      //       dislike: question.dislike,
      //     });


      //   }
      // });
    });

    app.post('/get-random-question', (req, res) => {

      fs.readFile('./data.json', (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          const questionList = JSON.parse(data);
          var randomQuestion = Math.floor(Math.random() * (questionList.length));

          var question = {};
          for (var key in questionList) {
            if (key == randomQuestion) {
              question = {
                id: questionList[key].id,
                questionContent: questionList[key].questionContent,
                like: questionList[key].like,
                dislike: questionList[key].dislike,
              };
              break;
            }
          }
          res.status(201).json({
            success: true,
            id: question.id,
            questionContent: question.questionContent,
            like: question.like,
            dislike: question.dislike,
          });
        }
      });
    });

    app.post('/updateLike-question', (req, res) => {
      // update newQuestion
      fs.readFile('./data.json', (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          const questionList = JSON.parse(data);
          const id = req.body.id;

          for (var key in questionList) {
            if (questionList[key].id == id) {
              questionList[key].like += 1;
              break;
            }
          }
          fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
            if (error) {
              res.status(500).json({
                success: false,
                message: error.message,
              });
            } else {
              res.status(201).json({
                success: true,
                id: id,
              });
            }
          });
        }
      });
    });

    app.post('/updateDislike-question', (req, res) => {
      // update newQuestion
      fs.readFile('./data.json', (error, data) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          const questionList = JSON.parse(data);
          const id = req.body.id;

          for (var key in questionList) {
            if (questionList[key].id == id) {
              questionList[key].dislike += 1;
              break;
            }
          }
          fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
            if (error) {
              res.status(500).json({
                success: false,
                message: error.message,
              });
            } else {
              res.status(201).json({
                success: true,
                id: id,
              });
            }
          });
        }
      });
    });

    app.listen(3000);
  }
});

// routers
