const mongoose = require("mongoose");
const Audiobook = require("../models/audiobook");

// Get details of a specific audiobook by ID
const getAudiobookDetails = async (audiobookId) => {
    try {
        const audiobookDetails = await Audiobook.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(audiobookId) }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "audiobookId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: "$reviews.rating" },
                    reviewsCount: { $size: "$reviews" }
                }
            },
            {
                $addFields: {
                    averageRating: { $ifNull: ["$averageRating", 0] },
                    reviewsCount: { $ifNull: ["$reviewsCount", 0] }
                }
            }
        ]);

        if (audiobookDetails.length === 0) {
            throw new Error("Audiobook not found");
        }

        return audiobookDetails[0];
    } catch (error) {
        console.error("Error fetching audiobook details:", error);
        throw new Error("Unable to fetch audiobook details. Please try again later.");
    }
};

// Get all audiobooks with optional filtering
const getAllAudiobooks = async (filter = {}) => {
    try {
        return await Audiobook.find(filter).exec();
    } catch (error) {
        console.error("Error fetching all audiobooks:", error);
        throw new Error("Unable to fetch audiobooks. Please try again later.");
    }
};

module.exports = {
    getAudiobookDetails,
    getAllAudiobooks
};
