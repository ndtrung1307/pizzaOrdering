const Boom = require('@hapi/boom');
const productModel = require('../models/product.model');


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
    getAll: async () => {
        let products = await productModel.find({}).populate(['category', 'options']);
        return products;
    },

    getOneProduct: async (id) => {
        let product = await productModel.findById(id).populate(['category', 'options']);
        return product;
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