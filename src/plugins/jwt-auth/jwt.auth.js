'use strict'

const AuthBearer = require('hapi-auth-bearer-token');
const authService = require('../../services/auth.service');
const userService = require('../../services/user.service');
const boom = require('@hapi/boom');

module.exports = {
    name: 'JWT-Authen',
    version: '1.0',
    register: (server, options) => {
        try {
            server.register(AuthBearer);

            server.auth.strategy('Bearer', 'bearer-access-token', {
                allowQueryToken: false,
                tokenType: 'Bearer',
                validate: async (request, token, h) => {

                    try {
                        const userData = await authService.decodeToken(token);
                        if(!userData.id) {
                            return {
                                isValid: false,
                                credentials: {}
                            };
                        }
                        let user = await userService.getOneUser(userData.id);

                        if (!user) throw boom.notFound('User is invalid!');

                        return {
                            isValid: true,
                            credentials: user
                        };
                    } catch (e) {
                        return {
                            isValid: false,
                            credentials: {}
                        };
                    }
                },
            });
        } catch (err) {
            throw err;
        }
    }
};