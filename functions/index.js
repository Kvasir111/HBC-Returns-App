const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();
const config = require('./secrets');

let transporter = nodemailer.createTransport({
    service: "email.hbci.com",
    auth: {
        user: config.emailPassword,
        password: config.emailPassword
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const destination = req.query.destination;

        const mailOptions = {
            from: "returns@hbci.com",
            to: destination,
            subject: "Your HBCI Equipment Return",

        };
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send(error.toString());
            }
            return res.send("Send That Shit");
        });
    });
});