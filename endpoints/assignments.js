const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Assignment = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Object, required: true },
  })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Assignment.findOne({ projectId });
    // console.log(result.data);
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
    const data = await Assignment.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Assignment updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Assignment.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Assignments" });
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
  try {
    const doc = new Assignment(newEntry);
    await doc.save();
    res.status(200).send({ message: "New assignment successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
