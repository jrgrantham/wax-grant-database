const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Material = mongoose.model(
  "Material",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Material.findOne({ projectId });
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
    const data = await Material.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Material updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Material.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Material" });
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
    const doc = new Material(newEntry);
    await doc.save();
    res.status(200).send({ message: "New material successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
