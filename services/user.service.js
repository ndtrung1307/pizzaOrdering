
const Boom = require('@hapi/boom');
const userModel = require('../models/user.model');
const commonFunctions = require('../util/commonFunc');
const constans = require('../util/constants');



module.exports = {
    signUp: async (data) => {
        const user = await userModel.findOne({
            email: data.email
        });
        if (user) {
            throw Boom.conflict('User already exists!');
        }

        let person = await userModel(data).save();

        let returnData = {
            _id: person._id,
            email: person.email
        };
        return returnData;
    },
    getAllUser: async () => {
        let users = await userModel.find({});
        return users;
    },

    update: async(id,data) => {
        
        let result = await userModel.findByIdAndUpdate(id, data);
        return result;
    },

    getOneUser: async (id) => {
                
        let user = await userModel.findById(id);
        return user;
    },

    updatePassword: async (id, data) => {

        let item = await userModel.findById(id);
        commonFunctions.throwIfMissing(item, constans.boomMessage.invalidIDOrQueryParamsOrDeleted);

        if (!item.comparePassword(data.oldpassword)) {
            throw Boom.badRequest('Wrong password!');
        }
        item.password = data.password;
        let res = await item.save();
        if (res) {
            return true;
        }
        return false;
    },

    deleteOneUserAsAdmin: async (id) => {
                
        let res = await userModel.findByIdAndDelete(id);
        return res;
    }
};