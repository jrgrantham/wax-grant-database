const express = require("express");
const router = express.Router();
const { Deadline, validate } = require("../models/deadlines");

router.get("/", async (req, res) => {
  const deadlines = await Deadline.find();
  res.send(deadlines);
});

router.get("/:id", async (req, res) => {
  const deadline = await Deadline.findById(req.params.id);
  if (!deadline) return res.status(404).send("Deadline not found");
  res.send(deadline);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let deadline = new Deadline({
    sortPosition: req.body.sortPosition,
    type: req.body.type,
    description: req.body.description,
    scheduled: req.body.scheduled,
  });

  try {
    deadline = await deadline.save();
    console.log(deadline);
    res.send(deadline);
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

  const deadline = await Deadline.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      sortPosition: req.body.sortPosition,
      type: req.body.type,
      scheduled: req.body.scheduled,
    },
    { new: true }
  );
  if (!deadline) return res.status(404).send("Deadline not found");
  res.send(deadline);
});

router.delete("/:id", async (req, res) => {
  const deadline = await Deadline.findByIdAndDelete(req.params.id);
  if (!deadline) return res.status(404).send("not found");
  res.send(deadline);
});

module.exports = router;
