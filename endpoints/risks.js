const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Risk = mongoose.model(
  "Risk",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Risk.findOne({ projectId });
    res.status(200).send(result.data);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const filter = { projectId };
  const update = { projectId, data: req.body };

  try {
    const data = await Risk.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Risk updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    Risk.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Delete risk successful" });
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
    const doc = new Risk(newEntry);
    await doc.save();
    res.status(200).send({ message: "New risk successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
