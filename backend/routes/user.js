// const express = require('express');
// const router = express.Router();
// const User = require('../models/user'); // Adjust path as necessary

// // Endpoint to get the current user
// router.get('/current', async (req, res) => {
//     const userId = req.userId; // Assuming you're using middleware to set req.userId

//     if (!userId) {
//         return res.status(401).json({ message: 'Not authenticated' });
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;
