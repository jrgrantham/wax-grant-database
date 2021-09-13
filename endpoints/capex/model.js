const mongoose = require("mongoose");
const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// const config = require("config");

function validateSetup(setup) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),

    partners: Joi.number().min(1).max(3).required(),
    lead: Joi.string().min(3).max(255).required().email(),
    pOne: Joi.string().min(3).max(255).email(),
    pTwo: Joi.string().min(3).max(255).email(),

    maxProjectLength: Joi.number().min(1).max(250).required(),
    maxWorkPackages: Joi.number().min(1).max(99).required(),
    maxDeadlines: Joi.number().min(1).max(99).required(),
    maxTasksPerPackage: Joi.number().min(1).max(99).required(),

    maxTeamMembers: Joi.number().min(1).max(99).required(),
    maxSubcontract: Joi.number().min(1).max(99).required(),
    maxMaterials: Joi.number().min(1).max(99).required(),
    maxTravel: Joi.number().min(1).max(99).required(),
    maxCapex: Joi.number().min(1).max(99).required(),
    maxOther: Joi.number().min(1).max(99).required(),

    // marketOptions: ["US Market", "Asia Market"],

    materialWarn: Joi.number().min(1).max(99).required(),
    materialOver: Joi.number().min(1).max(99).required(),
    travelWarn: Joi.number().min(1).max(99).required(),
    travelOver: Joi.number().min(1).max(99).required(),
    subcontractWarn: Joi.number().min(1).max(99).required(),
    subcontractOver: Joi.number().min(1).max(99).required(),
    capexWarn: Joi.number().min(1).max(99).required(),
    capexOver: Joi.number().min(1).max(99).required(),
    otherWarn: Joi.number().min(1).max(99).required(),
    otherOver: Joi.number().min(1).max(99).required(),
    percentWarn: Joi.number().min(1).max(99).required(),
    percentOver: Joi.number().min(1).max(99).required(),

    amberSalary: Joi.number().min(1).max(250000).required(),
    redSalary: Joi.number().min(1).max(250000).required(),
    amberDayRate: Joi.number().min(1).max(2500).required(),
    redDayRate: Joi.number().min(1).max(2500).required(),

    maxMarkets: Joi.number().min(1).max(9).required(),
    maxStreams: Joi.number().min(1).max(9).required(),

    useTemplates: Joi.boolean().required(),
    useAi: Joi.boolean().required(),
    useDlt: Joi.boolean().required(),
    useMan: Joi.boolean().required(),

    useManagerial: Joi.boolean().required(),
    useCommercial: Joi.boolean().required(),
    useLegal: Joi.boolean().required(),
    useTechnical: Joi.boolean().required(),
    useEnvironmental: Joi.boolean().required(),

    maxEnvRisks: Joi.number().min(1).max(99).required(),
    maxLegRisks: Joi.number().min(1).max(99).required(),
    maxComRisks: Joi.number().min(1).max(99).required(),
    maxTechRisks: Joi.number().min(1).max(99).required(),
    maxManRisks: Joi.number().min(1).max(99).required(),

    maxDescription: Joi.number().min(1).max(2500).required(),
    maxMitigation: Joi.number().min(1).max(2500).required(),
  });
  return schema.validate(setup);
}

const setupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  partners: {
    type: Number,
    required: true,
  },
  lead: {
    type: String,
    required: true,
  },
  pOne: {
    type: String,
    required: true,
  },
  pTwo: {
    type: String,
    required: true,
  },

  maxProjectLength: {
    type: String,
    required: true,
  },
  maxWorkPackages: {
    type: String,
    required: true,
  },
  maxDeadlines: {
    type: String,
    required: true,
  },
  maxTasksPerPackage: {
    type: String,
    required: true,
  },

  maxTeamMembers: {
    type: String,
    required: true,
  },
  maxSubcontract: {
    type: String,
    required: true,
  },
  maxMaterials: {
    type: String,
    required: true,
  },
  maxTravel: {
    type: String,
    required: true,
  },
  maxCapex: {
    type: String,
    required: true,
  },
  maxOther: {
    type: String,
    required: true,
  },

  // marketOptions: ["US Market", "Asia Market"],

  materialWarn: {
    type: String,
    required: true,
  },
  materialOver: {
    type: String,
    required: true,
  },
  travelWarn: {
    type: String,
    required: true,
  },
  travelOver: {
    type: String,
    required: true,
  },
  subcontractWarn: {
    type: String,
    required: true,
  },
  subcontractOver: {
    type: String,
    required: true,
  },
  capexWarn: {
    type: String,
    required: true,
  },
  capexOver: {
    type: String,
    required: true,
  },
  otherWarn: {
    type: String,
    required: true,
  },
  otherOver: {
    type: String,
    required: true,
  },
  percentWarn: {
    type: String,
    required: true,
  },
  percentOver: {
    type: String,
    required: true,
  },

  amberSalary: {
    type: String,
    required: true,
  },
  redSalary: {
    type: String,
    required: true,
  },
  amberDayRate: {
    type: String,
    required: true,
  },
  redDayRate: {
    type: String,
    required: true,
  },
  // amberOverUtil: 55,
  // redOverUtil: 59,

  maxMarkets: {
    type: String,
    required: true,
  },
  maxStreams: {
    type: String,
    required: true,
  },

  useTemplates: {
    type: String,
    required: true,
  },
  useAi: {
    type: String,
    required: true,
  },
  useDlt: {
    type: String,
    required: true,
  },
  useMan: {
    type: String,
    required: true,
  },

  useManagerial: {
    type: String,
    required: true,
  },
  useCommercial: {
    type: String,
    required: true,
  },
  useLegal: {
    type: String,
    required: true,
  },
  useTechnical: {
    type: String,
    required: true,
  },
  useEnvironmental: {
    type: String,
    required: true,
  },

  maxEnvRisks: {
    type: String,
    required: true,
  },
  maxLegRisks: {
    type: String,
    required: true,
  },
  maxComRisks: {
    type: String,
    required: true,
  },
  maxTechRisks: {
    type: String,
    required: true,
  },
  maxManRisks: {
    type: String,
    required: true,
  },

  maxDescription: {
    type: String,
    required: true,
  },
  maxMitigation: {
    type: String,
    required: true,
  },
});

const Setup = mongoose.model("Project", setupSchema);

module.exports.Setup = Setup;
module.exports.validate = validateSetup;
