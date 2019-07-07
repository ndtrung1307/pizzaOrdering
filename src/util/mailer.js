require('dotenv').config();
const nodemailer = require("nodemailer");
const generateOrderEmail = require('./generateOrderFormat');



module.exports.sendMail = (data) => {
    var auth = {
        type: 'oauth2',
        user: process.env.MAILER_USER,
        clientId: process.env.MAILER_CLIENTID,
        clientSecret: process.env.MAILER_CLIENTSECRET,
        refreshToken: process.env.MAILER_REFRESHTOKEN,
    };

    const body = generateOrderEmail.generateOrderEmail(data);

    var mailOptions = {
        from: '"Pizzas Company" <' + process.env.MAILER_USER + '>', // sender address
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
