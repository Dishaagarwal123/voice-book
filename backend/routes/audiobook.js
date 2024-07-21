const express = require("express");
const router = express.Router();
const { getAudiobookDetails, getAllAudiobooks, searchAudiobooks, filterAudiobooks } = require("../controllers/audiobook");

// Get audiobook details by ID
router.get("/:id", async (req, res) => {
    try {
        const audiobook = await getAudiobookDetails(req.params.id);
        res.json(audiobook);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all audiobooks
router.get("/", async (req, res) => {
    try {
        const audiobooks = await getAllAudiobooks();
        res.json(audiobooks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Search audiobooks
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        const audiobooks = await searchAudiobooks(query);
        res.json(audiobooks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Filter audiobooks
router.get("/filter", async (req, res) => {
    try {
        const filters = req.query;
        const audiobooks = await filterAudiobooks(filters);
        res.json(audiobooks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
