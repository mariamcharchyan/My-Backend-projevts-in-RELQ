const express = require('express');
const user_router = express.Router();
const user = require('../controllers/user_controllers')

user_router.post('/register',user.register)
user_router.post('/login',user.login)

module.exports = user_router