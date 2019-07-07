/**
 * Name:          User  Model
 * Description:   Model that contains the fields for user
 * Developer:     Babie Entoma
 * Date:          06/29/2019
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    dis: Boolean
},  {strict: true})

const User = mongoose.model('user', UserSchema)

module.exports = User;