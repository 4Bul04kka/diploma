import express from 'express';

const router = express.Router();

// Placeholder route for data
router.get('/data', (req, res) => {
    res.status(200).json({ message: 'Data router works!' });
});

// TODO: Add actual routes for handling data

export default router;
