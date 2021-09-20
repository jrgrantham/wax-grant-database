const bcryptjs = require("bcryptjs");
const express = require("express");
// const Joi = require("joi");
const router = express.Router();
const { User } = require("../users/model");

// function validate(user) {
//   const schema = Joi.object({
//     email: Joi.string().min(3).max(255).required().email(),
//     password: Joi.string().min(3).max(255).required(),
//   });
//   return schema.validate(user);
// }

router.post("/", async (req, res) => {

  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcryptjs.compare(password, user.password)) {
      // if admin fetch setup list
      // if client fetch project list
      const token = user.generateAuthToken(rememberMe);
      user.password = "";
      res.status(200).send({
        message: `Hello ${user.name}!`,
        token: token,
        admin: user.admin,
        dev: user.dev,
      });
    } else {
      res.status(401).send({ message: "Incorrect username or password" });
    }
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
