module.exports = {
    convertReturnShippingAddressDTO: (addressData) => {
        return {
            _id: addressData._id,
            houseNumber: addressData.houseNumber,
            street: addressData.street,
            dictrict: addressData.dictrict,
            province: addressData.province,
            informationGuider: addressData.informationGuider
        };
    },
    convertListOfReturnShippingAddressDTO: (addressData) => {
        return addressData.map(x => ({
            _id: x._id,
            houseNumber: x.houseNumber,
            street: x.street,
            dictrict: x.dictrict,
            province: x.province,
            informationGuider: x.informationGuider
        }));
    }
};