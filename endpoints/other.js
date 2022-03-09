const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Other = mongoose.model(
  "Other",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  }, { collection: 'other' })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Other.findOne({ projectId });
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
    const data = await Other.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Other updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Other.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Other" });
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
    const doc = new Other(newEntry);
    await doc.save();
    res.status(200).send({ message: "New other successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
