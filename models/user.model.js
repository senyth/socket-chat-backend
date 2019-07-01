var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    dis: Boolean
},  {strict: true})

const User = mongoose.model('user', UserSchema)

module.exports = User;