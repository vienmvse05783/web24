const express = require('express')
const UserModel = require('./users.model')
var bcryptjs = require('bcryptjs');
const userRouter = express.Router();
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
userRouter.get('/test', (req, res) => {
    res.json({
        success: true
    })
})
userRouter.post('/register', (req, res) => {
    // get email form
    const { email, password, fullname } = req.body;

    //Validate check email, pw, fullName 
    console.log(email);
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({
            success: false,
            message: "Invalid email"
        })
    }
    else if (!password || password.length < 6) {
        res.status(400).json({
            success: false,
            message: "password must be least 6 character"
        })
    }
    else if (!fullname) {
        res.status(400).json({
            success: false,
            message: "plese input fullName"
        })
    }

    //check email exits
    UserModel.findOne({ email: email }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        } else if (data) {
            res.status(400).json({
                success: false,
                message: "Email has been used"
            })
        } else {
            //hash password
            const hashPassword = bcryptjs.hashSync(password, 10);
            //save to db 
            UserModel.create({
                ...req.body,
                password: hashPassword,
            }, (err, newUser) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    })
                } else {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...newUser._doc,
                            password: '',
                        }

                    })
                }
            })
        }
    })



})

userRouter.post('/login', (req, res) => {
    //get email,pass
    const { email, password } = req.body;
    //check email exits
    UserModel.findOne({ email: email }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })

            //compare password
        }
        else if (!data) {
            res.status(500).json({
                success: false,
                message: "not found user !"
            })
        }
        else if (data) {
            if (bcryptjs.compareSync(data.password, password)) {

                //save current user info to session 
                req.session.currentUser = {
                    _id: data._id,
                    _email: data.email,
                    _fullName: data.fullname,
                }
                res.status(201).json({
                    success: true,
                    message: "login success!"
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "password wrong!"
                })
            }

        }
    })
})
userRouter.get('/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if(err){
            res.status(500).json({
                success:false,
                message: err.message
            })
        }else{
            res.status(200).json({
                success:false,
                message: "logout sucess! "
            })
        }
      })
})
module.exports = userRouter