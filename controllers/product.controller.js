const productService = require('../services/product.service');
const categoryService = require('../services/category.service');
const commonFunctions = require('../util/commonFunc');
const constans = require('../util/constants');

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
        return productService.create(productdata).then((result)=>{
            if (result !== undefined) {
                return h.response({
                    Message: 'Create product successfully!',
                    productinfo: result 
                }).code(201);
            }
            return h.response('Create product faillue!').code(500);
        });
        
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
exports.getProduct = async (req, h) => {
    try {
        let products = await productService.getAll();
        return h.response(products).code(201);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.getOneProduct = async (req, h) => {
    try {
        let id = req.params.id;
        let product = await productService.getOneProduct(id);
        if(product){
            return h.response(product).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParams;
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
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
        return commonFunctions.errorHandler(error, h);
    }
};

exports.getProductBaseOnCategory = async (req, h) => {
    try {
        let categoryName = req.params.categoryname;
        commonFunctions.throwIfMissing(categoryName,constans.boomMessage.invalidIDOrQueryParams);
        
        let category = await categoryService.getCategoryByName(categoryName);
        commonFunctions.throwIfMissing(category, constans.boomMessage.invalidIDOrQueryParamsOrDeleted);

        let products = await productService.getProductBaseOnCategory(category._id);
        return h.response(products).code(201);
    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};

exports.deleteOneProduct = async (req, h) => {
    try {
        let id = req.params.id;
        let res = await productService.deleteOneProductAsAdmin(id);
        if (res) {
            return h.response({
                msg: `Product has been deleted with id ${req.params.id}`
            }).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;

    } catch (error) {
        return commonFunctions.errorHandler(error, h);
    }
};
