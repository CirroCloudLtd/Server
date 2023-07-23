const sendEmail = require('./sendEmail')

const sendDemoRequestEmail = async ({
  name,
  email,
  phone,
  company,
  region,
  service,
  hearAbout,
}) => {
  const message = `<html><body><div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/dzeuffqjk/image/upload/v1687266108/logo_with_slogan_2_fwrzgn.png" style="max-width: 100%;" />
            </div>
            <h2 style="text-align: center; color: #0066ff;">New Demo Request Received</h2>
            <div style="background-color: #f2f2f2; padding: 20px; border-radius: 5px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Region:</strong> ${region}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Heard about us:</strong> ${hearAbout}</p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://cirrocloudug.com" style="background-color: #0066ff; color: #fff; text-decoration: none; padding: 15px 20px; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
            </div>
        </div></body></html>`

  return sendEmail({
    to: 'info@cirrocloudug.com',
    subject: 'New demo request',
    html: `${message}`,
  })
}

module.exports = sendDemoRequestEmail
