// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const assignmentData = [
  {
    projectId: "abc",
    data: { markets: [], streams: [], total: [] },
  },
];

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);

  const projectId = req.projectId;
  const index = assignmentData.findIndex(
    (project) => project.projectId === projectId
  );
  const result = assignmentData[index].data;
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const newAssignment = req.body;
  // body contains projectId and data - no need to de-structure
  assignmentData.push(newAssignment);
  res.status(200).send({ message: "New revenue successful" });
});

// router.get("/myProject", async (req, res) => {
// const projectId = req.projectId;
// const project = await Setup.findById(projectId);
// res.send(project);
// });

// router.post("/", async (req, res) => {
//   const newProject = req.body;
//   console.log(newProject);
//   testData.push(newProject);
//   res.send(newProject);

//   // const { error } = validate(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);

//   // let project = new Setup(
//   //   _.pick(req.body, [
//   //     "name",
//   //     "partners",
//   //     "lead",
//   //     "pOne",
//   //     "pTwo",
//   //     "maxProjectLength",
//   //     "maxWorkPackages",
//   //     "maxDeadlines",
//   //     "maxTasksPerPackage",
//   //     "maxTeamMembers",
//   //     "maxSubcontract",
//   //     "maxMaterials",
//   //     "maxTravel",
//   //     "maxCapex",
//   //     "maxOther",
//   //     "marketOptions",
//   //     "materialWarn",
//   //     "materialOver",
//   //     "travelWarn",
//   //     "travelOver",
//   //     "subcontractWarn",
//   //     "subcontractOver",
//   //     "capexWarn",
//   //     "capexOver",
//   //     "otherWarn",
//   //     "otherOver",
//   //     "percentWarn",
//   //     "percentOver",
//   //     "amberSalary",
//   //     "redSalary",
//   //     "amberDayRate",
//   //     "redDayRate",
//   //     "maxMarkets",
//   //     "maxStreams",
//   //     "useTemplates",
//   //     "useAi",
//   //     "useDlt",
//   //     "useMan",
//   //     "useManagerial",
//   //     "useCommercial",
//   //     "useLegal",
//   //     "useTechnical",
//   //     "useEnvironmental",
//   //     "maxEnvRisks",
//   //     "maxLegRisks",
//   //     "maxComRisks",
//   //     "maxTechRisks",
//   //     "maxManRisks",
//   //     "maxDescription",
//   //     "maxMitigation",
//   //   ])

//   // );

//   // try {
//   //   project = await project.save();
//   //   res.send(project);
//   // } catch (ex) {
//   //   // for (field in ex.errors) {
//   //   //   console.log(ex.errors[field].message);
//   //   // }
//   //   console.log(ex.message);
//   // }
// });

// router.delete("/", async (req, res) => {
//   // throw new Error('error test');
//   // const user = await User.findById(req.user.id).select("-password");
//   // res.send(user);
//   const projectId = req.body.projectId;
//   const index = testData.findIndex((user) => user.projectId === projectId);
//   testData.splice(index, 1);
//   res.send({ projectId });
// });

module.exports = router;
