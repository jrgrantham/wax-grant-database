const express = require("express");
const router = express.Router();
const { Resource, validate } = require("./model");

router.get("/", async (req, res) => {
  const resources = await Resource.find();
  res.send(resources);
});

router.get("/:id", async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).send("Resource not found");
  res.send(resource);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let resource = new Resource({
    name: req.body.name,
    acronym: req.body.acronym,
    role: req.body.role,
    salary: req.body.salary,
    staff: req.body.staff,
    location: req.body.location,
    dayRate: req.body.dayRate,
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

  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      sortPosition: req.body.sortPosition,
      type: req.body.type,
      scheduled: req.body.scheduled,
    },
    { new: true }
  );
  if (!resource) return res.status(404).send("Resource not found");
  res.send(resource);
});

router.delete("/:id", async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);
  if (!resource) return res.status(404).send("not found");
  res.send(resource);
});

module.exports = router;
