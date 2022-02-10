const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authenticate = require("../middleware/authenticate");

const users = require("../endpoints/users/route");
const login = require("../endpoints/login/login");

const allocations = require("../endpoints/allocations");
const assignments = require("../endpoints/assignments");
const capex = require("../endpoints/capex");
const deadlines = require("../endpoints/deadlines");
const global = require("../endpoints/global");

const materials = require("../endpoints/materials/route");
const other = require("../endpoints/other/route");
const projects = require("../endpoints/projects/route");
const revenue = require("../endpoints/revenue/route");
const risks = require("../endpoints/risks/route");
const setup = require("../endpoints/setup/route");
const tasks = require("../endpoints/tasks");
const team = require("../endpoints/team/route");
const templates = require("../endpoints/templates/route");
const travel = require("../endpoints/travel/route");


module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/allocations", authenticate, allocations);
  app.use("/api/assignments", authenticate, assignments);
  app.use("/api/capex", authenticate, capex);
  app.use("/api/deadlines", authenticate, deadlines);
  app.use("/api/global", authenticate, global);
  app.use("/api/login", login);
  app.use("/api/materials", authenticate, materials);
  app.use("/api/other", authenticate, other);
  app.use("/api/projects", authenticate, projects);
  app.use("/api/revenue", authenticate, revenue);
  app.use("/api/risks", authenticate, risks);
  app.use("/api/setup", authenticate, setup);
  app.use("/api/tasks", authenticate, tasks);
  app.use("/api/team", authenticate, team);
  app.use("/api/templates", authenticate, templates);
  app.use("/api/travel", authenticate, travel);
  app.use("/api/users", authenticate, users);
};
