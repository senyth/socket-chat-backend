/**
 * Name:          Chat Log Controller
 * Description:   Contains the logic related to chat and communicates with the service
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
var ChatService = require('../services/chat.service');
var socketMVC = require('socket.mvc');

_this = this

exports.insertChat = async function(chat) {
    try {
        console.log('insert chat');
        console.log(chat);
        var newChat = await ChatService.insertChat(chat);
        if (newChat) { // chat is successfully inserted to database
            socketMVC.everyone('new message', newChat);
        }
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAllChats = async function(req, res, next) {
    try {
        var chats = await ChatService.getAllChats();
        return res.status(200).json({status: 200, data: chats, message: "Succesfully fetched all chats", success: true});
    } catch(e){
        console.log(e);
        return res.status(400).json({status: 400, message: e.message});
    }
}
