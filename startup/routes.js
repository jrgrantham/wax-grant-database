const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const deadlines = require("../endpoints/deadlines/route");
const resources = require("../endpoints/resources/route");
const tasks = require("../endpoints/tasks/route");
const users = require("../endpoints/users/route");
const allocations = require("../endpoints/allocations/route");
const auth = require("../endpoints/auth/route");
const home = require("../endpoints/home/route");
const projects = require("../endpoints/setup/route");

const authenticate = require("../middleware/authenticate");
const admin = require("../middleware/admin");
const checkProject = require("../middleware/checkProject");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/auth", auth);

  app.use("/api/users", users);
  // app.use("/api/users", authenticate, admin, users);
  app.use("/api/projects", projects);
  // app.use("/api/projects", authenticate, checkProject, projects);

  app.use("/api/deadlines", authenticate, deadlines);
  app.use("/api/tasks", authenticate, tasks);
  app.use("/api/resources", authenticate, resources);
  app.use("/api/allocations", authenticate, allocations);

  app.use("/", home);

  app.use(error);
};
