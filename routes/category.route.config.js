'use strict';

const categoryController = require('../controllers/category.controller');
const categoryValidator = require('../validation/schemas/category.schemas');

exports.routesconfig = (server) => {

    server.route({
        method: 'POST',
        path: '/category',
        handler: categoryController.create,
        options: {
            validate: {
                payload: categoryValidator.validate.payload
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
        path: '/category',
        handler: categoryController.getCategory,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/category/{id}',
        handler: categoryController.getOneCategory,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/category/{categoryname}/products',
        handler: categoryController.getProductBaseOnCategory,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'DELETE',
        path: '/category/{id}',
        handler: categoryController.deleteOneCategory,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

};