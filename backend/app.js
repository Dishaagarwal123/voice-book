const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const conn = require("./conn/conn");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Adjust to match your frontend URL
}));

conn().then(() => {
    app.use(express.json());
    app.use("/audiobook", require("./routes/audiobook"));
    app.use("/review", require("./routes/review"));
    app.use("/auth", require("./routes/auth")); 
    // app.use('/user', require("./routes/user"));
    app.listen(process.env.port, () => {
        console.log(`Server started at ${process.env.port}`);
    });
}).catch(error => {
    console.error("Failed to connect to database:", error);
});
