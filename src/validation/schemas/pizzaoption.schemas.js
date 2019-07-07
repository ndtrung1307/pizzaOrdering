
const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload_create: {
            name: Joi.string().required(),
            type: Joi.string().required(),
            price: Joi.number().integer().required()
        },
        payload_update: {
            name: Joi.string(),
            type: Joi.string(),
            price: Joi.number().integer()
        }
    }
};