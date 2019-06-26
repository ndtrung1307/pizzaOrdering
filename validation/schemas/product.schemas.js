'use strict';

const Joi = require('@hapi/joi');

const priceObject_create = Joi.object().keys({
    size: Joi.string(),
    price: Joi.number().integer().required()
});

const priceObject_update = Joi.object().keys({
    size: Joi.string(),
    price: Joi.number().integer()
});

module.exports = {
    validate: {
        payload_create: Joi.object().keys({
                name: Joi.string().required(),
                description: Joi.string(),
                picture: Joi.string().required(),
                category: Joi.string().required(),
                prices: Joi.array().items(priceObject_create),
                wrapper: Joi.array().items(Joi.string()).unique().default([]),
                options: Joi.array().items(Joi.string()).unique().default([])
            }),
        payload_update: Joi.object().keys({
            name: Joi.string(),
            description: Joi.string(),
            picture: Joi.string(),
            category: Joi.string(),
            prices: Joi.array().items(priceObject_update),
            wrapper: Joi.array().items(Joi.string()).unique().default([]),
            options: Joi.array().items(Joi.string()).unique().default([])
        })
    }
};