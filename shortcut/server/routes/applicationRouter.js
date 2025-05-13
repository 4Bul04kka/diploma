import express from 'express';

const router = express.Router();

// Placeholder route for applications
router.get('/applications', (req, res) => {
    res.status(200).json({ message: 'Applications router works!' });
});

// TODO: Add actual routes for handling applications (create, get, update, delete, etc.)

export default router;
