// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");
const templateData = require("./data");

router.get("/", (req, res) => {
  res.status(200).send(templateData);
});

router.post("/new", async (req, res) => {
  const newTemplate = req.body;
  templateData.push(newTemplate);
  res.status(200).send({ message: "New template successful" });
});

router.put("/selected", (req, res) => {
  const selected = req.projectId;
  const data = req.body;
  const index = templateData.findIndex(
    (project) => project.projectId === selected
  );
  templateData[index].data = data;
  // console.log(data);
  res.status(200).send({ message: "Risks updated" });
});

router.post("/selected", (req, res) => {
  const projectId = req.body;
  const newProject = {
    projectId,
    data: [],
  };
  templateData.push(newProject);
  res.status(200).send({ message: "Risks initiated" });
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = templateData.findIndex((risk) => risk.projectId === projectId);
  templateData.splice(index, 1);
  res.status(200).send({ message: "Delete risk successful" });
});

module.exports = router;