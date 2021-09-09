// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const testData = [
  {
    projectId: "1234",
    projectDesc: "This is a short project identifier",
    partners: 2,
    lead: "james@xyx.com",
    pOne: "damien@xyx.com",
    pTwo: "",
    projectColor: "rgba(139,197,63)",
  },
  {
    projectId: "dghdfgh",
    projectDesc: "This is project 2",
    partners: 1,
    lead: "damien@xyx.com",
    pOne: "",
    pTwo: "",
    projectColor: "rgba(139,197,63)",
  },
  {
    projectId: "12dsfvsd34",
    projectDesc: "Another project here",
    partners: 1,
    lead: "damien@xyx.com",
    pOne: "",
    pTwo: "",
    projectColor: "rgba(86,127,191)",
  },
  {
    projectId: "12svdvfsdv34",
    projectDesc: "This is the 4th and final project",
    partners: 0,
    lead: "",
    pOne: "",
    pTwo: "",
    projectColor: "rgba(250,172,24)",
  },
];

router.get("/", async (req, res) => {
  // const allProjects = await Setup.find();
  // const projects = allProjects.map((project) => {
  //   return { projectId: project._id, name: project.name };
  // });
  res.send(testData);
});

// router.get("/myProject", async (req, res) => {
  // const projectId = req.projectId;
  // const project = await Setup.findById(projectId);
  // res.send(project);
// });

router.post("/", async (req, res) => {
  const newProject = req.body;
  console.log(newProject);
  testData.push(newProject);
  res.send(newProject);

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // let project = new Setup(
  //   _.pick(req.body, [
  //     "name",
  //     "partners",
  //     "lead",
  //     "pOne",
  //     "pTwo",
  //     "maxProjectLength",
  //     "maxWorkPackages",
  //     "maxDeadlines",
  //     "maxTasksPerPackage",
  //     "maxTeamMembers",
  //     "maxSubcontract",
  //     "maxMaterials",
  //     "maxTravel",
  //     "maxCapex",
  //     "maxOther",
  //     "marketOptions",
  //     "materialWarn",
  //     "materialOver",
  //     "travelWarn",
  //     "travelOver",
  //     "subcontractWarn",
  //     "subcontractOver",
  //     "capexWarn",
  //     "capexOver",
  //     "otherWarn",
  //     "otherOver",
  //     "percentWarn",
  //     "percentOver",
  //     "amberSalary",
  //     "redSalary",
  //     "amberDayRate",
  //     "redDayRate",
  //     "maxMarkets",
  //     "maxStreams",
  //     "useTemplates",
  //     "useAi",
  //     "useDlt",
  //     "useMan",
  //     "useManagerial",
  //     "useCommercial",
  //     "useLegal",
  //     "useTechnical",
  //     "useEnvironmental",
  //     "maxEnvRisks",
  //     "maxLegRisks",
  //     "maxComRisks",
  //     "maxTechRisks",
  //     "maxManRisks",
  //     "maxDescription",
  //     "maxMitigation",
  //   ])

  // );

  // try {
  //   project = await project.save();
  //   res.send(project);
  // } catch (ex) {
  //   // for (field in ex.errors) {
  //   //   console.log(ex.errors[field].message);
  //   // }
  //   console.log(ex.message);
  // }
});

router.delete("/", async (req, res) => {
  // throw new Error('error test');
  // const user = await User.findById(req.user.id).select("-password");
  // res.send(user);
  const projectId = req.body.projectId;
  const index = testData.findIndex((user) => user.projectId === projectId);
  testData.splice(index, 1);
  res.send({ projectId });
});

module.exports = router;
