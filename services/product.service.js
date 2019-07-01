const Boom = require('@hapi/boom');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');
const commonFunction = require('../util/commonFunc');

module.exports = {
    create: async (data) => {
        let product = await productModel.findOne({
            name: data.name
        });
        if (product) {
            throw Boom.conflict('Product already exists!');
        }
       return productModel(data).save().then((result) =>{
           if (result) return({
               id: result._id,
               name: result.name
        });
       });
        
    },
    getAll: async (size, page) => {
        let products = await productModel.find({}).populate({
            path: 'category',
            select: 'name'
        }).populate({
            path: 'options',
            select: ['name', 'price', 'type']
        }).limit(size).skip((page-=1)*size);
        return products;
    },

    getOneProduct: async (id) => {
        let product = await productModel.findById(id).populate(['category', 'options']);
        return product;
    },

    getProductPrice: async(id, priceId) => {
        let product = await productModel.findById(id);
        
        commonFunction.throwIfMissing(product,Boom.badRequest('Unvalid Product ID'));
        
        commonFunction.throwIfMissing(product.prices.id(priceId), Boom.badRequest('Unvalid Price ID'));
        
        return product.prices.id(priceId);
    },

    getPopularProductList : async (limit) => {
        let products = await orderModel.aggregate([
            {
                $unwind: '$orderLines'
            }, {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$orderLines", "$$ROOT"]
                    }
                }
            }, {
                $group: {
                    _id: "$product",
                    quantity: {
                        $sum: "$quantity"
                    }
                }
            }, {
                $sort: {
                    quantity: -1
                }
            }
        ]).limit(limit);

        var productIds = products.map(function (item) {
            return item._id;
        });

        products = await productModel.find({
            _id: {
                $in: productIds
            }
        }).populate(['category', 'options']);
        
        return products;

    },

    getProductBaseOnCategory: async (id) => {
        let products = await productModel.find({
            category: id
        }).populate(['category', 'options']);
        return products;
    },

    updateProduct : async (id, data) => {
        let result = await productModel.findByIdAndUpdate(id, data);
        return result;
    },

    deleteOneProductAsAdmin: async (id) => {
        let res = await productModel.findByIdAndDelete(id);
        return res;
    }
};