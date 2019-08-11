const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const userModel = mongoose.model('User', UserSchema);//ten va map voi schema

module.exports = userModel;