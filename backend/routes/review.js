const express = require('express');
const router = express.Router();
const { submitReview } = require('../controllers/review');
const {authenticateToken} = require("./userAuth");

// Route to submit a review
router.post('/:id', authenticateToken, async (req, res) => {
    try {
        const review = await submitReview(req.audiobookId, req.userId, req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
