'use strict';

const hapiAutho = require('hapi-authorization');

module.exports = {
    name: 'Hapi-Autho',
    version: '1.0',
    register: (server, options) => {
        try {
            hapiAutho.options = {
                roles: ['ADMIN', 'USER']
            };
            server.register(hapiAutho);

        } catch (err) {
            throw err;
        }
    }
};