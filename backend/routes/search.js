const express = require("express");
const router = express.Router();
// const {getAllAudiobooks} = require("../controllers/audiobook");
const Audiobook = require("../models/audiobook");
router.get("/searchbar", async (req, res) => {
    try {
        const search = req.query.q;

        if (!search) {
            return res.status(200).json({ error: false, audiobooks: [] });
        }

        const searchCondition = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { genre: { $regex: search, $options: "i" } }
            ]
        };

        const audiobooks = await Audiobook.find(searchCondition).limit(10); // Limit results to 10 for now

        res.status(200).json({ error: false, audiobooks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
