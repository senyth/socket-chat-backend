/**
 * Name:          Chat Log Controller
 * Description:   Contains the logic related to chat and communicates with the service
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
var ChatService = require('../services/chat.service')

_this = this

exports.insertChat = async function(req, res, next) {
    var chat = req.body.chat;

    try {
        var chat = await ChatService.insertChat(chat);
        return res.status(200).json({status: 200, data: chat, message: "Successfully inserted a chat mesage"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAllChats = async function(req, res, next) {
    try {
        var chats = await ChatService.gatAllChats();
        return res.status(200).json({status: 200, data: customer, message: "Succesfully get all chats"});
    } catch(e){
        return res.status(400).json({status: 400, message: e.message});
        
    }
}
