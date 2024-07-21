const mongoose = require("mongoose");
const Audiobook = require("../models/audiobook");
const Review = require("../models/review");

const seedData = async () => {
    await mongoose.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await Audiobook.deleteMany({});
    await Review.deleteMany({});

    const audiobook = new Audiobook({
        title: "Sample Audiobook",
        author: "Sample Author",
        genre: "Fiction",
        coverImage: "https://example.com/sample-cover.jpg",
        description: "This is a sample audiobook description."
    });

    await audiobook.save();

    const review = new Review({
        audiobookId: audiobook._id,
        userId: new mongoose.Types.ObjectId(), // Mock user ID
        rating: 4,
        comment: "Great audiobook!"
    });

    await review.save();

    console.log("Database seeded successfully");
    mongoose.connection.close();
};

module.exports = seedData;  // Ensure this line is correct
