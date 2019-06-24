'use strict';

const productController = require('../controllers/product.controller');
const productValidator = require('../validation/schemas/product.schemas');

exports.routesconfig = (server) => {

    server.route({
        method: 'POST',
        path: '/product',
        handler: productController.create,
        options: {
            validate: {
                payload: productValidator.validate.payload
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
        path: '/product',
        handler: productController.getProduct,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/product/{id}',
        handler: productController.getOneProduct,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'PUT',
        path: '/product/{id}',
        handler: productController.updateProduct,
        options: {
            auth: false
        }
    });


    server.route({
        method: 'DELETE',
        path: '/product/{id}',
        handler: productController.deleteOneProduct,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

};