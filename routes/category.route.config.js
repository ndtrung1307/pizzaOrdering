'use strict';

const categoryController = require('../controllers/category.controller');
const categoryValidator = require('../validation/schemas/category.schemas');

exports.routesconfig = (server) => {

    server.route({
        method: 'GET',
        path: '/categories',
        handler: categoryController.getCategory,
        options: {
            description: 'Get all category of products',
            notes: 'Get All category of products - EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/categories/{id}',
        handler: categoryController.getOneCategory,
        options: {
            description: 'Get a category by ID',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'POST',
        path: '/categories',
        handler: categoryController.create,
        options: {
            description: 'Create a new category',
            notes: 'ONLY AMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: categoryValidator.validate.payload_create
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
        path: '/categories/{id}',
        handler: categoryController.updateByID,
        options: {
            description: 'Update info of category',
            notes: 'ONLY AMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: categoryValidator.validate.payload_update
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
        path: '/categories/{id}',
        handler: categoryController.deleteOneCategory,
        options: {
            description: 'Delete a category by ID',
            notes: 'ONLY ADMIN CAN DO THIS ACTION',
            tags: ['api'],
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

};