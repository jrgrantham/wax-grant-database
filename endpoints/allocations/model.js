const mongoose = require("mongoose");
const Joi = require("joi");

function validateAllocation(allocation) {
  const schema = Joi.object({
    taskId: Joi.string().max(255).required(),
    personId: Joi.string().max(255).required(),
    percent: Joi.number().min(1).max(100).required(),
  });
  return schema.validate(allocation);
}

const Allocation = mongoose.model(
  "Allocation",
  new mongoose.Schema({
    taskId: {
      type: String,
      required: true,
      maxlength: 255,
    },
    personId: {
      type: String,
      required: true,
      maxlength: 255,
    },
    percent: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
  })
);

module.exports.Allocation = Allocation;
module.exports.validate = validateAllocation;
