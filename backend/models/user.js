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
    avatar:{
        type:String,
        default:"https://cdn.onlinewebfonts.com/svg/img_181369.png",
    },
});

module.exports = mongoose.model("user", user);