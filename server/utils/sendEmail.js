const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",

      port: Number(process.env.EMAIL_PORT) || 465 || 587,

      secure: true,

      auth: {
        user: process.env.EMAIL,

        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,

      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    console.log("SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: `"PrepWise AI" <${process.env.EMAIL}>`,

      to: email,

      subject,

      html,
    });

    console.log("Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("EMAIL ERROR:");
    console.error(error);
    throw error;
  }
};

module.exports = sendEmail;
