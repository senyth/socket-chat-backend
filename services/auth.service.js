var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var fs = require('fs');
const bcrypt = require('bcrypt');

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

            let isExists = user.length > 0 ? true : false;
            return isExists;
    } catch (e) {
        throw e.error
    }
}

exports.login = async function(query) {
    try {
        var user = await User.findOne({username: query.username});
        let res = {};
        let token = {};
        let result = false;

        if (user) {
            result = bcrypt.compareSync(query.password, user.password);
        }

        console.log('result of bcrypt: ' + result);

        if (user && result) {
            let expiry = '1d';
            const issuer = 'chat-app';
            const authorizedUser = {
                _id: user.id,
                username: user.username
            }
            const jwtBearerToken = await generateToken(authorizedUser, expiry, issuer);

            res = { user: authorizedUser, token: jwtBearerToken, success: true };
        } else {
            console.log('invalid credentials');
            res = { user: null, token: null, success: false };
        }
        
        console.log('res');
        console.log(res);
            
        return res;
        
    } catch (e) {
        console.log('login service error');
        console.log(e);
        throw e.error
    }
}

async function generateToken(user, expiry, issuer) {
    try {
        const RSA_PRIVATE_KEY = await fs.readFileSync(__dirname + '/config/private.key');
        const jwtBearerToken = await jwt.sign(JSON.parse(JSON.stringify(user)), RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: expiry,
            subject: JSON.stringify(user._id),
            issuer: issuer
        });

    return jwtBearerToken;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.register = async function(user) {
    user.password = bcrypt.hashSync(user.password, 10);
    var newUser = new User(user);

    try {     
        var savedUser = await newUser.save();

        return savedUser;
    } catch (e) {
        throw e.error;
    }
}   