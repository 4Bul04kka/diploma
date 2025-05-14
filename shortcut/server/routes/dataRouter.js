import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

const router = express.Router();

// Placeholder route for data - applying authMiddleware
// TODO: Apply authMiddleware to actual data routes that require authentication
router.get('/data', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Data router works!' });
});

// TODO: Add actual routes for handling data

export default router;
