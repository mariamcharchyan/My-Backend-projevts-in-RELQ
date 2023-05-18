const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET

function generateAccessToken(username,id) {

    return jwt.sign({username,id}, SECRET, { expiresIn: '36000s' });
}


module.exports={generateAccessToken}