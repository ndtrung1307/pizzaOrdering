const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    orderMethod: {
        type: String,
        required: true
    },
    note: String,
    status: {
        type: String,
        default: 'received the order'
    },
    shippingAddress: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'ShippingAddress',
            required: true
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
            type: String,
        },
    },
    payment: {
        type: {
            type:String,
            required: true
        },
        status: {
            type: String,
            default: ''
        }
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: null
    },
    orderLines: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        unitPrice: {
            _id: {
                type: Schema.Types.ObjectId,
                required: true
            },
            size: String,
            price: {
                type: Number,
                required: true
            }
        },
        quantity: {
            type: Number,
            required: true
        },
        options: [
            {   
                name: String,
                price: Number
            }
        ],
        wrapper: String
    }],
    orderTotal: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);