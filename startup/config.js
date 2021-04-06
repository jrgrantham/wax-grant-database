const config = require("config");

module.exports = function () {
  // console.log("index.js " + config.get("name"));
  // console.log("index.js " + config.get("mail.host"));
  // console.log("index.js " + config.get("mail.password"));
  // console.log("index.js " + process.env.PASSWORD);

  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
