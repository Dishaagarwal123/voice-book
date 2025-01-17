const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {return res.json({message:"Authentication token required"});}

    jwt.verify(token, "bookStore123", (err, user) => {
        if (err) {return res.json({message:"Authentication token expired! please login again"});}
        req.user = user;
        next();
    });
};

module.exports = {authenticateToken};
