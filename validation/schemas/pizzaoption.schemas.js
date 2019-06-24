'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload: {
            name: Joi.string().required(),
            type: Joi.string().required(),
            price: Joi.string()
        },
        payload_update: {
            name: Joi.string(),
            type: Joi.string(),
            price: Joi.string()
        }
    }
};