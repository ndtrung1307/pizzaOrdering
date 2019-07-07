

const Boom = require('@hapi/boom');

module.exports = {

    boomMessage : {
        invalidIDOrQueryParamsOrDeleted: Boom.resourceGone('Maybe this resource be deleted before Or Unvalid input ID, query params !!!'),
        invalidIDOrQueryParams: Boom.badRequest('Unvalid input ID, query params !!!')
    },

    PRODUCT : {
        PRODUCT_LIMIT : 5,
        DEFAUT_PAGE : 1,
        DEFAUT_SIZE : 20
    },

    ORDER : {
        DEFAUT_SIZE: 10,
        DEFAUT_PAGE: 1
    },

    SHIPPINGADDRESS : {
        DEFAUT_SIZE: 10,
        DEFAUT_PAGE: 1
    },

    PAYMENT_METHOD: ['COD'],

    ORDER_METHOD: ['DELIVERY', 'CARRYOUT']

};