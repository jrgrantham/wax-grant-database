const mongoose = require("mongoose");
const Joi = require("joi");

function validateTask(task) {
  let month = Joi.object().keys({
    // test: Joi.string().required()
    status: Joi.boolean().required(),
    barNumber:  Joi.number().required(),
    value:  Joi.number().required(),
    blockId:  Joi.string().required(),
    scheduleIndex:  Joi.number().required(),
  });

  const schema = Joi.object({
    workPackageTitle: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    days: Joi.number().required(),
    startDep: Joi.number().required(),
    endDep: Joi.number().required(),
    dayLoading: Joi.string().min(3).max(15).required(),
    sortPosition: Joi.number().required(),
    schedule: Joi.array().items(month),
  });
  return schema.validate(task);
}

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    workPackageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: String,
      required: true,
      trim: true,
    },
    startDep: {
      type: Number,
      default: 0,
    },
    endDep: {
      type: Number,
      default: 0,
    },
    dayLoading: {
      type: String,
      required: true,
      trim: true,
    },
    sortPosition: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: [Object],
    },
  })
);

module.exports.Task = Task;
module.exports.validate = validateTask;
