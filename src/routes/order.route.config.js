
const orderController = require('../controllers/order.controller');
const orderValidator = require('../validation/schemas/order.schemas');
const commonValidator = require('../validation/common.Validate');
const Joi = require('@hapi/joi');

exports.routesconfig = (server) => {

    server.route({
        method: 'GET',
        path: '/orders',
        handler: orderController.getOrders,
        options: {
            description: 'Get all Order',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                query: {
                    page: Joi.number().integer().min(1).description(
                        'Paging of list orders, start from 1'
                    ),
                    size: Joi.number().integer().description('Size of list result of orders - defaut: 10'),
                },
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/orders/{id}',
        handler: orderController.getOneOrder,
        options: {
            description: 'Get a product by ID',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId,
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/orders',
        handler: orderController.create,
        options: {
            description: 'Create a new order',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                payload: orderValidator.validate.payload_create
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/orders/{id}',
        handler: orderController.updateShippingAddressForOrder,
        options: {
            description: 'Change Shipping Address for order',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                payload: orderValidator.validate.payload_update,
                params: commonValidator.objectId
            },
        }
    });


    server.route({
        method: 'DELETE',
        path: '/orders/{id}',
        handler: orderController.deleteOneOrder,
        options: {
            description: 'Delete a order by ID',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            plugins: {
                validate: {
                    headers: commonValidator.TOKENValidate,
                    params: commonValidator.objectId
                },
            }
        }
    });

};