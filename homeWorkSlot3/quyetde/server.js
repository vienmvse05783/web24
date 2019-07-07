const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static('public'));
app.use(bodyParser.json());
const fs = require('fs')


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});
app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
});
app.post('/create-question', (req, res) => {
    console.log(req.body);
    //save question in database 
    //questionContent
    //like
    //dislike
    //createAt 

    //save new question 
    fs.readFile("./data.json", { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.json({
                success: false,
                message: error.message,
            })
        } else {
            const questionList = JSON.parse(data);
            const newQuestionId = new Date().getTime();
            const newQuestion = {
                id: newQuestionId,
                questionContent: req.body.questionContent,
                like: 0,
                dislike: 0,
                createAt: new Date().toString(),
            };
            questionList.push(newQuestion);

            fs.writeFile("./data.json", JSON.stringify(questionList),{encoding:"utf8"}, (error) => {
                if (error) {
                    res.json({
                        success: false,
                        message: error.message,
                    })
                } else {
                    res.json({
                        id: newQuestionId,
                        success: true,

                    })
                }
            })
        }

    })

});

app.listen(3000)