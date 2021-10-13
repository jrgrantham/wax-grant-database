const express = require("express");
const router = express.Router();
// const { Allocation, validate } = require("./model");

const allocations = [
  {
    projectId: "abc",
    data: [
      {
        allocationId: "82d0c4ee-57f4-4ea0-9c46-ea5c56c3ff33",
        taskId: "task1",
        personId: "person1",
        percent: 100,
      },
    ],
  },
];

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);
  const projectId = req.projectId;
  const index = allocations.findIndex(
    (project) => project.projectId === projectId
  );
  const result = allocations[index].data;
  // console.log(result);
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newAllocation = {
    projectId,
    data: [],
  };
  allocations.push(newAllocation);
  // console.log(allocations);
  res.status(200).send({ message: "New allocation successful" });
});

// router.get("/", async (req, res) => {
//   const allocations = await Allocation.find();
//   res.send(allocations);
// });

// router.get("/:id", async (req, res) => {
//   const allocation = await Allocation.findById(req.params.id);
//   if (!allocation) return res.status(404).send("Allocation not found");
//   res.send(allocation);
// });

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let allocation = new Allocation({
//     taskId: req.body.taskId,
//     personId: req.body.personId,
//     percent: req.body.percent,
//   });

//   try {
//     allocation = await allocation.save();
//     console.log(allocation);
//     res.send(allocation);
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

//   const allocation = await Allocation.findByIdAndUpdate(
//     req.params.id,
//     {
//       taskId: req.body.taskId,
//       personId: req.body.personId,
//       percent: req.body.percent,
//     },
//     { new: true }
//   );
//   if (!allocation) return res.status(404).send("Allocation not found");
//   res.send(allocation);
// });

// router.delete("/:id", async (req, res) => {
//   const allocation = await Allocation.findByIdAndDelete(req.params.id);
//   if (!allocation) return res.status(404).send("not found");
//   res.send(allocation);
// });

module.exports = router;
