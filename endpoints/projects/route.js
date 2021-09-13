// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
const express = require("express");
const router = express.Router();
// const { Setup, validate } = require("./model");

const setupData = [
  {
    projectId: 'abc',
    status: {
      gantt: false,
      details: {
        lead: false,
        pOne: true,
        pTwo: false,
      },
      team: {
        lead: false,
        pOne: false,
        pTwo: false,
      },
      costs: {
        lead: false,
        pOne: false,
        pTwo: false,
      },
      revenue: false,
      setup: false,
      risks: false,
    },
    details: {
      productPlatformName: "My First Project on the server",
      applicationNumber: "123445",
      nature: "Process",
      ipProtection: "protection",
      projectName: "first Project",
      projectLength: 3,
      startMonth: "",
      startYear: "",
      projectManager: "projectManager",
      software: "software",
      matchFunding: "funding",
      ganttRef: "ganttRef",
      riskRef: "riskRef",
      competitor: "competitor",
    },
    lead: {
      companyName: "lead company",
      companyAcronym: "acronym",
      organisationType: "type",
      organisationSize: "size",
      postcode: "postcode",
      turnover: 20000,
      lastFinancialMonth: "",
      lastFinancialYear: "year",
      lawyer: "lawyer",
      bankHolidays: 3,
      annualLeave: 27,
      numEmployees: 10,
      overheadRate: 10,
      partnerFunding: "",
      fundingLevel: 10,
      matchFundingSource: "source",
      investorName: "name",

      detailsComplete: false,
      teamComplete: false,
      ganttComplete: false,
      costsComplete: false,
      revenueComplete: false,
      risksComplete: false,
    },
    pOne: {
      companyName: "Company One",
      companyAcronym: "",
      organisationType: "",
      organisationSize: "",
      postcode: "",
      turnover: 0,
      lastFinancialMonth: "",
      lastFinancialYear: "",
      lawyer: "",
      bankHolidays: 0,
      annualLeave: 0,
      numEmployees: 0,
      overheadRate: 10,
      partnerFunding: 0,
      fundingLevel: 0,
      matchFundingSource: "",
      investorName: "",

      detailsComplete: false,
      teamComplete: false,
      ganttComplete: false,
      costsComplete: false,
      revenueComplete: false,
      risksComplete: false,
    },
    pTwo: {
      companyName: "edit the company name...",
      companyAcronym: "acronym",
      organisationType: "type",
      organisationSize: "size",
      postcode: "postcode",
      turnover: 20000,
      lastFinancialMonth: "",
      lastFinancialYear: "year",
      lawyer: "lawyer",
      bankHolidays: 3,
      annualLeave: 30,
      numEmployees: 10,
      overheadRate: 10,
      partnerFunding: "partner",
      fundingLevel: 10,
      matchFundingSource: "source",
      investorName: "name",

      detailsComplete: false,
      teamComplete: false,
      ganttComplete: false,
      costsComplete: false,
      revenueComplete: false,
      risksComplete: false,
    },
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
