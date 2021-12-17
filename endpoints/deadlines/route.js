// const express = require("express");
// const router = express.Router();
// // const { Deadline, validate } = require("./model");
// const { Deadline } = require("./model");

// router.get("/selected", async (req, res) => {
//   const projectId = req.projectId;
//   console.log(projectId);
//   try {
//     const result = await Deadline.findOne({ projectId });
//     res.status(200).send(result.data);
//   } catch (ex) {
//     res.status(400).send({ message: ex.message });
//   }
// });

// router.put("/selected", async (req, res) => {
//   const projectId = req.projectId;
//   const filter = { projectId };
//   const update = { projectId, data: req.body };

//   try {
//     const data = await Deadline.findOneAndUpdate(filter, update, {
//       new: true,
//     });
//     res.status(200).send({ message: "Deadline updated", data });
//   } catch (ex) {
//     res.status(400).send({ message: ex.message });
//   }
// });

// router.post("/new", async (req, res) => {
//   const projectId = req.body.projectId;
//   const newEntry = {
//     projectId,
//     data: [],
//   };
//   try {
//     const doc = new Deadline(newEntry);
//     await doc.save();
//     res.status(200).send({ message: "New deadline successful" });
//   } catch (ex) {
//     res.status(400).send({ message: ex.message });
//   }
// });

// router.delete("/selected", async (req, res) => {
//   const projectId = req.projectId;
//   try {
//     Deadline.findOneAndDelete({ projectId });
//     res.status(200).send({ message: "Delete deadlines successful" });
//   } catch (ex) {
//     res.status(400).send({ message: ex.message });
//   }
// });

// // router.post("/", async (req, res) => {
// //   const { error } = validate(req.body);
// //   if (error) return res.status(400).send(error.details[0].message);

// //   let deadline = new Deadline({
// //     sortPosition: req.body.sortPosition,
// //     type: req.body.type,
// //     description: req.body.description,
// //     scheduled: req.body.scheduled,
// //   });

// //   try {
// //     deadline = await deadline.save();
// //     console.log(deadline);
// //     res.send(deadline);
// //   } catch (ex) {
// //     // for (field in ex.errors) {
// //     //   console.log(ex.errors[field].message);
// //     // }
// //     console.log(ex.message);
// //   }
// // });

// // router.put("/:id", async (req, res) => {
// //   const { error } = validate(req.body);
// //   if (error) return res.status(400).send(error.details[0].message);

// //   const deadline = await Deadline.findByIdAndUpdate(
// //     req.params.id,
// //     {
// //       description: req.body.description,
// //       sortPosition: req.body.sortPosition,
// //       type: req.body.type,
// //       scheduled: req.body.scheduled,
// //     },
// //     { new: true }
// //   );
// //   if (!deadline) return res.status(404).send("Deadline not found");
// //   res.send(deadline);
// // });

// // router.delete("/:id", async (req, res) => {
// //   const deadline = await Deadline.findByIdAndDelete(req.params.id);
// //   if (!deadline) return res.status(404).send("not found");
// //   res.send(deadline);
// // });

// module.exports = router;
