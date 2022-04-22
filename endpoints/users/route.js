const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User } = require("./model");
const admin = require("../../middleware/admin");
const helpers = require("../../middleware/helpers");

router.get("/me", async (req, res) => {
  const { userId, projectId, admin, name } = req;
  const checkedProjectId = await helpers.checkProject({
    providedProjectId: projectId,
    admin,
    userId,
  });
  const message = admin
    ? "Selected project does not exist, please login again"
    : "No project allocated, contact WAX administration";

  res.status(200).send({
    name,
    admin,
    projectId: checkedProjectId,
    message: checkedProjectId ? null : message,
  });
});

// individual selecting a project
router.put("/me", async (req, res) => {
  const { userId } = req;
  const projectId = req.body.projectId;
  const rememberMe = req.rememberMe;
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      { projectId },
      { new: true }
    );
    const token = user.generateAuthToken(rememberMe);
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
  const { userId, name, email, password, projectId, projects } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered");

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = {
    userId,
    name,
    email,
    projectId,
    projects,
    password: hashedPassword,
  };

  try {
    const doc = new User(newUser);
    await doc.save();
    res.status(200).send({
      message: "New user successful",
      data: { ...newUser, password: "" },
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// admin editing a user
router.put("/", async (req, res) => {
  const { userId, name, email, password } = req.body;
  const filter = { userId };
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const updatedUser = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    const user = await User.findOneAndUpdate(filter, updatedUser, {
      new: true,
    }).lean();
    res.status(200).send({
      message: "Update user successful",
      data: { ...user, password: "" },
    });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

// admin updating projects
router.put("/projects", async (req, res) => {
  const { userId, projects, projectId } = req.body;
  const filter = { userId };
  const update = { projects, projectId };

  try {
    const user = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).lean();
    res.status(200).send({
      message: "Update user successful",
      data: { ...user, password: "" },
    });
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
