//createdAt: Date
//content: string
//views: number, default: 0
//imageUrl: string
//author: User

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({ 
    content: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const PostModel = mongoose.model('Post', PostSchema);//ten va map voi schema

module.exports = PostModel;