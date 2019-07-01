const express = require('express');
const router = express.Router();

var ChatController = require('../../controllers/chat.controller');

router.get('/', ChatController.getAllChats);
router.post('/:chat', ChatController.insertChat)

module.exports = router;