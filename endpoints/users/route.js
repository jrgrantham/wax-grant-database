// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
// const auth = require("../../middleware/authenticate");
// const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User, validate } = require("./model");
const admin = require("../../middleware/admin");
const userData = require("./data");

router.get("/", admin, (req, res) => {
  // console.log(req);
  // console.log(res);
  // throw new Error('error test');
  res.send(userData);
  // res.status(200).send(data)
});

router.get("/me", async (req, res) => {
  const userId = req.userId;
  // console.log(userId);
  try {
    const user = await User.findOne({ _id: userId });
    const { admin, projectId } = user;
    res.status(200).send({
      admin,
      projectId,
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// remove and use above code once connected to DB
// router.get("/me", async (req, res) => {
//     try {
//       res.status(200).send({
//         admin: true,
//         projectId: "abc",
//       });
//     } catch (ex) {
//       res.status(400).send({ message: ex.message });
//     }
//   });

// router.put("/selected", async (req, res) => {
//   const projectId = req.projectId;
//   const filter = { projectId };
//   const update = { projectId, data: req.body };
//   try {
//     const data = await Project.findOneAndUpdate(filter, update, {
//       new: true,
//     });
//     res.status(200).send({ message: "Project updated", data });
//   } catch (ex) {
//     res.status(400).send({ message: ex.message });
//   }
// });

router.put("/me", async (req, res) => {
  const _id = req.userId;
  const projectId = req.body.projectId;
  const rememberMe = req.rememberMe;
  console.log("users route", projectId);
  // console.log(projectId);
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { projectId },
      { new: true }
    );
    const token = user.generateAuthToken(rememberMe);
    console.log("users route", user.projectId);
    user.password = "";
    res.status(200).send({
      token,
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.post("/", async (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  userData.push(newUser);
  res.send(newUser);

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
  // throw new Error('error test');
  // const user = await User.findById(req.user.id).select("-password");
  // res.send(user);
  const userId = req.body.userId;
  const index = userData.findIndex((user) => user.userId === userId);
  userData.splice(index, 1);
  res.send({ userId });
});

module.exports = router;
