'use strict';

const userController = require('../controllers/user.controller');
const userValidator = require('../validation/schemas/user.schemas');


exports.routeconfig = (server) => {
   
    server.route({
        method: 'POST',
        path: '/register',
        handler: userController.register,
        options: {
            validate: {
                payload: userValidator.validate.payload_Signup
            },
            auth: false
        }
    });

    // server.route({
    //     method: 'PUT',
    //     path: '/user/{id}',
    //     handler: userController.UpdatePasswordUserAsAdmin,
    //     options: {
    //         validate: {
    //             payload: personValidation.validate.payload_changePass
    //         },
    //         plugins: {
    //             'hapiAuthorization': {
    //                 role: 'ADMIN'
    //             }
    //         }
    //     }
    // });

    server.route({
        method: 'PUT',
        path: '/user/password',
        handler: userController.UpdatePassword,
        options: {
            validate: {
                payload: userValidator.validate.payload_changePass
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/user/password/{id}',
        handler: userController.UpdatePassword,
        options: {
            validate: {
                payload: userValidator.validate.payload_changePass
            },
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/user',
        handler: userController.getUser,
        options: {
            plugins: {
                'hapiAuthorization': {
                    roles: ['USER', 'ADMIN']
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/user/{id}',
        handler: userController.getOneUser,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/user/{id}',
        handler: userController.deleteById,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });
};