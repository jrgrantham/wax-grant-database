const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("./users/model");

const Setup = mongoose.model(
  "Setup",
  new mongoose.Schema(
    {
      projectId: { type: String, required: true },
      data: { type: Object, required: true },
    },
    { collection: "setup" }
  )
);

router.get("/", async (req, res) => {
  const { admin, userId } = req;
  // console.log(userId);
  const list = [];

  if (admin) {
    try {
      const allSetups = await Setup.find();
      allSetups.forEach((setup) => {
        const current = { ...setup.data };
        current.projectId = setup.projectId;
        list.push(current);
      });
      res.status(200).send(list);
    } catch (ex) {
      res.status(400).send({ message: ex.message });
    }
  } else {
    try {
      const allSetups = await Setup.find();
      const user = await User.findOne({ userId });
      const { projects } = user;
      allSetups.forEach((setup) => {
        if (projects.includes(setup.projectId)) {
          const current = { ...setup.data };
          current.projectId = setup.projectId;
          list.push(current);
        }
      });
      res.status(200).send(list);
    } catch (ex) {
      res.status(400).send({ message: ex.message });
    }
  }
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const filter = { projectId };
  const update = { projectId, data: req.body };

  try {
    const data = await Setup.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Setup updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Setup.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Setup", projectId });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.post("/new", async (req, res) => {
  const { projectId, data } = req.body;
  const newEntry = {
    projectId,
    data,
  };
  // console.log(projectId, data);
  try {
    const doc = new Setup(newEntry);
    await doc.save();
    res.status(200).send({ message: "New setup successful", data: doc.data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
module.exports.Setup = Setup;
