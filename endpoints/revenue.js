const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Revenue = mongoose.model(
  "Revenue",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  }, { collection: 'revenue' })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Revenue.findOne({ projectId });
    res.status(200).send(result.data[0]);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const filter = { projectId };
  const update = { projectId, data: req.body };

  try {
    const data = await Revenue.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Revenue updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    Revenue.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Delete revenue successful" });
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
    const doc = new Revenue(newEntry);
    await doc.save();
    res.status(200).send({ message: "New revenue successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
