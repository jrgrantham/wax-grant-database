const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Setup = mongoose.model(
  "Setup",
  new mongoose.Schema(
    {
      projectId: { type: String, required: true },
      data: { type: Array, required: true },
    },
    { collection: "setup" }
  )
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Setup.findOne({ projectId });
    res.status(200).send(result.data[0]);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});


router.get("/", async (req, res) => {
  // protect route, admin only
  const list = [];
  try {
    const allSetups = await Setup.find();
    // console.log(allSetups);
    allSetups.forEach((setup, index) => {
      const current = {...setup.data[0]}
      current.projectId = setup.projectId
      list[index] = current
    })
    console.log(list);
    res.status(200).send(list);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
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
  const projectId = req.projectId;
  try {
    Setup.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Delete setup successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newEntry = {
    projectId,
    data: [],
  };
  try {
    const doc = new Setup(newEntry);
    await doc.save();
    res.status(200).send({ message: "New setup successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
