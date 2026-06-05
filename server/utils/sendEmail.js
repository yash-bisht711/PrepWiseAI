// const nodemailer = require("nodemailer");

// const sendEmail = async ({ email, subject, html }) => {
//   try {
//     console.log("EMAIL:", process.env.EMAIL);
// console.log(
//   "PASSWORD:",
//   process.env.EMAIL_PASSWORD
//     ? "Present"
//     : "Missing"
// );
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST || "smtp.gmail.com",

//       port: Number(process.env.EMAIL_PORT) || 465 || 587,

//       secure: true,

//       auth: {
//         user: process.env.EMAIL,

//         pass: process.env.EMAIL_PASS,
//       },

//       connectionTimeout: 10000,
//       greetingTimeout: 10000,
//       socketTimeout: 10000,

//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     console.log("EMAIL:", process.env.EMAIL);
// console.log(
//   "PASSWORD:",
//   process.env.EMAIL_PASSWORD
//     ? "Present"
//     : "Missing"
// );

//     // Verify SMTP connection
//     await transporter.verify();

//     console.log("SMTP Connected Successfully");

//     const info = await transporter.sendMail({
//       from: `"PrepWise AI" <${process.env.EMAIL}>`,

//       to: email,

//       subject,

//       html,
//     });

//     console.log("Email Sent:", info.messageId);

//     return info;
//   } catch (error) {
//     console.error("EMAIL ERROR:");
//     console.error(error);
//     throw error;
//   }
// };

// module.exports = sendEmail;

const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendEmail = async ({
  email,
  subject,
  html,
}) => {
  try {
    const response =
      await resend.emails.send({
        from:
          "PrepWise AI <onboarding@resend.dev>",

        to: email,

        subject,

        html,
      });

    console.log(
      "Email Sent:",
      response
    );

    return response;
  } catch (error) {
    console.error(
      "EMAIL ERROR:"
    );

    console.error(error);

    throw error;
  }
};

module.exports = sendEmail;
