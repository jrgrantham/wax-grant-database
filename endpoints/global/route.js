// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
// const auth = require("../../middleware/authenticate");
// const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
// const { User, validate } = require("./model");
const { risks, roles, tasks } = require("./data");

const originalData = {
  orgTypes: ["Business", "Academic"],
  orgTypeDefault: "Business",

  orgSizes: [
    "Micro SME",
    "Small Company",
    "Medium Company",
    "Large Company",
    "Academic",
  ],
  orgSizeDefault: "Micro SME",

  natures: ["Platform", "Process", "Product"],
  natureDefault: "Platform",

  ipProtections: [
    "Copyright",
    "Patents",
    "Trade Secrets",
    "Patents and Copyright",
    "Copyright and Trade Secrets",
    "Patents and Trade Secrets",
  ],
  ipProtectionDefault: "Patents and Copyright",

  roles: roles,

  projectRoleDefault: null,

  tasks: tasks,

  riskTemplates: risks,

  categories: [
    "gen", // General
    "cov", // Covid
    "col", // Collaborative
    "sub", // Subcontract
    "man", // Manufacturing
    "sw", // Software
    "ui", // User Interface
    "dat", // Data Analysis
    "dlt", // Blockchain
    "ai", // Artificial Intelligence
    "nlp", // Natural Language Processing - ai dependent
    "med", // Medical
    "fin", // Computer Vision - ai dependent
    "vis", // Finance or Fintech
    "sus", // Sustainability
  ],

  taskTypes: [
    "General",
    "Artificial Intelligence",
    "Data Science",
    "Distributed Ledger",
    "Exploitation",
    "Finance Sector",
    "Hardware",
    "Medical",
    "Project Management",
    "Software",
    "Sustainability",
    "Testing",
    "User Experience",
  ],

  locations: ["UK", "Other"],
  locationDefault: "UK",

  fundingLevelMin: 0,
  fundingLevelMax: 100,
  fundingLevelInc: 5,
  fundingLevelDefault: 70,

  matchFundingSources: ["Investor", "Company Funds"],
  matchFundingSourceDefault: "Investor",

  overheadRateMin: 0,
  overheadRateMax: 100,
  overheadRateInc: 10,
  overheadRateDefault: 20,

  businessWarn: 70,
  academicWarn: 30,

  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
  utilisations: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
};

router.get("/", (req, res) => {
  res.status(200).send(originalData);
});

router.post("/", async (req, res) => {
  const newUser = req.body;
  res.send(newUser);
});

router.delete("/", async (req, res) => {
  const userId = req.body.userId;
  res.send({ userId });
});

module.exports = router;
