const mongoose = require("mongoose");
// const winston = require("winston");
const config = require("config");

module.exports = function (app) {
  
  const dev = app.get("env") === "development";
  const dbName = config.get("dbname");
  const dbUser = config.get("dbuser");
  const dbPassword = config.get("dbpassword");

  const localDB = "mongodb://localhost/playground";
  const productionDB = `mongodb+srv://${dbUser}:${dbPassword}@${dbName}.uwmmi.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const uri = dev ? localDB : productionDB;

  console.log(
    "*****\n",
    "file - db.js\n",
    "data -",
    uri,
    "\n",
    "name -",
    dbName,
    "\n",
    "user -",
    dbUser,
    "\n",
    "pass -",
    dbPassword,
    "\n*****"
  );

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      if (dev) console.log(`connected to: ${uri}`);
    })
    .catch(() => {
      console.log("could not connected to mongodb...");
    });
};
