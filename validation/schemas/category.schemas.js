'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload_create: {
            name: Joi.string().required()
        },
         payload_update: {
             name: Joi.string()
         }
    }
};