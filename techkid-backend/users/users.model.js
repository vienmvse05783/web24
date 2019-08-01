const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    }
});
const UsersModel= mongoose.model('User',userSchema);
module.exports=UsersModel;