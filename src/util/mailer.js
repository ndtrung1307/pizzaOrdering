require('dotenv').config();
const nodemailer = require("nodemailer");
const generateOrderEmail = require('./generateOrderFormat');

const contant = require('./constants');



module.exports.sendMail = (data) => {
    var auth = {
        type: 'oauth2',
        user: contant.MAILER_USER,
        clientId: contant.MAILER_CLIENTID,
        clientSecret: contant.MAILER_CLIENTSECRET,
        refreshToken: contant.MAILER_REFRESHTOKEN,
    };

    console.log(auth);
    

    const body = generateOrderEmail.generateOrderEmail(data);

    var mailOptions = {
        from: '"PYCO Pizzas Company" <' + contant.MAILER_USER + '>', // sender address
        to: data.email, // list of receivers
        subject: 'Order #' + data._id + ' ready to ship to you', // Subject line
        text: "", // plain text body
        html: body // html body    
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
};
