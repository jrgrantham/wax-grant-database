// const asyncMiddleware = require("../middleware/async");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Setup, validate } = require("./model");

router.get("/", async (req, res) => {
  const projects = await Setup.find();
  const projectIds = projects.map((project) => {
    return { projectId: project._id, name: project.name };
  });
  res.send(projectIds);
});

router.get("/myProject", async (req, res) => {
  const projectId = req.projectId;
  const project = await Setup.findById(projectId);
  res.send(project);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("woohoo");

  let project = new Setup(
    _.pick(req.body, [
      "name",
      "partners",
      "lead",
      "pOne",
      "pTwo",
      "maxProjectLength",
      "maxWorkPackages",
      "maxDeadlines",
      "maxTasksPerPackage",
      "maxTeamMembers",
      "maxSubcontract",
      "maxMaterials",
      "maxTravel",
      "maxCapex",
      "maxOther",
      "marketOptions",
      "materialWarn",
      "materialOver",
      "travelWarn",
      "travelOver",
      "subcontractWarn",
      "subcontractOver",
      "capexWarn",
      "capexOver",
      "otherWarn",
      "otherOver",
      "percentWarn",
      "percentOver",
      "amberSalary",
      "redSalary",
      "amberDayRate",
      "redDayRate",
      "maxMarkets",
      "maxStreams",
      "useTemplates",
      "useAi",
      "useDlt",
      "useMan",
      "useManagerial",
      "useCommercial",
      "useLegal",
      "useTechnical",
      "useEnvironmental",
      "maxEnvRisks",
      "maxLegRisks",
      "maxComRisks",
      "maxTechRisks",
      "maxManRisks",
      "maxDescription",
      "maxMitigation",
    ])
  );

  try {
    project = await project.save();
    res.send(project);
  } catch (ex) {
    // for (field in ex.errors) {
    //   console.log(ex.errors[field].message);
    // }
    console.log(ex.message);
  }
});

module.exports = router;
