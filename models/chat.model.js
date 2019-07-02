/**
 * Name:          Chat  Model
 * Description:   Model that contains the fields for chat
 * Developer:     Babie Entoma
 * Date:          07/02/2019
 */

var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    message: String,
    timestamp: Date,
    dis: Boolean
},  {strict: true})

const Chat = mongoose.model('chat', ChatSchema)

module.exports = Chat;