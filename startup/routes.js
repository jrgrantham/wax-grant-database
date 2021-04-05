const express = require("express");
const helmet = require("helmet");

const deadline = require("../routes/deadlines");
const resources = require("../routes/resources");
const users = require("../routes/users");
const allocations = require("../routes/allocations");
const auth = require("../routes/auth");
const home = require("../routes/home");

const error = require("../middleware/error");

const authenticate = require("./middleware/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/deadline", deadline);
  app.use("/api/resources", resources);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/allocations", allocations);
  app.use("/", home);

  app.use(error);
};
