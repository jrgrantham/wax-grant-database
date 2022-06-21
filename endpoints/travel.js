const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Travel = mongoose.model(
  "Travel",
  new mongoose.Schema(
    {
      projectId: { type: String, required: true },
      data: { type: Array, required: true },
    },
    { collection: "travel" }
  )
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Travel.findOne({ projectId });
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
    const data = await Travel.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Travel updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Travel.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Travel" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.post("/new", async (req, res) => {
  const { projectId, data } = req.body;
  console.log(projectId, data);
  const newEntry = {
    projectId,
    data,
  };
  try {
    const doc = new Travel(newEntry);
    await doc.save();
    res.status(200).send({ message: "New travel successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
