/**
 * Name:          Chat Log Controller
 * Description:   Contains the logic related to chat and communicates with the service
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
const ChatService = require('../services/chat.service');
const socketMVC = require('socket.mvc');

_this = this

exports.insertChat = async function(chat) {
    try {
        const newChat = await ChatService.insertChat(chat);

        if (newChat) { // chat is successfully inserted to database
            const populatedChat = await ChatService.getChat(newChat._id); // populates the user info of the chat and send to front-end
            socketMVC.everyone('new message', populatedChat);
        }
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAllChats = async function(req, res, next) {
    try {
        const chats = await ChatService.getAllChats();
        return res.status(200).json({status: 200, data: chats, message: "Succesfully fetched all chats", success: true});
    } catch(e){
        console.log(e);
        return res.status(400).json({status: 400, message: e.message});
    }
}
