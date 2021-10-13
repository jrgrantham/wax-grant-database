const express = require("express");
const router = express.Router();
// const { Deadline, validate } = require("./model");

const deadlineData = [
  {
    projectId: "abc",
    data: [
      {
        deadlineId: "del3",
        sortPosition: 2,
        type: "deliverable",
        description: "Description of deliverable 3 on the server",
        scheduled: 2,
      },
      {
        deadlineId: "del4",
        sortPosition: 3,
        type: "deliverable",
        description: "Description of deliverable 4",
        scheduled: 2,
      },
      {
        deadlineId: "mil1",
        sortPosition: 0,
        type: "milestone",
        description: "Description of milestone 1",
        scheduled: 0,
      },
      {
        deadlineId: "mil2",
        sortPosition: 1,
        type: "milestone",
        description: "Description of milestone 2",
        scheduled: 0,
      },
    ],
  },
];

// router.get("/", async (req, res) => {
//   const deadlines = await Deadline.find();
//   res.send(deadlines);
// });

// router.get("/:id", async (req, res) => {
//   const deadline = await Deadline.findById(req.params.id);
//   if (!deadline) return res.status(404).send("Deadline not found");
//   res.send(deadline);
// });

router.get("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = deadlineData.findIndex(
    (project) => project.projectId === projectId
  );
  const result = deadlineData[index].data;
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newDeadline = {
    projectId,
    data: [],
  };
  deadlineData.push(newDeadline);
  res.status(200).send({ message: "New deadline successful" });
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const data = req.body;
  const updated = {
    projectId,
    data,
  };
  const index = deadlineData.findIndex(
    (deadline) => deadline.projectId === projectId
  );
  deadlineData.splice(index, 1, updated);
  res.status(200).send(updated);
});

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let deadline = new Deadline({
//     sortPosition: req.body.sortPosition,
//     type: req.body.type,
//     description: req.body.description,
//     scheduled: req.body.scheduled,
//   });

//   try {
//     deadline = await deadline.save();
//     console.log(deadline);
//     res.send(deadline);
//   } catch (ex) {
//     // for (field in ex.errors) {
//     //   console.log(ex.errors[field].message);
//     // }
//     console.log(ex.message);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const deadline = await Deadline.findByIdAndUpdate(
//     req.params.id,
//     {
//       description: req.body.description,
//       sortPosition: req.body.sortPosition,
//       type: req.body.type,
//       scheduled: req.body.scheduled,
//     },
//     { new: true }
//   );
//   if (!deadline) return res.status(404).send("Deadline not found");
//   res.send(deadline);
// });

// router.delete("/:id", async (req, res) => {
//   const deadline = await Deadline.findByIdAndDelete(req.params.id);
//   if (!deadline) return res.status(404).send("not found");
//   res.send(deadline);
// });

module.exports = router;
