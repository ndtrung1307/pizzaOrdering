const shippingAddressController = require('../controllers/shippingAddress.controller');
const shippingAddressValidator = require('../validation/schemas/shippingAddress.schemas');

const commonValidator = require('../validation/common.Validate');
const Joi = require('@hapi/joi');

exports.routesconfig = (server) => {

    server.route({
        method: 'GET',
        path: '/shippingaddress',
        handler: shippingAddressController.getAddress,
        options: {
            description: 'Get all shipping addresses',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                query: {
                    page: Joi.number().integer().min(1).description(
                        'Paging of list Shipping addresses, start from 1'
                    ),
                    size: Joi.number().integer().description('Size of list result of Shipping addresses - defaut: 10'),
                },
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/shippingaddress/{id}',
        handler: shippingAddressController.getOneAddress,
        options: {
            description: 'Get a shipping address by ID',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId,
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/shippingaddress',
        handler: shippingAddressController.create,
        options: {
            description: 'Create a new shipping address',
            notes: 'EVERY USER NEEDS LOGIN TO DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                payload: shippingAddressValidator.validate.payload_create
            }
        },
    });

    server.route({
        method: 'PUT',
        path: '/shippingaddress/{id}',
        handler: shippingAddressController.updateAddress,
        options: {
            description: 'Update Data of a shipping address with ID',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId,
                payload: shippingAddressValidator.validate.payload_update
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/shippingaddress/{id}',
        handler: shippingAddressController.deleteById,
        options: {
            description: 'Delete a shipping address by ID',
            notes: 'EVERY USER CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                headers: commonValidator.TOKENValidate,
                params: commonValidator.objectId,
            }
        }
    });

};