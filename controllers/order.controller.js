const orderService = require('../services/order.service');
const commonFunctions = require('../util/commonFunc');
const constans = require('../util/constants');

//private function 




exports.create = async (req, h) => {

    let orderdata = {
        user: req.auth.credentials._id,
        payment: req.payload.payment,
        orderTotal: 0
    };

    try {
        return orderService.create(orderdata, req.payload).then((result) => {            
            if (result !== undefined) {
                return h.response({
                    Message: 'Create order successfully!',
                    orderInfo: result
                }).code(201);
            }
            return h.response('Create order faillue!').code(500);
        });
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
exports.getOrders = async (req, h) => {
    try {
        let orders = null;
        switch (req.auth.credentials.role) {
            case 'ADMIN':
                orders = await orderService.getAllOrders();
                break;

            case 'USER':
                orders = await orderService.getAllOrdersOfUser(req.auth.credentials._id);
                break;

            default:
                break;
        }
        return h.response(orders).code(201);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.getOneOrder = async (req, h) => {

    const id = req.params.id;
    let order;
    try {

        switch (req.auth.credentials.role) {
            case 'ADMIN':
                order = await orderService.getOneOrderAsAdmin(id);
                break;

            case 'USER':
                order = await orderService.getOneOrderAsUser(id, req.auth.credentials._id);
                break;

            default:
                break;
        }
        if (order) {
            return h.response(order).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParams;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.updateShippingAddressForOrder = async (req, h) => {
    try {
        let data = req.payload;
        let id = req.params.id;
        const userId = req.auth.credentials._id;
        let res = await orderService.changeShippingAddress(id, userId ,data);
        if (res) {
            return h.response({
                msg: 'Shipping Address has been changed'
            }).code(201);
        }
        return h.response({
            msg: `Cannot change shipping address for Order ${id}`
        }).code(500);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

// exports.getProductBaseOnCategory = async (req, h) => {
//     try {
//         let categoryName = req.params.categoryname;
//         commonFunctions.throwIfMissing(categoryName, constans.boomMessage.invalidIDOrQueryParams);

//         let category = await categoryService.getCategoryByName(categoryName);
//         commonFunctions.throwIfMissing(category, constans.boomMessage.invalidIDOrQueryParamsOrDeleted);

//         let products = await productService.getProductBaseOnCategory(category._id);
//         return h.response(products).code(201);
//     } catch (error) {
//         return commonFunctions.errorHandler(error, h);
//     }
// };

exports.deleteOneOrder = async (req, h) => {
    try {
        let id = req.params.id;
        let userId = req.auth.credentials._id;
        let res = await orderService.deleteOneOrder(id, userId);
        if (res) {
            return h.response({
                msg: `Order has been deleted with id ${req.params.id}`
            }).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;

    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
