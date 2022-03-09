const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("../users/model");
const jwt = require("jsonwebtoken");
const config = require("config");
// const setupData = require('../setup/data')

// function validate(user) {
//   const schema = Joi.object({
//     email: Joi.string().min(3).max(255).required().email(),
//     password: Joi.string().min(3).max(255).required(),
//   });
//   return schema.validate(user);
// }

// router.post("/", async (req, res) => {
//   const { email, password, rememberMe } = req.body;

//   const generateAuthToken = function (rememberMe) {
//     const payload = {
//       userId: "606a23e39a795e1cdfe2a612",
//       admin: true,
//       projectId: "abc",
//       email: "james6@gmail.com",
//     };
//     const secret = config.get("jwtPrivateKey");

//     const time = rememberMe ? "30d" : "1h";
//     const options = { expiresIn: time };
//     const result = jwt.sign(payload, secret, options);
//     return result;
//   };

//   const token = generateAuthToken(rememberMe);
//   res.status(200).send({
//     message: `Hello generic user`,
//     projectId: "abc",
//     token: token,
//     admin: true,
//     dev: true,
//   });
// });

router.post("/", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("login", user);
    // const firstProjectId = 'abc'
    const successful = user && bcryptjs.compare(password, user.password)
    console.log(successful);
    if (true) {
      // if (user && bcryptjs.compare(password, user.password)) {
      // if admin fetch setup list
      // if client fetch project list
      const token = user.generateAuthToken(rememberMe);
      user.password = "";
      res.status(200).send({
        message: `Hello ${user.name}!`,
        projectId: user.projectId,
        token: token,
        admin: user.admin,
      });
    } else {
      res.status(401).send({ message: "Incorrect username or password" });
    }
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
