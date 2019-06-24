
const Boom = require('@hapi/boom');
const userModel = require('../models/user.model');



module.exports = {
    signUp: async (data) => {
        try {
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
        } catch (error) {
            throw error;
        }
    },
    getAllUser: async () => {
        let users = await userModel.find({});
        return users;
    },

    getOneUser: async (id) => {

        let user = await userModel.findById(id);
        return user;
    },

    updatePassword: async (id, data) => {
        try {
            let item = await userModel.findById(id);
            if (!item) throw Boom.notFound();
            
            if (!item.comparePassword(data.oldpassword)) {
                return false;
            }
            item.password = data.password;
            let res = await item.save();
            if (res) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    },

    deleteOneUserAsAdmin: async (id) => {
        try {
            await userModel.findByIdAndDelete(id);
        } catch (error) {
            throw err;
        }
    }
};