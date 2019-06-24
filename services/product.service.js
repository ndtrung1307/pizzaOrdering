const Boom = require('@hapi/boom');
const productModel = require('../models/product.model');


module.exports = {
    create: async (data) => {
        let product = await productModel.findOne({
            name: data.name
        });
        if (product) {
            throw Boom.conflict('product already exists!');
        }
       return productModel(data).save().then((result) =>{
           if (result) return({
               id: result._id,
               name: result.name
        });
       }).catch((error)=> {
            if (error) throw Boom.badData('Bad Data', Error);
       });
        
    },
    getAll: async () => {

        let products = await productModel.find({});
        return products;
    },

    getOneProduct: async (id) => {

        let product = await productModel.findById(id);
        return product;
    },

    getProductBaseOnCategory: async (id) => {
        try {
            let products = await productModel.find({
                category: id
            });
            return products;
        } catch (error) {
            return error;
        }
    },

    updateProduct : async (id, data) => {
        try {
            let result = await productModel.findByIdAndUpdate(id,data);
            return result;
        } catch (error) {
            return error;
        }
    },

    deleteOneProductAsAdmin: async (id) => {
        try {
            await productModel.findByIdAndDelete(id);
        } catch (error) {
            return error;
        }
    }
};