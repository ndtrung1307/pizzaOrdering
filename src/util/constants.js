

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

    ORDER_METHOD: ['DELIVERY', 'CARRYOUT'],

    MAILER_CLIENTID: '900559736433-kaqaictllvnpptrf3p38hjo55l9bbpof.apps.googleusercontent.com',
    MAILER_CLIENTSECRET : 'V6Bx6pFbH5MWpFSWcBh0lVqm',
    MAILER_REFRESHTOKEN : '1/1dFhCbZleDpNN6MfvrezajXoRADD4Xh_-KvCGwqtYbw',
    MAILER_USER : 'pizza.ordering.api@gmail.com'

};