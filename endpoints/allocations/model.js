const mongoose = require("mongoose");

const Allocation = mongoose.model(
  "Allocation",
  new mongoose.Schema({
    projectId: { type: String, required: true },
    data: { type: Array, required: true },
  })
);

module.exports.Allocation = Allocation;
// module.exports.validate = validateAllocation;
