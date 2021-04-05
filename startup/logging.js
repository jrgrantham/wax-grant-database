const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // winston.handleExceptions and rejections - error handling (9)

  process.on("uncaughtException", (ex) => {
    winston.error(ex.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logFile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/playground",
      level: "error",
    })
  );
};
