import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

const router = express.Router();

// Placeholder route for applications - applying authMiddleware
// TODO: Apply authMiddleware to actual application routes that require authentication
router.get('/applications', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Applications router works!' });
});

// TODO: Add actual routes for handling applications (create, get, update, delete, etc.)

export default router;
