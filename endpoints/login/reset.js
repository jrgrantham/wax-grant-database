const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { User } = require("../users/model");

const { transporter } = require("../email/transporter");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const filter = { email };
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const update = { password: hashedPassword };
  console.log(email, password);

  try {
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).lean();
    const firstName = user.name.split(" ")[0];

    const mail = {
      from: "Wax RDC",
      to: email,
      subject: "Wax Portal - Password Reset",
      text: `Hello ${firstName}\n\nYour password reset was successful.\n\nYour new password is: ${password}`,
    };

    transporter.sendMail(mail, (err) => {
      if (err) console.log(err);
      else {
        res.status(200).send({ message: "Email sent, check spam folder" });
      }
    });
  } catch (ex) {
    res.status(400).send({ message: "No account found. Contact WAX administration" });
  }
});

module.exports = router;
