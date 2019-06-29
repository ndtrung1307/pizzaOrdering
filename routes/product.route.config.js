const productController = require('../controllers/product.controller');
const productValidator = require('../validation/schemas/product.schemas');
const Joi = require('@hapi/joi');

exports.routesconfig = (server) => {

    server.route({
        method: 'GET',
        path: '/products',
        handler: productController.getProduct,
        options: {
            description: 'Get all products',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/products/{id}',
        handler: productController.getOneProduct,
        options: {
            description: 'Get a product by ID',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/categories/{categoryname}/products',
        handler: productController.getProductBaseOnCategory,
        options: {
            description: 'Get all products of a category base on Category Name',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'POST',
        path: '/products',
        handler: productController.create,
        options: {
            description: 'Create a new product',
            notes: 'ONLY ADMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: productValidator.validate.payload_create
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
        path: '/products/{id}',
        handler: productController.updateProduct,
        options: {
            description: 'Update product data by product ID',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: productValidator.validate.payload_update
            },
            auth: false
        }
    });


    server.route({
        method: 'DELETE',
        path: '/products/{id}',
        handler: productController.deleteOneProduct,
        options: {
            description: 'Delete a product by ID',
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