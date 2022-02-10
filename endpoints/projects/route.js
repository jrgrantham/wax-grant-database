// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");
const admin = require("../../middleware/admin");
const projectData = require("./data");

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);
  // const selectedProjectId = req.projectId;
  // console.log(selectedProjectId);
  // const result = projectData.find(
  //   ({ projectId }) => projectId === selectedProjectId
  // );
  const result = projectData[0]
  // console.log(result);
  res.status(200).send(result);
});

router.post("/", admin, async (req, res) => {
  const newProject = req.body;
  // console.log(newProject);
  projectData.push(newProject);
  res.status(200).send({ message: "New project successful" });
});

router.put("/", admin, async (req, res) => {
  const projectId = req.projectId;
  const data = req.body;
  const index = projectData.findIndex(
    (project) => project.projectId === projectId
  );
  projectData.splice(index, 1, data);
  res.status(200).send({ message: "Project updated" });
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = projectData.findIndex(
    (project) => project.projectId === projectId
  );
  projectData.splice(index, 1);
  res.status(200).send({ message: "Delete project successful" });
});

module.exports = router;

