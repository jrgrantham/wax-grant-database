const express = require("express");
const router = express.Router();
const { Task } = require("./model");
// const { Task, validate } = require("./model");
const taskSetupData = require("./data");

router.get("/", async (req, res) => {
  const resources = await Task.find();
  res.send(resources);
});

router.get("/selected", async (req, res) => {
  // const resource = await Task.findById(req.params.id);
  // if (!resource) return res.status(404).send("Task not found");
  // await the task order, compile and send both
  // res.send(resource);
  const projectId = req.projectId;
  const result = {};
  taskSetupData.forEach((task) => {
    if (task.projectId === projectId) result[task.taskId] = task;
  });
  res.status(200).send(result);
});

router.post("/selected", async (req, res) => {
  // try {
  //   resource = await resource.save();
  //   // console.log(resource);
  //   res.send(resource);
  // } catch (ex) {
  //   // for (field in ex.errors) {
  //   //   console.log(ex.errors[field].message);
  //   // }
  //   console.log(ex.message);
  // }
  const task = req.body;
  // console.log(task);
  task.projectId = req.projectId;
  taskSetupData.push(task);
  // console.log('tasks -', taskSetupData);
  res.status(200).send({ message: "Tasks added successfully" });
});

router.post("/new", async (req, res) => {
  const task = req.body;
  taskSetupData.push(task);
  // console.log('tasks -', taskSetupData);
  res.status(200).send({ message: "New task successful" });
});

router.put("/selected", async (req, res) => {
  const task = req.body;
  console.log(task);

  const taskId = task.taskId;
  const index = taskSetupData.findIndex((task) => task.taskId === taskId);
  taskSetupData.splice(index, 1, task);
  res.status(200).send(task);
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // const resource = await Task.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     workPackageTitle: req.body.workPackageTitle,
  //     description: req.body.description,
  //     days: req.body.days,
  //     startDep: req.body.startDep,
  //     endDep: req.body.endDep,
  //     dayLoading: req.body.dayLoading,
  //     sortPosition: req.body.sortPosition,
  //     schedule: req.body.schedule,
  //   },
  //   { new: true }
  // );
  // if (!resource) return res.status(404).send("Task not found");
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  // taskSetupData = taskSetupData.filter((task) => task.projectId !== projectId);
  for (let i = 0; i < taskSetupData.length; i++) {
    if (taskSetupData[i].projectId === projectId) {
      taskSetupData.splice(i, 1);
    }
  }
  res.status(200).send({ message: "Delete tasks successful" });
});

// router.delete("/selected", async (req, res) => {
//   const { taskId } = req.body;
//   const index = taskSetupData.findIndex((task) => task.taskId === taskId);
//   taskSetupData.splice(index, 1);
//   res.status(200).send({ message: "Task deleted" });
//   // const resource = await Task.findByIdAndDelete(req.params.id);
//   // if (!resource) return res.status(404).send("not found");
//   // res.send(resource);
// });

module.exports = router;
