const _ = require("lodash");
const auth = require("../middleware/auth");
const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/users");

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

router.get(
  "/me",
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  })
);

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
