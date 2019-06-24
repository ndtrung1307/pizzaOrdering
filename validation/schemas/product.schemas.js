'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload: {
            name: Joi.string().required(),
            description: Joi.string(),
            category: Joi.string().required(),
            picture: Joi.string().required(),
            prices: [{
                type: Joi.string(),
                price: Joi.number().required()
            }],
            wrapper: [Joi.string()],
            options: [Joi.string()]
        },
        payload_update: {
            name: Joi.string(),
            description: Joi.string(),
            category: Joi.string(),
            picture: Joi.string(),
            prices: [{
                type: Joi.string(),
                price: Joi.number()
            }],
            wrapper: [Joi.string()],
            options: [Joi.string()]
        }
    }
};