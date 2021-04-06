const express = require("express");
const helmet = require("helmet");

const deadline = require("../endpoints/deadlines/route");
const resources = require("../endpoints/resources/route");
const users = require("../endpoints/users/route");
const allocations = require("../endpoints/allocations/route");
const auth = require("../endpoints/auth/route");
const home = require("../endpoints/home/route");

const authenticate = require("../middleware/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/deadline", authenticate, deadline);
  // app.use("/api/tasks", tasks);
  app.use("/api/resources", resources);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/allocations", allocations);
  app.use("/", home);

  app.use(error);
};
