const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("../users/model");
const helpers = require("../../middleware/helpers");

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
    const successful = await bcryptjs.compare(password, user.password);
    // const defaultProject = await Setup.findOne({});

    if (successful) {
      const { projectId, projects, admin, name, userId } = user;
      const checkedProjectId = await helpers.checkProject({
        providedProjectId: projectId,
        admin,
        userId,
      });

      let error = false;
      if (!checkedProjectId || (projects.length === 0 && !admin)) error = true;
      const message = admin
        ? "Selected project does not exist, please login again"
        : "No project allocated, contact WAX administration";

      const token = user.generateAuthToken(rememberMe);
      user.password = "";
      res.status(200).send({
        admin,
        projectId: checkedProjectId,
        message: checkedProjectId ? null : message,
        name,
        error,
        token,
        userId,
      });
    } else {
      res.status(400).send({ message: "Incorrect username or password" });
    }
  } catch (ex) {
    res.status(400).send({ message: "Incorrect username or password" });
  }
});

module.exports = router;
