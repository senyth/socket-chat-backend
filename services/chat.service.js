/**
 * Name:          Chat Service
 * Description:   Holds the functions to perform all queries related to chats
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
var Chat = require('../models/chat.model');
var User = require('../models/user.model');

_this = this

/**
 * Insert chat  in database
 * @param         chat - contains the chat data
 * @return        savedChat - contains the saved chat
 * @author        Babie Entoma
 */
exports.insertChat = async function(chat) {
    try {
        const newChat = new Chat(chat);
        var savedChat = newChat.save();
        return savedChat;
    } catch (e) {
        throw Error(e);
    }
}

exports.getChat = async function(id) {
    try {     
        var chat = await Chat.findOne({ dis: true, _id: id }).sort({ timestamp: 1 }).populate('user', '_id username');
        console.log('get chat');
        console.log(chat);
         return chat;
     } catch (e) {
         console.log('error in chat service');
         console.log(e);
         throw Error(e);
     }
}

exports.getAllChats = async function() {
    try {     
       var chats = await Chat.find({ dis: true }).sort({ timestamp: 1 }).populate('user', '_id username');
       console.log(chats);
        return chats;
    } catch (e) {
        console.log('error in chat service');
        console.log(e);
        throw Error(e);
    }
}