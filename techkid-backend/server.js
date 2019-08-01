const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter=require('./users/users.router')
const session= require("express-session")

mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', { useNewUrlParser: true },(error) => {
    if (error) {
        throw error;
    } else {
        console.log('connect to mgDB success!')
        const app = express();

        app.use(bodyParser.json());
        app.use(session)({
            secret: 'keyboard cat',
        })
        //router
        // /users/test
        app.use('/users',userRouter)
        // start server
        app.listen(3001), (err) => {
            if(error){
                throw err;
            }
            console.log('Server listen on port 30001...')
        };
    }
})