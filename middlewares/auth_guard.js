/**
 * Name:          Auth Guard
 * Description:   Uses JWT to check if there is a token and if it is valid
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

const RSA_PUBLIC_KEY = fs.readFileSync(path.dirname(require.main.filename) + '/services/config/public.key');

module.exports = (req,res, next) => {
    var header = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];

    if (header) {
        var parts = header.split(' ');
        var token = parts[1];

        jwt.verify(token, RSA_PUBLIC_KEY, function(err, decoded) {
            if (err) { 
                // failed verification due to expired token
                return res.status(403).json('Authorization failed. Expired token.');
            }
            //no error, proceed
            next(); 
        });
    } else {
        // forbidden without token
        return res.status(401).json('Unauthorized access. No credentials found.');
    }
}