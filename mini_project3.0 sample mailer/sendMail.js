const nodemailer = require('nodemailer');   
require("dotenv").config();
const path = require("path");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 582,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.ARR_PASSWORD // generated ethereal password
    }
});

const mailOption = {
    from : {
        name: 'Nuub',
        address: process.env.ENV,
    },   // sender address

    to: [ "hourseththavareak@gmail.com" ], // list of receivers
    subject: "hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
        {
            filename: 'KIT_KITianII_2023.pdf',
            path: path.join(__dirname, 'KIT_KITianII_2023.pdf'),
            contentType: 'application/pdf'
        },
        {
            filename: 'jpg_44.jpg',
            path: path.join(__dirname, 'jpg_44.jpg'),
            contentType: 'image/jpg'
        }
    ]
}

const sendMail = async (transporter, mailOption) => {
    try {
        await transporter.sendMail(mailOption);
        console.log('Email has been sent successfully');
    } catch (error) {
        console.error(error);
    }
}

sendMail(transporter, mailOption);



