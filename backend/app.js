const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const conn = require("./conn/conn");

// const audiobookRoutes = require("./routes/audiobook");
// const reviewRoutes = require("./routes/review");
// const authRoutes = require("./routes/auth"); 

app.use(express.json());

// app.use("/audiobook", audiobookRoutes);
// // app.use("/review", reviewRoutes);
// // app.use("/auth", authRoutes); 

// app.listen(process.env.PORT, () => {
//     console.log(`Server started at ${process.env.PORT}`);
// });

// const audiobookRoutes = require("./routes/audiobook");
// app.use(express.json());
// app.use("/audiobook", audiobookRoutes);
// const seedData = require("./mock_data/seed");
// seedData().then(() => {
//     app.listen(process.env.port, () => {
//         console.log(`Server started at ${process.env.port}`);
//     });
// }).catch(error => {
//     console.error("Error seeding database:", error);
// });
// const authRoutes = require("./routes/auth");

// app.use("/auth", authRoutes);
app.use(cors());

conn().then(() => {
    app.use(express.json());
    app.use("/audiobook", require("./routes/audiobook"));
    // app.use("/review", require("./routes/review"));
    // app.use("/auth", require("./routes/auth")); 
    // app.use('/user', require("./routes/user"));
    app.listen(process.env.port, () => {
        console.log(`Server started at ${process.env.port}`);
    });
}).catch(error => {
    console.error("Failed to connect to database:", error);
});
// app.get("",(req,res)=>{
//     res.send("hi from backend");
// });

// app.listen(process.env.port,()=>{
//     console.log(`server started at ${process.env.port}`);
// });