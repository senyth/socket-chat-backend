const express = require('express');
const router = express.Router();

// var users = require('./api/user.route')
var chats = require('./api/chat.route')
var auth = require('./api/auth.route');
var auth_guard = require('../middlewares/auth_guard'); 

router.use('/auth', auth);
// router.use('/users', auth_guard, users)
router.use('/chats', auth_guard, chats)

module.exports = router;