const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Capex = mongoose.model(
  "Capex",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  }, { collection: 'capex' })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Capex.findOne({ projectId });
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
    const data = await Capex.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Capex updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    Capex.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Delete capex successful" });
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
    const doc = new Capex(newEntry);
    await doc.save();
    res.status(200).send({ message: "New capex successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
