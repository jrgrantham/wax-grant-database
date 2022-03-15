const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("../users/model");
// const jwt = require("jsonwebtoken");
// const config = require("config");

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
    console.log("user", user);
    // const firstProjectId = 'abc'
    const successful = await bcryptjs.compare(password, user.password);
    const { projectId, projects, admin, name, userId } = user;

    
    let error = false;
    if ((!projectId || projects.length === 0) && !admin) error = true;
    console.log(projectId, projects, admin, name, userId);

    if (successful) {
      const token = user.generateAuthToken(rememberMe);
      user.password = "";
      res.status(200).send({
        message: `Hello ${name}!`,
        error,
        token,
        userId,
        admin,
      });
    } else {
      res.status(400).send({ message: "Incorrect username or password" });
    }
  } catch (ex) {
    res.status(400).send({ message: "Incorrect username or password" });
  }
});

module.exports = router;
