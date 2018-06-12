'use strict';
const nodemailer = require('nodemailer');

const sendUserEmail = (mailOptions) => {
  console.log('logging...', mailOptions)

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })
  transporter.sendMail(mailOptions)
}

module.exports = { sendUserEmail }
