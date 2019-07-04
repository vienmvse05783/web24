const express = require('express')
const path=require('path')
const app = express()
app.use(express.static('public'));
 
app.get('/', (req, res)=>{
  res.send('Hello World !!!')
});
app.get('/about', (req, res)=>{
    res.send('About Us !!')
  });
  app.get('/intro', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'));
  });
  app.listen(3000)