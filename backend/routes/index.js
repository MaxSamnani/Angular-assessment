const express = require('express');
const router = express.Router();
const chartRoutes = require('./chartRoutes');
const chatRoutes = require('./chatRoutes');
const { initializeProject } = require('../controllers/initController');

// Health check
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

// Initialize project
router.get('/init', initializeProject);

// API routes
router.use('/charts', chartRoutes);
router.use('/chat', chatRoutes);

module.exports = router;

