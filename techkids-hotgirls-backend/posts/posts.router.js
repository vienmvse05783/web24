const express = require('express');
const PostModel = require('./posts.model');

const postRouter = express.Router();

const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

postRouter.post('/create', (req, res) => {

    console.log(req.session.currentUser)
    //check login ?
    if (req.session.currentUser && req.session.currentUser._id) {

        //validate
        const { content, imageUrl } = req.body;

        if (content.trim().length === 0) {
            res.status(400).json({
                success: false,
                message: 'Please input content',
            })
        } else if (content.trim().length > 500) {
            res.status(400).json({
                success: false,
                message: 'Content must be < 500 characters',
            })
        } else if (imageUrl.trim().length === 0) {
            res.status(400).json({
                success: false,
                message: 'Please input url',
            })
        } else if (!urlRegex.test(imageUrl)) {
            res.status(400).json({
                success: false,
                message: 'url not match',
            })
        } else {
            const newPost = {
                content: req.body.content,
                imageUrl: req.body.imageUrl,
                author: req.session.currentUser._id,
            }

            console.log(newPost);

            PostModel.create(newPost, (error, data) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                } else {
                    res.status(201).json({
                        success: true,
                        data: data,
                    })
                }
            });
        }

    } else {
        
        res.status(403).json({
            success: false,
            message: 'Unauthenticated',
        })
    }
})

postRouter.get('/get/:postId', (req, res) => {
    PostModel.findById(req.params.postId)
        .populate('author', 'email fullName')//tra ve truong nao
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err.message,
                })
            } else {
                res.status(200).json({
                    success: true,
                    data: data,
                })


            }
        })
})


module.exports = postRouter;