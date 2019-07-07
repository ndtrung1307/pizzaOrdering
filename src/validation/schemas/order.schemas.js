var Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const constant = require('../../util/constants');


const payment = Joi.object().keys({
    type: Joi.string().valid(constant.PAYMENT_METHOD).required()
});

const orderLine = Joi.object().keys({
    product: Joi.objectId().required(),
    unitPrice: Joi.objectId().required(),
    quantity: Joi.number().integer().required(),
    options: Joi.array().items(Joi.objectId()).unique(),
    wrapper: Joi.string()
});


module.exports = {
    validate: {
        payload_create: Joi.object().keys({
            payment: payment,
            orderLines: Joi.array().items(orderLine).unique().required(),
            shippingAddress: Joi.objectId().required(),
            orderMethod: Joi.string().valid(constant.ORDER_METHOD).required(),
            name: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2
            }).required(),
            phone: Joi.string().regex(/^[0-9+]{10,13}$/).required(),
            note: Joi.string()
        }),
        payload_update: Joi.object().keys({
            shippingAddress: Joi.objectId().required()
        })
    }
};
