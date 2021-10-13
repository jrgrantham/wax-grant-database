// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
// const auth = require("../../middleware/authenticate");
// const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
// const { User, validate } = require("./model");
const admin = require("../../middleware/admin");
const setupData = require("./data");

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);
  const selectedprojectid = req.headers.selectedprojectid;
  const result = setupData.find(
    ({ projectId }) => projectId === selectedprojectid
  );
  res.status(200).send(result);
});

router.get("/", (req, res) => {
  // protect route, admin only
  const list = [];
  setupData.forEach((project) => {
    list.push({
      projectId: project.projectId,
      projectDesc: project.projectDesc,
      lead: project.lead,
      pOne: project.pOne,
      pTwo: project.pTwo,
      leadId: project.leadId,
      pOneId: project.pOneId,
      pTwoId: project.pTwoId,
      color: project.color,
    });
  });
  res.status(200).send(setupData);
});

// router.get("/me", auth, async (req, res) => {
//   // throw new Error('error test');
//   const user = await User.findById(req.user.id).select("-password");
//   res.send(user);
// });

router.post("/", admin, async (req, res) => {
  const newSetup = req.body;
  setupData.push(newSetup);
  res.send(newSetup);

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // let user = await User.findOne({ email: req.body.email });
  // if (user) return res.status(400).send("User already registered");

  // user = new User(_.pick(req.body, ["password", "name", "email"]));
  // const newPassword = bcryptjs.hashSync(req.body.password, 10);
  // user.password = newPassword;

  // try {
  //   user = await user.save();
  //   console.log(user);
  //   const token = user.generateAuthToken();
  //   res
  //     .header("x-auth-token", token)
  //     .send(_.pick(user, ["_id", "name", "email"]));
  // } catch (ex) {
  //   // for (field in ex.errors) {
  //   //   console.log(ex.errors[field].message);
  //   // }
  //   console.log(ex.message);
  // }
});

router.put("/", admin, async (req, res) => {
  const projectId = req.projectId;
  const data = req.body;
  const index = setupData.findIndex(
    (project) => project.projectId === projectId
  );
  setupData.splice(index, 1, data);
  res.send({ message: "success" });

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // let user = await User.findOne({ email: req.body.email });
  // if (user) return res.status(400).send("User already registered");

  // user = new User(_.pick(req.body, ["password", "name", "email"]));
  // const newPassword = bcryptjs.hashSync(req.body.password, 10);
  // user.password = newPassword;

  // try {
  //   user = await user.save();
  //   console.log(user);

  //   const token = user.generateAuthToken();
  //   res
  //     .header("x-auth-token", token)
  //     .send(_.pick(user, ["_id", "name", "email"]));
  // } catch (ex) {
  //   // for (field in ex.errors) {
  //   //   console.log(ex.errors[field].message);
  //   // }
  //   console.log(ex.message);
  // }
});

router.delete("/", async (req, res) => {
  const projectId = req.projectId;
  const index = setupData.findIndex(
    (project) => project.projectId === projectId
  );
  setupData.splice(index, 1);
  res.send({ message: "success" });
});

module.exports = router;
