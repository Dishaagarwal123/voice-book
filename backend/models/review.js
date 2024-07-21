const mongoose = require("mongoose");
const review = new mongoose.Schema({
    audiobookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "audiobook",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 0,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{timestamps:true});

module.exports = mongoose.model("review", review);
