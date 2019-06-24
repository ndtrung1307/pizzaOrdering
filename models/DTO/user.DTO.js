

module.exports = {
    convertReturnUserProfileDTO : (userdata) => {
        return {
            id: userdata._id,
            email: userdata.email,
            phone: userdata.phone,
            firstname: userdata.firstname,
            lastname: userdata.lastname
        };
    }
};