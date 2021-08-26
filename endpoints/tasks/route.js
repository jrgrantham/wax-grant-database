const express = require("express");
const router = express.Router();
const { Task, validate } = require("./model");

router.get("/", async (req, res) => {
  const resources = await Task.find();
  res.send(resources);
});

router.get("/:id", async (req, res) => {
  const resource = await Task.findById(req.params.id);
  if (!resource) return res.status(404).send("Task not found");
  res.send(resource);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let resource = new Task({
    workPackageTitle: req.body.workPackageTitle,
    description: req.body.description,
    days: req.body.days,
    startDep: req.body.startDep,
    endDep: req.body.endDep ,
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
      endDep: req.body.endDep ,
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
