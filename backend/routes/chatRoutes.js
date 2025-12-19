const express = require('express');
const router = express.Router();
const {
    getAllMessages,
    createMessage,
    getRooms
} = require('../controllers/chatController');

router.get('/', getAllMessages);
router.post('/', createMessage);
router.get('/rooms', getRooms);

module.exports = router;

