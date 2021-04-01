const express = require("express");
const router = express.Router();
const Joi = require("joi");

const gantts = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

function validateGantt(gantt) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(gantt);
}

router.get("/", (req, res) => {
  res.send(gantts);
});

router.get("/:id", (req, res) => {
  const gantt = gantts.find((g) => g.id === parseInt(req.params.id));
  if (!gantt) res.status(404).send("not found");
  res.send(gantt);
});

router.post("/", (req, res) => {
  const { error } = validateGantt(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newGantt = {
    id: gantts.length + 1,
    name: req.body.name,
  };
  gantts.push(newGantt);
  res.send(newGantt);
});

router.put("/:id", (req, res) => {
  const gantt = gantts.find((g) => g.id === parseInt(req.params.id));
  if (!gantt) return res.status(404).send("not found");

  const { error } = validateGantt(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  gantt.name = req.body.name;
  res.send(gantt);
});

router.delete("/:id", (req, res) => {
  const gantt = gantts.find((g) => g.id === parseInt(req.params.id));
  if (!gantt) return res.status(404).send("not found");

  const index = gantts.indexOf(gantt);
  gantts.splice(index, 1);
  res.send(gantt);
});

module.exports = router;
