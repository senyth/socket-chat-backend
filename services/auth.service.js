/**
 * Name:          Auth Service
 * Description:   Holds the functions to perform all queries related to the authentication of user
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

/**
 * Returns data if username already exists in database
 * @param         query
 * @return        User - contains the user
 * @author        Babie Entoma
 */
exports.checkUserIfExists = async function(query) {
    try {     
            const user = await User.find().where('username').eq(query.username)
                .and({'dis': true})
                .limit(1);

            let isExists = user.length > 0 ? true : false;
            return isExists;
    } catch (e) {
        throw e.error
    }
}

/**
 * Use to authenticate the login request
 * @param         query
 * @return        Returns the valid user, token and success value if authenticated. Returns empty user and token and success false value if invalid
 * @author        Babie Entoma
 */
exports.login = async function(query) {
    try {
        var user = await User.findOne({username: query.username});
        let res = {};
        let token = {};
        let result = false;

        if (user) {
            result = bcrypt.compareSync(query.password, user.password); // check if password matches
        }

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
            res = { user: null, token: null, success: false };
        }
 
        return res;        
    } catch (e) {
        console.log('login service error');
        console.log(e);
        throw e.error
    }
}

/**
 * Generates unique token for each authenticated user
 * @param        user, expiry, issuer
 * @return       Returns the token
 * @author       Babie Entoma
 */
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

/**
 * Insert new user to the database
 * @param         query
 * @return        new user
 * @author        Babie Entoma
 */
exports.register = async function(user) {
    // encrypt password before saving to database
    user.password = bcrypt.hashSync(user.password, 10);
    var newUser = new User(user);

    try {     
        var savedUser = await newUser.save();

        return savedUser;
    } catch (e) {
        throw e.error;
    }
}   