/**
 * Name:          Chat Route
 * Description:   Holds all the routes related to chats
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
const express = require('express');
const router = express.Router();

const ChatController = require('../../controllers/chat.controller');

router.get('/', ChatController.getAllChats);
router.post('/getNewMessage', ChatController.insertChat);

module.exports = router;