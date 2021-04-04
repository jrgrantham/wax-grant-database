const express = require("express");
const router = express.Router();
const { Allocation, validate } = require("../models/allocations");

router.get("/", async (req, res) => {
  const allocations = await Allocation.find();
  res.send(allocations);
});

router.get("/:id", async (req, res) => {
  const allocation = await Allocation.findById(req.params.id);
  if (!allocation) return res.status(404).send("Allocation not found");
  res.send(allocation);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let allocation = new Allocation({
    taskId: req.body.taskId,
    personId: req.body.personId,
    percent: req.body.percent,
  });

  try {
    allocation = await allocation.save();
    console.log(allocation);
    res.send(allocation);
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

  const allocation = await Allocation.findByIdAndUpdate(
    req.params.id,
    {
      taskId: req.body.taskId,
      personId: req.body.personId,
      percent: req.body.percent,
    },
    { new: true }
  );
  if (!allocation) return res.status(404).send("Allocation not found");
  res.send(allocation);
});

router.delete("/:id", async (req, res) => {
  const allocation = await Allocation.findByIdAndDelete(req.params.id);
  if (!allocation) return res.status(404).send("not found");
  res.send(allocation);
});

module.exports = router;
