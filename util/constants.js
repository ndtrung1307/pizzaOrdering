

const Boom = require('@hapi/boom');

module.exports = {

    boomMessage : {
        invalidIDOrQueryParamsOrDeleted: Boom.resourceGone('Maybe this resource be deleted before Or Unvalid input ID, query params !!!'),
        invalidIDOrQueryParams: Boom.resourceGone('Unvalid input ID, query params !!!')
    },


};