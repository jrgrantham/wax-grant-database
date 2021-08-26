const mongoose = require("mongoose");
// const winston = require("winston");

module.exports = function (app) {
  // mongoose.set("useNewUrlParser", true);
  // mongoose.set("useFindAndModify", false);
  // mongoose.set("useCreateIndex", true);
  // mongoose.set("useUnifiedTopology", true);
  mongoose
    .connect("mongodb://localhost/playground", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      if (app.get("env") === "development") {
        console.log("connected to mongodb...");
      }
    })
    .catch(() => {
      console.log("could not connected to mongodb...");
    });
};
