const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/auth");

// Route to handle user registration
router.post("/signup", signup);

// Route to handle user login
router.post("/login", login);

// Route to handle user logout
router.post("/logout", logout);

module.exports = router;
