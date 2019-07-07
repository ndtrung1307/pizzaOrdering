const jwt = require('jsonwebtoken');
const config = require('../common/config/env.config');
const jwtDecode = require('jwt-decode');

module.exports = {
    createToken: async (user) => {
        // Sign the JWT
        return jwt.sign({
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone
        }, config.jwt_secret, {
            algorithm: 'HS256',
            expiresIn: "1h"
        });
    },
    decodeToken: async (token) => {
        return await jwtDecode(token);
    }
};