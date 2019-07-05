/**
 * Name:          Auth Controller
 * Description:   Holds the logic related to the authentication of user
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
var AuthService = require('../services/auth.service');
var socketMVC = require('socket.mvc');

_this = this

exports.authenticate = async function(req, res, next) {

    try {
        console.log('username: ' + req.body.credentials.username);
        console.log('password: ' + req.body.credentials.password);
        let user = {'username': req.body.credentials.username, 'password': req.body.credentials.password};
        const userExists = await AuthService.checkUserIfExists({username: req.body.credentials.username});
        let ret;

        console.log('userExists');

        if (userExists) {
            console.log('true');
            ret = await login(user, res); // user already exists
        }
        else {
            await register(user);
            ret = await login(user, res);
        }

        console.log('ret controller');
        console.log(ret);

        return res.status(200).json({status: ret.status, data: ret.data, message: ret.message, success: true});
                
    } catch(e){ 
        console.log('authenticate controller error');
        console.log(e);      
        return res.status(400).json({status: 400, message: e.message});        
    }
}

login = async function(user, res) {
    try {
        var user = await AuthService.login({   
                                        'username': user.username, 
                                        'password': user.password
                                    });

        if (user.user && user.token) {
            message = "Succesfully authenticated user";
        }
        else {
            message = "Invalid login credentials";
        }
        
        return {status: 200, data: user, message: message};    
    } catch(e) {       
        return res.status(400).json({status: 400, message: e.message});        
    }
}

register = async function(req) {
    try {
        let account = { 'username': req.username, 'password': req.password,  'dis': true };
        await AuthService.register(account);
    } catch(e) {
        console.log(e);
    }
}