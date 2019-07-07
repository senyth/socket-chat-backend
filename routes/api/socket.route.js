/**
 * Name:          Socket Route
 * Description:   Holds all the routes related to sockets
 * Developer:     Babie Entoma
 * Date:          07/01/2019
 */
const socketMVC = require('socket.mvc');
const ChatController = require('../../controllers/chat.controller');

module.exports = function (socket) {

    socket.on('message', async function(data) {
        await ChatController.insertChat(data);
    });

    socket.on('typing', (data) => {
        socketMVC.everyone('typing',  {user: data.user, isTyping: data.isTyping});
    });

};