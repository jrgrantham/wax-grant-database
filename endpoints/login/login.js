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
    // check account and password
    const user = await User.findOne({ email });
    const successful = await bcryptjs.compare(password, user.password);
    if (successful) {
      // extract user data
      const { projectId, projects, admin, name, userId } = user;
      const firstName = name.split(" ")[0];

      // console.log('projectId', projectId);
      // console.log('projects', projects);
      // console.log('admin', admin);
      // console.log('name', name);
      // console.log("userId", userId);

      const check = {
        projects: false, // has list of projects
        selected: false, // has a selected project
        project: false,  // project still available
        error: false,    // setting to true prevents token being saved on client
        token: undefined,
        message: `Hello ${firstName}, you have no project allocated. Contact WAX administration`,
      };

      // must have a list of assigned projects or be admin
      if (projects.length > 0 || admin) check.projects = true;

      // must have a selected project from the list or be admin
      if (projects.includes(projectId) || admin) check.selected = projectId;

      // the selected project must still be available
      // only worth checking if the other 2 pass
      if (check.projects && check.selected)
        check.project = await helpers.checkProject({
          providedProjectId: projectId,
          admin,
          userId,
        });

      // either set the token or set an error
      if (check.project) check.token = user.generateAuthToken(rememberMe);
      else check.error = true;

      console.log(check);

      user.password = "";
      res.status(200).send({
        admin,
        projectId: check.project,
        message: check.message,
        name,
        error: check.error,
        token: check.token,
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
