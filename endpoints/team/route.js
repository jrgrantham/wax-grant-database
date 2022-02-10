// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const setupData = [
  {
    projectId: "abc",
    data: [
      {
        personId: "person1",
        // projectId: "abc",
        leader: "lead",
        name: "James Grantham",
        acronym: "JG",
        role: "tbc",
        // salary: 50000,
        employment: "subcontract",
        location: "UK", // flag if not
        dayRate: 0,
        website: "intangible-engineering.com",
        linkedIn: "linkedIn.com/me",
        profile: "once upon a time...",
      },
      {
        personId: "person2",
        // projectId: "abc",
        leader: "lead",
        name: "Damien Jones",
        acronym: "DJ",
        role: "tbc",
        salary: 60000,
        employment: "staff",
        location: "UK", // flag if not
        // dayRate: 100,
      },
      {
        personId: "person3",
        // projectId: "abc",
        leader: "lead",
        name: "dad",
        acronym: "DAD",
        role: "tbc",
        salary: 60000,
        employment: "staff",
        location: "UK", // flag if not
        // dayRate: 100,
      },
      {
        personId: "person4",
        // projectId: "abc",
        leader: "lead",
        name: "Damien Jones",
        acronym: "DJ",
        role: "tbc",
        salary: 60000,
        employment: "staff",
        location: "UK", // flag if not
        // dayRate: 100,
      },
      {
        personId: "person5",
        // projectId: "abc",
        leader: "lead",
        name: "Damien Jones",
        acronym: "DJ",
        role: "tbc",
        salary: 60000,
        employment: "staff",
        location: "UK", // flag if not
        // dayRate: 100,
      },
      {
        personId: "person6",
        // projectId: "abc",
        leader: "lead",
        name: "Damien Jones",
        acronym: "DJ",
        role: "tbc",
        salary: 60000,
        employment: "staff",
        location: "UK", // flag if not
        // dayRate: 100,
      },
    ],
  },
];

router.get("/selected", (req, res) => {
  const selected = req.projectId;
  const index = setupData.findIndex(
    (project) => project.projectId === selected
  );
  const result = setupData[index].data;
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newTeam = {
    projectId,
    data: [],
  };
  setupData.push(newTeam);
  // console.log(setupData);
  res.status(200).send({ message: "New team successful" });
});

router.put("/selected", (req, res) => {
  const selected = req.projectId;
  const data = req.body;
  const index = setupData.findIndex(
    (project) => project.projectId === selected
  );
  setupData[index].data = data;
  // console.log(data);
  res.status(200).send({ message: "Team updated" });
});

router.post("/selected", (req, res) => {
  const projectId = req.body;
  const newProject = {
    projectId,
    data: [],
  };
  setupData.push(newProject);
  res.status(200).send({ message: "Team initiated" });
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = setupData.findIndex(
    (team) => team.projectId === projectId
  );
  setupData.splice(index, 1);
  res.status(200).send({ message: "Delete team successful" });
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
