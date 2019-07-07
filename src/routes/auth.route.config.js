const authController = require('../auth/controllers/authentication.controller');
const userValidation = require('../validation/schemas/user.schemas');



exports.routeconfig = (server) => {
    server.route({
        method: 'POST',
        path: '/auth',
        handler: authController.login,
        options: {
            description: 'Login User account',
            notes: 'Returns a token to authenticate user',
            tags: ['api'],
            validate: {
                payload: userValidation.validate.payload
            },
            auth: false
        }
    });
};  