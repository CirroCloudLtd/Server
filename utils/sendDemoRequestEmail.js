const sendEmail = require('./sendEmail');

const sendDemoRequestEmail = async ({
  name,
  email,
  phone,
  company,
  region,
  service,
  hearAbout,
}) => {
  const message = `New demo request received from ${name}. <br /> Email: ${email} <br /> Phone: ${phone} <br /> Company: ${company} <br /> Region: ${region} <br /> Service: ${service} <br /> Heard about us: ${hearAbout}`;

  return sendEmail({
    to: 'info@cirrocloudug.com',
    subject: 'New demo request',
    html: `${message}`,
  });
};

module.exports = sendDemoRequestEmail;
