const express = require("express");
const router = express.Router();

const setupData = [
  {
    projectId: "abc",
    taskOrder: ["task1"],
  },
];

router.get("/", async (req, res) => {
  // const resources = await Task.find();
  res.status(200).send(setupData);
});

router.get("/selected", async (req, res) => {
  // const resource = await Task.findById(req.params.id);
  // if (!resource) return res.status(404).send("Task not found");
  // res.send(resource);
  // console.log(selectedprojectid);
  const selected = req.projectId;
  const result = setupData.find(
    ({ projectId }) => projectId === selected
  );
  res.status(200).send(result.taskOrder);
});

router.post("/", async (req, res) => {
  const taskOrder = req.body;
  setupData.push(taskOrder);
  res.status(200).send({ message: "New taskOrder successful" });
});

router.put("/", async (req, res) => {
  const projectId = req.projectId;
  const order = req.body;
  console.log(order);
  setupData.forEach((project) => {
    if (project.projectId === projectId) {
      project.taskOrder = order;
    }
  });
  res.status(200).send(order);
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = setupData.findIndex(
    (taskOrder) => taskOrder.projectId === projectId
  );
  setupData.splice(index, 1);
  res.status(200).send({ message: "Delete taskOrder successful" });
});

module.exports = router;
