const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  }, { collection: 'team' })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Team.findOne({ projectId });
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
    const data = await Team.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Team updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Team.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Team" });
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
    const doc = new Team(newEntry);
    await doc.save();
    res.status(200).send({ message: "New team successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
