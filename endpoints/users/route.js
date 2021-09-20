// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
// const auth = require("../../middleware/authenticate");
// const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User, validate } = require("./model");
const admin = require('../../middleware/admin')

const testData = [
  {
    userId: 1234,
    name: "James",
    email: "james@xyx.com",
    password: "password",
  },
  {
    userId: 2345,
    name: "Damien",
    email: "damien@xyx.com",
    password: "password",
  },
  {
    userId: 3456,
    name: "Casper",
    email: "casper@xyx.com",
    password: "password",
  },
  {
    userId: 4567,
    name: "Eric",
    email: "eric@xyx.com",
    password: "password",
  },
  {
    userId: 5678,
    name: "Tony Smith",
    email: "tony@xyx.com",
    password: "password",
  },
  {
    userId: 6789,
    name: "Paul Everton",
    email: "pauljameseverton@longemailadd.com",
    password: "password",
  },
];

const dummyProjectList = [
  {
    projectId: "abc",
    projectDesc: "Damien's description from the server...",

    partners: 1,
    lead: "james@xyx.com",
    pOne: "",
    pTwo: "",
    leadId: "", // required for updates to linked information (projects?)
    pOneId: "",
    pTwoId: "",
    color: "",
  },
];

router.get("/", admin, (req, res) => {
  // console.log(req);
  // console.log(res);
  // throw new Error('error test');
  res.send(testData);
  // res.status(200).send(data)
});

router.get("/me", async (req, res) => {
  const userId = req.userId;
  // console.log('************', req.userId);
  try {
    const user = await User.findOne({ _id: userId });
    const { admin, dev } = user;
    // if admin fetch setup list
    // if client fetch project list
    // console.log(user);
    res.status(200).send({
      admin,
      dev,
      availableProjects: dummyProjectList
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// availableProjects: copyOfData,
// selectedProjectData: {
//   data: "slices of state go here",
// },
// test,

router.post("/", async (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  testData.push(newUser);
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
  const index = testData.findIndex((user) => user.userId === userId);
  testData.splice(index, 1);
  res.send({ userId });
});

module.exports = router;
