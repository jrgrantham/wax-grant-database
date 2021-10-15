const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const users = require("../endpoints/users/route");
const login = require("../endpoints/login/login");
// const home = require("../endpoints/home/route");
const projects = require("../endpoints/projects/route");
const global = require("../endpoints/global/route");
const setup = require("../endpoints/setup/route");
const team = require("../endpoints/team/route");
// const taskOrder = require("../endpoints/taskOrder/route");
const tasks = require("../endpoints/tasks/route");
const taskOrder = require("../endpoints/taskOrder/route");
const deadlines = require("../endpoints/deadlines/route");
const capex = require("../endpoints/capex/route");
const materials = require("../endpoints/materials/route");
const travel = require("../endpoints/travel/route");
const other = require("../endpoints/other/route");
const assignments = require("../endpoints/assignments/route");
const revenue = require("../endpoints/revenue/route");

const allocations = require("../endpoints/allocations/route");
// const resources = require("../endpoints/resources/route");

const authenticate = require("../middleware/authenticate");
const admin = require("../middleware/admin");
// const checkProject = require("../middleware/checkProject");
// const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/login", login);
  app.use("/api/users", authenticate, users);

  app.use("/api/global", authenticate, global);
  app.use("/api/setup", authenticate, setup);
  app.use("/api/projects", authenticate, projects);
  app.use("/api/team", authenticate, team);
  app.use("/api/deadlines", authenticate, deadlines);
  app.use("/api/tasks", authenticate, tasks);
  app.use("/api/taskOrder", authenticate, taskOrder);
  app.use("/api/capex", authenticate, capex);
  app.use("/api/materials", authenticate, materials);
  app.use("/api/travel", authenticate, travel);
  app.use("/api/other", authenticate, other);
  app.use("/api/assignments", authenticate, assignments);
  // app.use("/api/resources", authenticate, resources);
  app.use("/api/allocations", authenticate, allocations);
  app.use("/api/revenue", authenticate, revenue);

  // app.use(error);
};
