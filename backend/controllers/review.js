const Review = require('../models/review');
const Audiobook = require('../models/audiobook');
const submitReview = async (audiobookId, userId, reviewData) => {
    // Check if the user has already submitted a review
    const existingReview = await Review.findOne({ audiobookId, userId });

    if (existingReview) {
        // Update the existing review
        await Review.updateOne(
            { _id: existingReview._id },
            { $set: reviewData }
        );

        // update audiobook with new average rating and review count
        await updateAudiobookRating(audiobookId);

        return existingReview;
    } else {
        // Create a new review
        const newReview = new Review({
            audiobookId: audiobookId,
            userId: userId,
            rating: reviewData.rating,
            comment: reviewData.comment,
            createdAt: reviewData.createdAt,
        });
        await newReview.save();

        // update audiobook with average rating and review count
        await updateAudiobookRating(audiobookId);

        return newReview;
    }
};
const updateAudiobookRating = async (audiobookId) => {
    const reviews = await Review.find({ audiobookId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Audiobook.updateOne(
        { _id: audiobookId },
        { $set: { averageRating: averageRating, reviewsCount: reviews.length } }
    );
};

module.exports = { submitReview };
