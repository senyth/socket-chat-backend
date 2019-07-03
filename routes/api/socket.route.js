// let io = require('../../server');
var socketMVC = require('socket.mvc');
var ChatController = require('../../controllers/chat.controller');

module.exports = function (socket) {
    //You can declare all of your socket listeners in this file, but it's not required
 
    socket.on('login', function() {
        console.log('logged in')
    });

    socket.on('message', async function(data) {
        console.log('new message');
        await ChatController.insertChat(data);
    });
};