const mongoose = require("mongoose");
const audiobook = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model("audiobook", audiobook);
