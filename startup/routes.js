const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const users = require("../endpoints/users/route");
const auth = require("../endpoints/auth/route");
const home = require("../endpoints/home/route");
const projects = require("../endpoints/projects/route");
const global = require("../endpoints/global/route");
const setup = require("../endpoints/setup/route");
const team = require("../endpoints/team/route");
// const taskOrder = require("../endpoints/taskOrder/route");
const tasks = require("../endpoints/tasks/route");
const deadlines = require("../endpoints/deadlines/route");
const capex = require("../endpoints/capex/route");
const materials = require("../endpoints/materials/route");
const travel = require("../endpoints/travel/route");

const allocations = require("../endpoints/allocations/route");
const resources = require("../endpoints/resources/route");

const authenticate = require("../middleware/authenticate");
// const admin = require("../middleware/admin");
// const checkProject = require("../middleware/checkProject");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/auth", auth);

  app.use("/api/users", users);
  app.use("/api/global", global);
  app.use("/api/setup", setup);
  app.use("/api/projects", projects);
  app.use("/api/team", team);

  // app.use("/api/users", authenticate, admin, users);
  // app.use("/api/projects", authenticate, checkProject, projects);

  app.use("/api/deadlines", deadlines);
  app.use("/api/tasks", tasks);
  app.use("/api/capex", capex);
  app.use("/api/materials", materials);
  app.use("/api/travel", travel);

  app.use("/api/resources", authenticate, resources);
  app.use("/api/allocations", authenticate, allocations);

  app.use("/", home);

  app.use(error);
};
