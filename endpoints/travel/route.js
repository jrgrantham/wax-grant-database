// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const travel = [
  {
    projectId: "abc",
    data: [
      {
        projectId: "abc",
        leader: "lead",
        description: "visit Paris from the server",
        quantity: 1,
        cost: 120,
        travelId: "1234",
      },
    ],
  },
];

router.get("/selected", (req, res) => {
  const projectId = req.projectId;
  const index = travel.findIndex((project) => project.projectId === projectId);
  const result = travel[index].data;
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newTravel = {
    projectId,
    data: [],
  };
  travel.push(newTravel);

  res.status(200).send({ message: "New travel successful" });
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const data = req.body;
  const updated = {
    projectId,
    data,
  };
  const index = travel.findIndex(
    (deadline) => deadline.projectId === projectId
  );
  travel.splice(index, 1, updated);
  res.status(200).send(updated);
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = travel.findIndex(
    (travel) => travel.projectId === projectId
  );
  travel.splice(index, 1);
  res.status(200).send({ message: "Delete travel successful" });
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
