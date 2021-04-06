const mongoose = require("mongoose");
const Joi = require("joi");

function validateTask(resource) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    acronym: Joi.string().min(2).max(3).required(),
    role: Joi.string().required(),
    salary: Joi.number().required(),
    staff: Joi.boolean(),
    location: Joi.string().required(), // flag if not
    dayRate: Joi.number().required(),
  });
  return schema.validate(resource);
}

const Resource = mongoose.model(
  "Resource",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    acronym: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    salary: { type: Number, required: true },
    staff: { type: Boolean, required: true },
    location: { type: String, required: true }, // flag if not
    dayRate: { type: Number, required: true },
  })
);

module.exports.Resource = Resource;
module.exports.validate = validateTask;
