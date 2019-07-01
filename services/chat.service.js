/**
 * Name:          Chat Service
 * Description:   Holds the functions to perform all queries related to chats
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
var Chat = require('../models/chat.model')

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
        throw Error(e)
    }
}

exports.getAllChats = async function(query) {
    var options = {
        dis: true,
        sort: {reg_datetime: -1}
    }

    try {     
       var chats = await Chat.find(query, options);
        return chats;
    } catch (e) {
        throw e.error
    }
}