const categoryService = require('../services/category.service');
const commonFunctions = require('../util/commonFunc');

const constans = require('../util/constants');
/**
 * Register a User Account
 */
exports.create = async (req, h) => {
    
    let categorydata = {
        name: req.payload.name
    };
    try {
        let category = await categoryService.create(categorydata);
        if (category) {
            return h.response({
                Message: 'Create category successfully!',
                categoryinfo: category
            }).code(201);
        }
        return h.response('Create category faillue!').code(500);
    } catch (error) {
        console.error(error);
        return commonFunctions.errorHandler(error,h);
    }
};
exports.getCategory = async (req, h) => {
    try {
        let categories = await categoryService.getAll();
        return h.response(categories).code(201);
    } catch (error) {
       console.error(error);
       return commonFunctions.errorHandler(error, h);
    }
};

exports.getOneCategory = async (req, h) => {
    try {
        let id = req.params.id;
        let category = await categoryService.getOneCategory(id);
        if(category) {
            return h.response(category).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;
    } catch (error) {
        console.error(error);
        return commonFunctions.errorHandler(error, h);
    }
};



exports.updateByID = async (req, h) => {
    try {
        let id = req.params.id;
        let data = req.payload;
        let res = await categoryService.update(id, data);
        
        if (res) {
            return h.response({
                msg: `Category has been updated id ${res._id}.`
            }).code(201);
        }
        return h.response({
            msg: `Cannot update category with id ${id}`
        }).code(500);
    } catch (error) {
        console.error(error);
        return commonFunctions.errorHandler(error, h);
    }
};

exports.deleteOneCategory = async (req, h) => {
    try {
        let id = req.params.id;
        let res = await categoryService.deleteOneCategoryAsAdmin(id);
        if(res) {
            return h.response({
                msg: `Category has been deleted with id ${res._id}`
            }).code(201);
        }
        return constans.boomMessage.invalidIDOrQueryParamsOrDeleted;
        
    } catch (error) {
        console.error(error);
        return commonFunctions.errorHandler(error, h);
    }
};
