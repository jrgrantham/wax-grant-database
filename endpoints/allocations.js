const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const admin = require("../../middleware/admin");

const Allocation = mongoose.model(
  "Allocation",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Allocation.findOne({ projectId });
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
    const data = await Allocation.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Allocation updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    Allocation.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Delete allocations successful" });
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
    const doc = new Allocation(newEntry);
    await doc.save();
    res.status(200).send({ message: "New allocation successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
