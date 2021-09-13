// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const setupData = [
  {
    personId: "person1",
    projectId: "abc",
    leader: "lead",
    name: "James Grantham",
    acronym: "JG",
    role: "tbc",
    salary: 50000,
    employment: "staff",
    location: "UK", // flag if not
    dayRate: 0,
    website: "intangible-engineering.com",
    linkedIn: "linkedIn.com/me",
    profile: "once upon a time...",
  },
  {
    personId: "person4",
    projectId: 1,
    leader: "lead",
    name: "Random Guy",
    acronym: "RG",
    role: "Accounts",
    salary: 30000,
    employment: "staff",
    location: "UK", // flag if not
    dayRate: 50,
  },
  {
    personId: "person2",
    projectId: "abc",
    leader: "lead",
    name: "Damien Jones",
    acronym: "DJ",
    role: "tbc",
    salary: 60000,
    employment: "staff",
    location: "UK", // flag if not
    dayRate: 100,
  },
  {
    personId: "person3",
    projectId: 1,
    leader: "lead",
    name: "Casper Gray",
    acronym: "CG",
    role: "tbc",
    salary: 70000,
    employment: "subcontract",
    location: "UK", // flag if not
    dayRate: 115,
  },
  {
    personId: "person5",
    projectId: 1,
    leader: "lead",
    name: "Random Guy2",
    acronym: "RG",
    role: "tbc",
    salary: 30000,
    employment: "subcontract",
    location: "", // flag if not
    dayRate: 50,
  },
];

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);
  const selectedprojectid = req.headers.selectedprojectid;
  // console.log(selectedprojectid);
  const result = [];
  setupData.forEach((person) => {
    console.log(person.projectId);
    if (person.projectId === selectedprojectid) result.push(person);
  });
  res.status(200).send(result);
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
