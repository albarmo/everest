"use strict";
const jwt = require('jsonwebtoken');
const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};
const verifyToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
};
module.exports = {
    generateAccessToken,
    verifyToken,
};
