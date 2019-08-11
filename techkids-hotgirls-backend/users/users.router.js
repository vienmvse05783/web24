const express = require('express');
const UserModel = require('./users.model')
const bcryptjs = require('bcryptjs');

const userRouter = express.Router();
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

userRouter.get('/test', (req, res) => {
    console.log('Current User:', req.session.currentUser);
    res.json({
        success: true,
        abc: req.session.currentUser,
    });
});

userRouter.post('/register', (req, res) => {
    //get email,...
    const { email, password, fullName } = req.body;

    // validate
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({
            success: false,
            message: 'Invalid email address',
        })
    }

    else if (!password || password.length < 6) {
        res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters',
        })
    } else if (!fullName) {
        res.status(400).json({
            success: false,
            message: 'Please input fullname',
        })
    } else {
        //check email...
        UserModel.findOne({ email: email }, (err, data) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err.message,
                })
            } else if (data) {
                res.status(400).json({
                    success: false,
                    message: 'Email has been used!',
                })
            } else {
                //hash password
                const hashPassword = bcryptjs.hashSync(password, 10);

                //save to db
                UserModel.create({
                    ...req.body,
                    password: hashPassword,
                }, (e, newUser) => {
                    if (e) {
                        res.status(500).json({
                            success: false,
                            message: e.message,
                        });
                    } else {
                        res.status(201).json({
                            success: true,
                            data: {
                                ...newUser._doc,
                                password: '',
                            },
                        })
                    }
                })
            }
        })
    }


});


userRouter.post('/login', (req, res) => {
    //get mail and pw
    const { email, password } = req.body;

    //check email exist
    UserModel.findOne({ email: email }, (err, data) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            })
        } else if (!data) {
            res.status(400).json({
                success: false,
                message: 'Email not Exist!',
            })
        } else {
            //compare pw
            const comparePass = bcryptjs.compareSync(password, data.password);
            // console.log(comparePass);
            if (!comparePass) {
                res.status(400).json({
                    success: false,
                    message: 'Password is not correct',
                })
            } else {
                //save current user info to session storage
                req.session.currentUser = {
                    _id: data._id,
                    email: data.email,
                    fullName: data.fullName,
                    createdDate: data.createdAt,
                }

                res.status(201).json({
                    success: true,
                    message: 'Login success!',
                    data: {
                        email: data.email,
                        fullName: data.fullName,
                    },
                })

            }
        }
    })
})

userRouter.get('/logout', (req, res) => {
    //get mail and pw
    req.session.destroy((err) => {
        if(err){
            res.status(500).json({
                success:false,
                message: err.message,
            })
        } else {
            res.status(201).json({
                success: true,
                message: 'logout success!',
            })
        }
      })
})

userRouter.post('/profile', (req, res) => {
    //get mail and pw
    if(!req.session.currentUser){
        res.status(400).json({
            success: false,
        })
    } else{
        console.log(req.session.currentUser);
        res.status(201).json({
            success: true,
            data: req.session.currentUser,
        })
    }
    
})

module.exports = userRouter;