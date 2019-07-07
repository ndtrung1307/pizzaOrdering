const bcrypt = require('bcrypt');

module.exports = {

    hashPassword: async (unHashedPassword) => {
        
        try {
            let salt = await bcrypt.genSalt(10);
                // hash the password along with our new salt
            let password = await bcrypt.hash(unHashedPassword, salt);
            return password;
        } catch (error) {
            throw error;
        }
    }

};
