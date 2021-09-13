const express = require("express");
const router = express.Router();
// const { Task, validate } = require("./model");

const setupData = [
  {
    projectId: "abc",
    taskOrder: ["task1"],
  },
];

router.get("/", async (req, res) => {
  // const resources = await Task.find();
  res.send(setupData);
});

router.get("/selected", async (req, res) => {
  // const resource = await Task.findById(req.params.id);
  // if (!resource) return res.status(404).send("Task not found");
  // res.send(resource);
  // console.log(selectedprojectid);
  const selectedprojectid = req.headers.selectedprojectid;
  const result = setupData.find(
    ({ projectId }) => projectId === selectedprojectid
  );
  res.status(200).send(result);
});
 

module.exports = router;
