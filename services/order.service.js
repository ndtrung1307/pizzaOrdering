const Boom = require('@hapi/boom');
const orderModel = require('../models/order.model');
const productService = require('../services/product.service');
const shippingAddressService = require('../services/shippingAddress.service');
const pizzaOptionService = require('../services/pizzaOption.service');
const commonFuntions = require('../util/commonFunc');

async function mergeDataforOrder (orderData, data) {
    
    orderData.shippingAddress = await shippingAddressService.getOneAddress(data.shippingAddress, orderData.user);
    commonFuntions.throwIfMissing(orderData.shippingAddress, Boom.badRequest('Invalid shipping address!'));
    orderData.orderLines = [];

    for (const orderLine of data.orderLines) {
        orderLine.unitPrice = await productService.getProductPrice(orderLine.product, orderLine.unitPrice);
        commonFuntions.throwIfMissing(orderData.shippingAddress, Boom.badRequest('Invalid shipping address!'));
        orderLine.totalLine = 0;
        if (!commonFuntions.checkIfMissing(orderLine.options)){
            orderLine.options = await pizzaOptionService.getListSimplePizzaOptions(orderLine.options);

            orderLine.totalLine = orderLine.options.reduce((total, currentValue) => {
                return total.price + currentValue.price;
            });
        }
        orderLine.totalLine += orderLine.unitPrice.price * orderLine.quantity;
        orderData.orderLines.push(orderLine);
        orderData.orderTotal += orderLine.totalLine;
    }
    return orderData;
}

module.exports = {
    create: async (orderData,data) => {
        try {
            orderData = await mergeDataforOrder(orderData, data);

            return orderModel(orderData).save().then((result) => {
                if (result) return ({
                    id: result._id
                });
            });
        } catch (error) {
            throw error;
        }

    },

    getAllOrders: async (size, page) => {
        let orders = await orderModel.find({}).populate({
                        path: 'user',
                        select: ['phone','firstname','lastname']
                        }).populate({
                            path: 'orderLines.product',
                            select: ['name', 'picture']
                        }).limit(size).skip((page -= 1) * size);
        return orders;
    },

    getAllOrdersOfUser: async (userId, size, page) => {
        let orders = await orderModel.find({
            user: userId
        }).populate({
            path: 'user',
            select: ['phone', 'firstname', 'lastname']
        }).populate({
            path: 'orderLines.product',
            select: ['name', 'picture']
        }).limit(size).skip((page -= 1) * size);
        return orders;
    },

    getOneOrderAsAdmin: async (id) => {
        let order = await orderModel.find({
            _id: id
        }).populate({
            path: 'user',
            select: ['phone', 'firstname', 'lastname']
        }).populate({
            path: 'orderLines.product',
            select: ['name', 'picture']
        });
        return order[0];
    },

    getOneOrderAsUser: async (id,userId) => {
        let order = await orderModel.find({
            _id: id,
            user: userId
        }).populate({
            path: 'user',
            select: ['phone', 'firstname', 'lastname']
        }).populate({
            path: 'orderLines.product',
            select: ['name', 'picture']
        });
        return order[0];
    },

    changeShippingAddress: async (id, userId, data) => {

        let address = await shippingAddressService.getOneAddress(data.shippingAddress, userId);
        commonFuntions.throwIfMissing(address, Boom.badRequest('Invalid Shipping Address'));
        
        let order = await orderModel.findById(id);
        commonFuntions.throwIfMissing(address, Boom.badRequest('Invalid Order ID'));

        if (order.status !== "received the order") {
            throw Boom.badRequest('Cannot Change Shipping Address');
        }
        
        let result = await orderModel.findByIdAndUpdate(id, data);
        return result;
    },

    deleteOneOrder: async (id, userId) => {
        let res = await orderModel.findOneAndDelete({
            _id: id,
            user: userId
        });
        return res;
    }
};