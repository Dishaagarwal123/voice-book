const express = require('express');
const router = express.Router();
const { submitReview } = require('../controllers/review');
const {authenticateToken} = require("./userAuth");

// Route to submit a review
router.post('/:id', authenticateToken, async (req, res) => {
    try {
        const review = await submitReview(req.body.audiobookId, req.body.userId, req.body);
        console.log("success review post");
        res.status(201).json(review);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(("error review post"));
    }
});

module.exports = router;
