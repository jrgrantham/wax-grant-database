// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const riskData = [
  {
    projectId: "abc",
    data: [
      {
        riskId: 'riskOnServer',
        category: 'managerial',
        description: "Description... server",
        mitigation: "Mitigation...",
        probability: 0,
        consequence: 0,
        postProbability: 0,
        postConsequence: 0,
      },
    ],
  },
];

router.get("/selected", (req, res) => {
  const selected = req.projectId;
  const index = riskData.findIndex(
    (project) => project.projectId === selected
  );
  const result = riskData[index].data;
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newRisk = {
    projectId,
    data: [],
  };
  riskData.push(newRisk);
  // console.log(riskData);
  res.status(200).send({ message: "New risks successful" });
});

router.put("/selected", (req, res) => {
  const selected = req.projectId;
  const data = req.body;
  const index = riskData.findIndex(
    (project) => project.projectId === selected
  );
  riskData[index].data = data;
  
  // console.log(data);
  res.status(200).send({ message: "Risks updated" });
});

router.post("/selected", (req, res) => {
  const projectId = req.body;
  const newProject = {
    projectId,
    data: [],
  };
  riskData.push(newProject);
  res.status(200).send({ message: "Risks initiated" });
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = riskData.findIndex(
    (risk) => risk.projectId === projectId
  );
  riskData.splice(index, 1);
  res.status(200).send({ message: "Delete risk successful" });
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
