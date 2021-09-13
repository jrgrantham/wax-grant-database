const express = require("express");
const router = express.Router();
const { Task, validate } = require("./model");

const taskOrderData = ["task1"];
const taskSetupData = [
  {
    projectId: "abc",
    taskId: "task1",
    workPackageTitle: "Title...",
    workPackageId: "pack1",
    description: "Description... on the server",
    days: 1,
    startDep: null,
    endDep: null,
    dayLoading: "front",
    schedule: [
      { barNumber: 1, value: 1 },
      { barNumber: 0, value: 0 },
      { barNumber: 0, value: 0 },
    ],
  },
];

router.get("/", async (req, res) => {
  const resources = await Task.find();
  res.send(resources);
});

router.get("/selected", async (req, res) => {
  // const resource = await Task.findById(req.params.id);
  // if (!resource) return res.status(404).send("Task not found");
  // await the task order, compile and send both
  // res.send(resource);
  const selectedprojectid = req.headers.selectedprojectid;
  // console.log(selectedprojectid);
  const result = {};
  taskSetupData.forEach((task) => {
    // console.log(task.projectId);
    if (task.projectId === selectedprojectid) result[task.taskId] = task;
  });
  result.taskOrder = taskOrderData
  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let resource = new Task({
    workPackageTitle: req.body.workPackageTitle,
    description: req.body.description,
    days: req.body.days,
    startDep: req.body.startDep,
    endDep: req.body.endDep,
    dayLoading: req.body.dayLoading,
    sortPosition: req.body.sortPosition,
    schedule: req.body.schedule,
  });

  try {
    resource = await resource.save();
    console.log(resource);
    res.send(resource);
  } catch (ex) {
    // for (field in ex.errors) {
    //   console.log(ex.errors[field].message);
    // }
    console.log(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const resource = await Task.findByIdAndUpdate(
    req.params.id,
    {
      workPackageTitle: req.body.workPackageTitle,
      description: req.body.description,
      days: req.body.days,
      startDep: req.body.startDep,
      endDep: req.body.endDep,
      dayLoading: req.body.dayLoading,
      sortPosition: req.body.sortPosition,
      schedule: req.body.schedule,
    },
    { new: true }
  );
  if (!resource) return res.status(404).send("Task not found");
  res.send(resource);
});

router.delete("/:id", async (req, res) => {
  const resource = await Task.findByIdAndDelete(req.params.id);
  if (!resource) return res.status(404).send("not found");
  res.send(resource);
});

module.exports = router;
