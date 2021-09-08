const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // winston.handleExceptions and rejections - error handling (9)

  process.on("uncaughtException", (ex) => {
    winston.error(ex.message);
    console.log(ex.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message);
    console.log(ex.message);
    process.exit(1);
  });

  // const logger = winston.createLogger({
  //   level: "info",
  //   format: winston.format.json(),
  //   transports: [
  //     new winston.transports.Console(),
  //     new winston.transports.File({ filename: "logfile.log" }),
  //     new winston.transports.MongoDB({
  //       db: "mongodb://localhost/playground",
  //       level: "error",
  //     }),
  //   ],
  // });

  // logger.info('it works!!');

  winston.add(new winston.transports.File({ filename: "logFile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/playground",
      level: "error",
    })
  );
};
