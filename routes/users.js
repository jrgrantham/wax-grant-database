const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/users");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered ");

  user = new User(_.pick(req.body, ["password", "name", "email"]));
  const newPassword = bcryptjs.hashSync(req.body.password, 10);
  user.password = newPassword;

  try {
    user = await user.save();
    console.log(user);
    res.send(_.pick(user, ["_id", "name", "email"]));
  } catch (ex) {
    // for (field in ex.errors) {
    //   console.log(ex.errors[field].message);
    // }
    console.log(ex.message);
  }
});

module.exports = router;
