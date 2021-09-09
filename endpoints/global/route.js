// const asyncMiddleware = require("../middleware/async");
// const _ = require("lodash");
// const auth = require("../../middleware/authenticate");
// const bcryptjs = require("bcryptjs");
const express = require("express");
const router = express.Router();
// const { User, validate } = require("./model");

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

  projectRoles: [
    "Project Manager",
    "Technical Lead",
    "Senior Software Developer",
    "Software Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI and ML Lead",
    "Data Architect",
    "Data Scientist",
    "Business Development and Market Engagement",
    "User Experience",
    "Mechanical Engineer",
    "Materials Engineer",
    "Hardware Developer",
    "Industrial Design",
    "Electronics Engineer",
  ],
  projectRoleDefault: null,

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

  years: [
    2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029
  ],
  utilisations: [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  ],
}

router.get("/", (req, res) => {
  res.status(200).send(originalData)
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
  res.send({userId});
});

module.exports = router;
