var Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);


const payment = Joi.object().keys({
    type: Joi.string().required()
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
            shippingAddress: Joi.objectId().required()
        }),
        payload_update: Joi.object().keys({
            shippingAddress: Joi.objectId().required()
        })
    }
};
