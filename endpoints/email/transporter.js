const nodemailer = require("nodemailer");
const config = require("config");
const email = config.get("email");
const emailPass = config.get("emailPass");

const transport = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: email,
    pass: emailPass,
  },
};

let transporter = nodemailer.createTransport(transport);
exports.transporter = transporter;
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("success:", success, "\nServer is ready to take messages");
  }
});
