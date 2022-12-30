const nodemailer = require("nodemailer");

/**
 *
 * @param {*} email
 * @param {*} subject
 * @param {*} ui
 * @returns
 */

module.exports = async (email, subject, ui) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: subject,
      html: ui,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
