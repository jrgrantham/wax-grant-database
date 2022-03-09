const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task  = mongoose.model(
  "Task",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Task.findOne({ projectId });
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
    const data = await Task.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Task updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Task.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Task" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.post("/new", async (req, res) => {
  // console.log("*** new task***");
  const { projectId, data } = req.body;
  const newEntry = {
    projectId,
    data,
  };
  // console.log(data);
  try {
    const doc = new Task (newEntry);
    await doc.save();
    res.status(200).send({ message: "New task successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
