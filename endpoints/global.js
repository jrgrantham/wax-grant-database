const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Global = mongoose.model(
  "Global",
  new mongoose.Schema({
    globalData: { type: String, required: true },
    data: { type: Object, required: true },
  }, { collection: 'global' }),
);

router.get("/", async (req, res) => {
  // const globalData = "originalData";
  const globalData = "globalData";
  try {
    const result = await Global.findOne({ globalData });
    res.status(200).send(result);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.put("/", async (req, res) => {
  const projectId = req.projectId;
  const filter = { projectId };
  const update = { projectId, data: req.body };

  try {
    const data = await Global.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Global updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
