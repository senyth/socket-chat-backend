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
 * Insert chat in database
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

/**
 * Selects a specific chat in database
 * @param         id - id of the chat to be selected
 * @return        chat - contains the details of the chat
 * @author        Babie Entoma
 */
exports.getChat = async function(id) {
    try {     
        var chat = await Chat.findOne({ dis: true, _id: id }).sort({ timestamp: 1 }).populate('user', '_id username');
         return chat;
     } catch (e) {
         console.log('error in chat service: getChat()');
         console.log(e);
         throw Error(e);
     }
}

/**
 * Selects all chats in database
 * @return        chats - contains all chats in database
 * @author        Babie Entoma
 */
exports.getAllChats = async function() {
    try {     
       var chats = await Chat.find({ dis: true }).sort({ timestamp: 1 }).populate('user', '_id username');
        return chats;
    } catch (e) {
        console.log('error in chat service: getAllChats()');
        console.log(e);
        throw Error(e);
    }
}