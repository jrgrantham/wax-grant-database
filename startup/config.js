const config = require("config");

module.exports = function () {
  // console.log("index.js " + config.get("name"));
  // console.log("index.js " + config.get("mail.host"));
  // console.log("index.js " + config.get("mail.password"));
  // console.log("config.js - name: " + config.get('name'));
  // console.log("config.js - password: " + process.env.PASSWORD);
  
  // console.log("config.js - name: " + config.get('jwtPrivateKey'));


  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
