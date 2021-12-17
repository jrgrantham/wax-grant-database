const mongoose = require("mongoose");
// const Joi = require("joi");

// function validateDeadline(deadline) {
//   const schema = Joi.object({
//     sortPosition: Joi.number().required(),
//     type: Joi.string().required(),
//     description: Joi.string().min(3).max(255).required(),
//     scheduled: Joi.number().required(),
//   });
//   return schema.validate(deadline);
// }

const Deadline = mongoose.model(
  "Deadline",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  })
);

module.exports.Deadline = Deadline;
// module.exports.validate = validateDeadline;
