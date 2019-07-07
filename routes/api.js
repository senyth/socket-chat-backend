/**
 * Name:          API Route
 * Description:   Holds all the routes of the application
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
const express = require('express');
const router = express.Router();

const chats = require('./api/chat.route')
const auth = require('./api/auth.route');
const auth_guard = require('../middlewares/auth_guard'); 

router.use('/auth', auth);
router.use('/chats', auth_guard, chats);

module.exports = router;