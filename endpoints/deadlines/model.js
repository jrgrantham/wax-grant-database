const mongoose = require("mongoose");
const Joi = require("joi");

function validateDeadline(deadline) {
  const schema = Joi.object({
    sortPosition: Joi.number().required(),
    type: Joi.string().required(),
    description: Joi.string().min(3).max(255).required(),
    scheduled: Joi.number().required(),
  });
  return schema.validate(deadline);
}

const Deadline = mongoose.model(
  "Deadline",
  new mongoose.Schema({
    sortPosition: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      // enum: ["milestone", "deliverable"],
      lowercase: true,
      trim: true,
    },
    description: { type: String, required: true },
    scheduled: { type: Number, required: true, min: 0, max: 255 },
  })
);

module.exports.Deadline = Deadline;
module.exports.validate = validateDeadline;
