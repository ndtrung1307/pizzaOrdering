'use strict';

const pizzaOptionController = require('../controllers/pizzaOption.controller');
const pizzaOptionValidator = require('../validation/schemas/pizzaoption.schemas');

exports.routesconfig = (server) => {

    server.route({
        method: 'GET',
        path: '/pizzaoptions',
        handler: pizzaOptionController.getPizzaOptions,
        options: {
            description: 'Get all pizza options of Pizza Products',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/pizzaoptions/{id}',
        handler: pizzaOptionController.getOnePizzaOption,
        options: {
            description: 'Get a pizza opion by ID',
            notes: 'EVERYONE CAN DO THIS ACTION',
            tags: ['api'],
            auth: false
        }
    });

    server.route({
        method: 'POST',
        path: '/pizzaoptions',
        handler: pizzaOptionController.create,
        options: {
            description: 'Create a new pizza option',
            notes: 'ONLY AMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: pizzaOptionValidator.validate.payload_create
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
        path: '/pizzaoptions/{id}',
        handler: pizzaOptionController.updatePizzaOption,
        options: {
            description: 'Update Data of a pizza option with ID',
            notes: 'ONLY AMIN CAN DO THIS ACTION',
            tags: ['api'],
            validate: {
                payload: pizzaOptionValidator.validate.payload_update
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
        path: '/pizzaoptions/{id}',
        handler: pizzaOptionController.deleteOnePizzaOption,
        options: {
            description: 'Delete a pizza optine by ID',
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