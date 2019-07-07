const Boom = require('@hapi/boom');
const addressModel = require('../models/shippingAddress.model');
const shippingAddressDTO = require('../models/DTO/shippingAddress.DTO');

module.exports = {
    create: async (data) => {
        let address = await addressModel.findOne({
            user : data.user,
            houseNumber: data.houseNumber,
            street: data.street,
            dictrict: data.dictrict,
            province: data.province
        });
        if (address) {
            throw Boom.conflict('Shipping address already exists!');
        }
        return addressModel(data).save().then((result) => {
            if (result) return ({
                id: result._id
            });
        });
    },
    getAll: async (size, page) => {
        let addresses = await addressModel.find({}).limit(size).skip((page -= 1) * size);
        return shippingAddressDTO.convertListOfReturnShippingAddressDTO(addresses);
    },

    getAllAddressOfUser: async (userid, size, page) => {
        let addresses = await addressModel.find({
            user: userid
        }).limit(size).skip((page -= 1) * size);
        return shippingAddressDTO.convertListOfReturnShippingAddressDTO(addresses);
    },

    getOneAddress: async (id, userid) => {
        let address = await addressModel.findOne({
            _id: id,
            user: userid
        });

        return address === null ? null : shippingAddressDTO.convertReturnShippingAddressDTO(address);
    },

    getOneStoreAddress: async (id) => {
        let address = await addressModel.findOne({
            _id: id,
            type: "storeAddress"
        });

        return address === null ? null : shippingAddressDTO.convertReturnShippingAddressDTO(address);
    },

    updateAddress: async (id, userid, data) => {
        let result = await addressModel.findOneAndUpdate({
            _id : id,
            user : userid
        }, data, {
            new: true
        });

        return result;
    },

    deleteOneAddress: async (id, userid) => {
        let res = await addressModel.findOneAndDelete({
            _id : id,
            user : userid
        });
        return res;
    }
};