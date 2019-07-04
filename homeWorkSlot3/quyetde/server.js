const express = require('express')
const path = require('path')
const app = express()
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./public/html/index.html'));
});
app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./public/html/ask.html'));
});
app.listen(3000)