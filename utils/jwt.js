require('dotenv').config();
const jwt = require('jsonwebtoken');

const config = {
   secret: process.env.SECRET,
   exp: 10800
}

exports.config = config;

exports.verifyToken = (token) => jwt.verify(tocket, config.secret);

exports.createToken = (data) => jwt.sign(data, config.secret, { expiresIn: config.exp });
