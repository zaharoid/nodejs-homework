import nodemailer from "nodemailer";
import "dotenv/config";

const { GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (emailOptions) => {
  try {
    transporter.sendMail({ ...emailOptions, from: GMAIL_EMAIL });
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
