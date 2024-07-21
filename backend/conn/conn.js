const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = conn;
