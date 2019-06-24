const productService = require('../services/product.service');
const pizzaOptionService = require ('../services/pizzaOption.service');
const commonFunctions = require('../util/commonFunc');
const Boom = require('@hapi/boom');

/**
 * Register a User Account
 */
exports.create = async (req, h) => {

    let productdata = {
        name: req.payload.name,
        description: req.payload.description,
        category: req.payload.category,
        picture: req.payload.picture,
        prices: req.payload.prices,
        wrapper: req.payload.wrapper,
        options: req.payload.options
    };
    try {
        console.log('test'+ await pizzaOptionService.getPizzaOptionsByNames(req.payload.options));
        
        productdata.options = await pizzaOptionService.getPizzaOptionsByNames(req.payload.options);
        return productService.create(productdata).then((result)=>{
            if (result !== undefined) {
                return h.response({
                    Message: 'Create category successfully!',
                    productinfo: result 
                }).code(201);
            }
            return h.response('Create category faillue!').code(500);
        });
        
    } catch (error) {
        return h.response(Boom.internal());
    }
};
exports.getProduct = async (req, h) => {
    try {
        let products = await productService.getAll();
        return h.response(products).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.getOneProduct = async (req, h) => {
    try {
        let id = req.params.id;
        let product = await productService.getOneProduct(id);
        return h.response(product).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.updateProduct = async (req, h) => {
    try {
        let data = req.payload;
        let id = req.params.id;
        let res = await productService.updateProduct(id, data);
        if(res) {
            return h.response({
                msg: `Product has been updated with id ${res._id}`
            }).code(201);
        }
        return h.response({
            msg: `Cannot update product with id ${id}`
        }).code(500);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.deleteOneProduct = async (req, h) => {
    try {
        let id = req.params.id;
        await productService.deleteOneProductAsAdmin(id);
        return h.response({
            msg: `Product has been deleted with id ${req.params.id}`
        }).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};
