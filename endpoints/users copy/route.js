// const asyncMiddleware = require("../middleware/async");
const _ = require("lodash");
const auth = require("../../middleware/authenticate");
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User, validate } = require("./model");

router.get("/me", auth, async (req, res) => {
  // throw new Error('error test');
  const user = await User.findById(req.user.id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["password", "name", "email"]));
  const newPassword = bcryptjs.hashSync(req.body.password, 10);
  user.password = newPassword;

  try {
    user = await user.save();
    console.log(user);

    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (ex) {
    // for (field in ex.errors) {
    //   console.log(ex.errors[field].message);
    // }
    console.log(ex.message);
  }
});

module.exports = router;
