const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");

module.exports = function (app) {
  if (app.get("env") === "development") {
    console.log(`index.js Environment: ${app.get("env")}`);
    app.use(morgan("tiny"));
    startupDebugger("Morgan enabled...");
  }
  dbDebugger("turn on with env variable");
};
