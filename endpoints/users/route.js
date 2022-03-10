const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("./model");
const admin = require("../../middleware/admin");

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

// individual selecting a project
router.put("/me", async (req, res) => {
  const _id = req.userId;
  const projectId = req.body.projectId;
  const rememberMe = req.rememberMe;
  // console.log("users route", projectId);
  // console.log(projectId);
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { projectId },
      { new: true }
    );
    const token = user.generateAuthToken(rememberMe);
    // console.log("users route", user.projectId);
    user.password = "";
    res.status(200).send({
      token,
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// admin get all users
router.get("/", admin, async (req, res) => {
  // res.send(userData);
  const list = [];
  try {
    const allUsers = await User.find().lean();
    allUsers.forEach((user, index) => {
      const current = { ...user };
      current.password = "";
      list[index] = current;
    });
    res.status(200).send(list);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// admin add new user
router.post("/", async (req, res) => {
  const { userId, name, email, password, projectId } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered");

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = {
    userId,
    name,
    email,
    projectId,
    password: hashedPassword,
  };

  try {
    const doc = new User(newUser);
    await doc.save();
    res
      .status(200)
      .send({
        message: "New user successful",
        data: { ...newUser, password: "" },
      });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// admin editing a user
router.put("/", async (req, res) => {
  const { userId, projectId, password } = req.userId;
  const filter = { userId };

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = {
    userId,
    name,
    email,
    password: hashedPassword,
  };

  try {
    const user = await User.findByIdAndUpdate(
      filter,
      { projectId },
      { new: true }
    );
    res.status(200).send({});
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// admin delete user
router.delete("/", async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findOneAndDelete({ userId });
    res.status(200).send({ message: "Deleted User", userId });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
