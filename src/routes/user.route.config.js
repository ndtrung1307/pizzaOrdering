const userController = require('../controllers/user.controller');
const userValidator = require('../validation/schemas/user.schemas');
const commonValidator = require('../validation/common.Validate');


exports.routeconfig = (server) => {
   
    server.route({
        method: 'GET',
        path: '/users',
        handler: userController.getUser,
        options: {
            description: 'Get all user data AS AMIN OR Get a user data AS USER',
            notes: 'ALL USER NEED TO SIGN IN TO DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate
            },
            plugins: {
                'hapiAuthorization': {
                    roles: ['USER', 'ADMIN']
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: userController.getOneUser,
        options: {
            description: 'Get a user data by ID',
            notes: 'ONLY ADMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId
            },
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/register',
        handler: userController.register,
        options: {
            description: 'Log up a new account',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: userValidator.validate.payload_Signup
            },
            auth: false
        }
    });

    server.route({
        method: 'PUT',
        path: '/users',
        handler: userController.updateUser,
        options: {
            description: 'Change personal data of User',
            notes: 'EVERY USER NEED TO SIGN IN TO DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                payload: userValidator.validate.payload_UpdateUser
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: userController.updateUserByID,
        options: {
            description: 'Change personal data of User by ID',
            notes: 'ONLY ADMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId,
                payload: userValidator.validate.payload_UpdateUser
            },
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/users/password',
        handler: userController.UpdatePassword,
        options: {
            description: 'Change account password',
            notes: 'EVERY USER NEED TO SIGN IN TO DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                payload: userValidator.validate.payload_changePass
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/users/password/{id}',
        handler: userController.UpdatePassword,
        options: {
            description: 'Change account data by user ID',
            notes: 'ONLY ADMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId,
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
        method: 'DELETE',
        path: '/users/{id}',
        handler: userController.deleteById,
        options: {
            description: 'Delete a user by ID',
            notes: 'ONLY ADMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId
            },
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });
};