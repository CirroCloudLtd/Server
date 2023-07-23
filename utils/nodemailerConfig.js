module.exports = {
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'muhammad.ssempala@cirrocloudug.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
};
