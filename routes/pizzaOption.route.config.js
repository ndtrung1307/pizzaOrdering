'use strict';

const pizzaOptionController = require('../controllers/pizzaOption.controller');
const pizzaOptionValidator = require('../validation/schemas/pizzaoption.schemas');

exports.routesconfig = (server) => {

    server.route({
        method: 'POST',
        path: '/pizzaoptions',
        handler: pizzaOptionController.create,
        options: {
            validate: {
                payload: pizzaOptionValidator.validate.payload
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
        path: '/pizzaoptions',
        handler: pizzaOptionController.getPizzaOptions,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/pizzaoptions/{id}',
        handler: pizzaOptionController.getOnePizzaOption,
        options: {
            auth: false
        }
    });


    server.route({
        method: 'DELETE',
        path: '/pizzaoptions/{id}',
        handler: pizzaOptionController.deleteOnePizzaOption,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

};