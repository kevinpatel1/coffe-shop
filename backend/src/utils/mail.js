const nodemailer = require("nodemailer");
const config = require("config");
const secret = config.get("auth.mail");

const transport = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  port: 25,
  auth: {
    user: secret.email,
    pass: secret.password,
  },
});

const sendPassword = (email, password) => {
  const mailSend = {
    to: email,
    subject: "New Password",
    html: "Your new password is" + "<b>" + "  " + password + "</b>",
  };

  const mail = transport.sendMail(mailSend, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.info("Email is  sent");
    }
  });
  return mail;
};

module.exports = { sendPassword };
