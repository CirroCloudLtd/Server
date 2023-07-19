const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const sgMail = require('@sendgrid/mail');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: 'support@cirrocloudug.com',
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;
