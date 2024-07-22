const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default:"user",
    },
});

module.exports = mongoose.model("user", user);