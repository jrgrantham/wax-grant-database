// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
// const auth = require("../../middleware/authenticate");
// const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
// const { User, validate } = require("./model");

const setupData = [
  {
    projectId: "abc",
    projectDesc: "Description...",

    partners: 0,
    lead: "",
    pOne: "",
    pTwo: "",
    leadId: "", // required for updates to linked information (projects?)
    pOneId: "",
    pTwoId: "",
    color: "",

    maxProjectLength: 36,
    maxWorkPackages: 10,
    maxDeadlines: 10,
    maxTasksPerPackage: 10,

    maxTeamMembers: 10,
    maxSubcontract: 5,
    maxMaterials: 10,
    maxTravel: 10,
    maxCapex: 10,
    maxOther: 5,

    marketOptions: ["US Market", "Asia Market"],

    materialWarn: 25,
    materialOver: 40,
    travelWarn: 25,
    travelOver: 40,
    subcontractWarn: 25,
    subcontractOver: 40,
    capexWarn: 25,
    capexOver: 40,
    otherWarn: 25,
    otherOver: 40,
    percentWarn: 25,
    percentOver: 40,

    amberSalary: 70000,
    redSalary: 90000,
    amberDayRate: 700,
    redDayRate: 1200,
    amberOverUtil: 55,
    redOverUtil: 59,

    maxMarkets: 3,
    maxStreams: 4,

    useTemplates: true,
    useAi: true,
    useDlt: true,
    useMan: true,

    useManagerial: true,
    useCommercial: true,
    useLegal: true,
    useTechnical: true,
    useEnvironmental: true,

    maxEnvRisks: 2,
    maxLegRisks: 2,
    maxComRisks: 8,
    maxTechRisks: 8,
    maxManRisks: 8,

    maxDescription: 250,
    maxMitigation: 250,
  },
];

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);
  const selectedprojectid = req.headers.selectedprojectid;
  const result = setupData.find(
    ({ projectId }) => projectId === selectedprojectid
  );
  res.status(200).send(result);
});

router.get("/", (req, res) => {
  // protect route, admin only
  const list = [];
  setupData.forEach((project) => {
    list.push({
      projectId: project.projectId,
      projectDesc: project.projectDesc,
      lead: project.lead,
      pOne: project.pOne,
      pTwo: project.pTwo,
      leadId: project.leadId,
      pOneId: project.pOneId,
      pTwoId: project.pTwoId,
      color: project.color,
    });
  });
  res.status(200).send(setupData);
});

router.get("/selected", (req, res) => {
  //   const user = await User.findById(req.user.id).select("-password");
  //   res.send(user);
  // const projectId = res.header.selectedProjectId;
  // console.log(projectId);
  res.status(200).send(setupData);
});

// router.get("/me", auth, async (req, res) => {
//   // throw new Error('error test');
//   const user = await User.findById(req.user.id).select("-password");
//   res.send(user);
// });

router.post("/", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  // testData.push(newUser);
  res.send(newUser);

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // let user = await User.findOne({ email: req.body.email });
  // if (user) return res.status(400).send("User already registered");

  // user = new User(_.pick(req.body, ["password", "name", "email"]));
  // const newPassword = bcryptjs.hashSync(req.body.password, 10);
  // user.password = newPassword;

  // try {
  //   user = await user.save();
  //   console.log(user);

  //   const token = user.generateAuthToken();
  //   res
  //     .header("x-auth-token", token)
  //     .send(_.pick(user, ["_id", "name", "email"]));
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
  const userId = req.body.userId;
  // const index = testData.findIndex((user) => user.userId === userId);
  // testData.splice(index, 1);
  res.send({ userId });
});

module.exports = router;
