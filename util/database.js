let mongoose = require('mongoose');
const environmentVariable = require('../common/config/env.config');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(environmentVariable.mongodbUrl,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error:' + err);
            });
    }
    _close() {
        mongoose.connection.close();
    }
}

module.exports = new Database();