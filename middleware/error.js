const winston = require("winston");

module.exports = function (error, req, res) {
  winston.error(error.message);
  res.status(500).send("Something failed.");
};
