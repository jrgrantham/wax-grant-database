const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Object, required: true },
  })
);

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  try {
    const result = await Project.findOne({ projectId });
    const project = result.data
    project.projectId = projectId
    res.status(200).send(project);
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const filter = { projectId };
  const update = { projectId, data: req.body };
  try {
    const data = await Project.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Project updated", data });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.delete("/selected", async (req, res) => {
  const { projectId } = req.body;
  try {
    await Project.findOneAndDelete({ projectId });
    res.status(200).send({ message: "Deleted Project" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

router.post("/new", async (req, res) => {
  // console.log("*** new project***");
  const { projectId, data } = req.body;
  const newEntry = {
    projectId,
    data,
  };
  // console.log(data);
  try {
    const doc = new Project(newEntry);
    await doc.save();
    res.status(200).send({ message: "New project successful" });
  } catch (ex) {
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
