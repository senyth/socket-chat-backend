/**
 * Name:          Authenticate Route
 * Description:   Holds all the routes related to the authentication of user
 * Developer:     Babie Entoma
 * Date:          06/28/2019
 */
const express = require('express');
const router = express.Router();

var AuthController = require('../../controllers/auth.controller');

router.post('/users/authenticate', AuthController.authenticate)


module.exports = router;