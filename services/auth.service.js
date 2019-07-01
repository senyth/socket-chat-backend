var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var fs = require('fs');

/**
 * Returns data if username already exists in database
 * @param         query
 * @return        User - contains the user
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
exports.checkUserIfExists = async function(query) {
    try {     
            var user = await User.find().where('username').eq(query.username)
                .and({'dis': true})
                .limit(1);

                console.log('checkIfUserExists');

            let isExists = user.length > 0 ? true : false;
            console.log(user.length);

        return isExists;
    } catch (e) {
        throw e.error
    }
}

exports.login = async function(query) {
    try {
        var user = await User.findOne(query).select('-password');
        let res = {};
        let token = {};

        if (user) {
            const jwtBearerToken = await generateToken(user);
            res = { user: user, token: jwtBearerToken, success: true };
        }
        else {
            // invalid credentials
            res = { user: user, token: token, success: false };
        }
        return res;
        
    } catch (e) {
        throw e.error
    }
}

async function generateToken(user) {
    try {
    const RSA_PRIVATE_KEY = fs.readFileSync(__dirname + '/config/private.key');
    const jwtBearerToken = jwt.sign(user.toJSON(), RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        subject: JSON.stringify(user._id)
    });

    return jwtBearerToken;
    } catch(e) {
        throw e.error
    }
}

exports.register = async function(user) {
    console.log('user details');
    console.log(user);
    var newUser = new User(user);

    try {     
        var savedUser = await newUser.save();

        return savedUser;
    } catch (e) {
        console.log('register service error');
        console.log(e.message);
        console.log(e.error);
        throw e
    }
}