const mongoose = require("mongoose");
const Audiobook = require("../models/audiobook");

const getAudiobookDetails = async (audiobookId) => {
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

    return audiobookDetails[0];
};

// Get all audiobooks with optional filtering
const getAllAudiobooks = async (filter = {}) => {
    return Audiobook.find(filter).exec();
};
// // Get all audiobooks
// const getAllAudiobooks = async () => {
//     try {
//         return await Audiobook.find();
//     } catch (error) {
//         throw new Error('Error fetching audiobooks');
//     }
// };

// Search audiobooks by title or author
const searchAudiobooks = async (query) => {
    // Create a case-insensitive regex pattern for the search query
    const regex = new RegExp(query, 'i');

    try {
        // Find audiobooks where the title or author matches the regex
        const audiobooks = await Audiobook.find({
            $or: [
                { title: { $regex: regex } },
                { author: { $regex: regex } }
            ]
        }).exec();

        return audiobooks;
    } catch (error) {
        // Handle errors, such as database connectivity issues
        console.error("Error searching audiobooks:", error);
        throw new Error("Unable to search audiobooks. Please try again later.");
    }
};


// Get filtered audiobooks based on genre, author, and rating
const filterAudiobooks = async (filters) => {
    const { genre, author, minRating, maxRating } = filters;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    if (minRating || maxRating) {
        filter.rating = {};
        if (minRating) filter.rating.$gte = minRating;
        if (maxRating) filter.rating.$lte = maxRating;
    }
    return Audiobook.find(filter).exec();
};

module.exports = {
    getAudiobookDetails,
    getAllAudiobooks,
    searchAudiobooks,
    filterAudiobooks
};