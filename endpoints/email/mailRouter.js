const router = require("express").Router();
const { transporter } = require("./transporter");

router.post("/", (req, res) => {
  const { email, subject, content } = req.body;
  console.log(email, subject, content);
  const mail = {
    // from: "james.r.grantham@gmail.com",
    to: email,
    subject,
    text: content,
  };

  transporter.sendMail(mail, (err) => {
    if (err) {
      res.status(407).send({ message: "Email failed to send" });
    } else {
      res.status(200).send({ message: "Email sent (check spam folder)" });
    }
  });
});

module.exports = router;
