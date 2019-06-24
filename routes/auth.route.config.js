const authController = require('../auth/controllers/authentication.controller');
// const personValidation = require('../validation/schemas/user.schemas');



exports.routeconfig = (server) => {
    server.route({
        method: 'POST',
        path: '/auth',
        handler: authController.login,
        options: {
        //     validate: {
        //         payload: personValidation.validate.payload
        //     },
            auth: false
        }
    });
};  