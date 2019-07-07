const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shippingAddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        default: 'userShippingAddress',
        required: true,
    },
    houseNumber: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    }, 
    dictrict: {
        type: String,
        required: true
    }, 
    province: {
        type: String,
        required: true
    }, 
    informationGuider: {
        type: String
    },
    default: Boolean
});

module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);