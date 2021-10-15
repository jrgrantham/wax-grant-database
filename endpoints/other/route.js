// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const other = [
  {
    projectId: "abc",
    data: [
      {
        description: "walking boots from the server",
        cost: 120,
        otherId: "1234",
        leader: "lead",
      },
    ],
  },
];

router.get("/selected", (req, res) => {
  const projectId = req.projectId;
  const index = other.findIndex(
    (other) => other.projectId === projectId
  );
  const result = other[index].data;
  res.status(200).send(result);
});

router.post("/new", async (req, res) => {
  const projectId = req.body.projectId;
  const newDeadline = {
    projectId,
    data: [],
  };
  other.push(newDeadline);
  res.status(200).send({ message: "New other successful" });
});

router.put("/selected", async (req, res) => {
  const projectId = req.projectId;
  const data = req.body;
  const updated = {
    projectId,
    data,
  };
  const index = other.findIndex(
    (other) => other.projectId === projectId
  );
  other.splice(index, 1, updated);
  res.status(200).send({ message: "Update other successful" });
});

router.delete("/selected", async (req, res) => {
  const projectId = req.projectId;
  const index = other.findIndex(
    (other) => other.projectId === projectId
  );
  other.splice(index, 1);
  res.status(200).send({ message: "Delete other successful" });
});

// router.get("/myProject", async (req, res) => {
// const projectId = req.projectId;
// const other = await Setup.findById(projectId);
// res.send(other);
// });

// router.post("/", async (req, res) => {
//   const newProject = req.body;
//   console.log(newProject);
//   testData.push(newProject);
//   res.send(newProject);

//   // const { error } = validate(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);

//   // let other = new Setup(
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
//   //   other = await other.save();
//   //   res.send(other);
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
