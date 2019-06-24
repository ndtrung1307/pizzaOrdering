const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const commonAuthFunc = require ('../auth/common.Authfunc');

// const commonFunc = require('../util/commonFunc');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER'
    }
});


userSchema.pre('save', async function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // hash pass
    user.password = await commonAuthFunc.hashPassword(user.password);
    next();
    
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);