const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const authenticate = require("../middleware/authenticate");

const users = require("../endpoints/users/route");
const login = require("../endpoints/login/login");
const reset = require("../endpoints/login/reset");
// const download = require("../endpoints/download/route");

const allocations = require("../endpoints/allocations");
const assignments = require("../endpoints/assignments");
const capex = require("../endpoints/capex");
const deadlines = require("../endpoints/deadlines");
const global = require("../endpoints/global");
const materials = require("../endpoints/materials");
const other = require("../endpoints/other");
const projects = require("../endpoints/projects");
const revenue = require("../endpoints/revenue");
const risks = require("../endpoints/risks");
const setup = require("../endpoints/setup");
const tasks = require("../endpoints/tasks");
const team = require("../endpoints/team");
const travel = require("../endpoints/travel");
const email = require("../endpoints/email/mailRouter");

module.exports = function (app) {
  var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors());

  app.use(function (req, res, next) {
    console.log("..... here .....");

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/login", login);
  app.use("/api/resetPassword", reset);
  app.use("/api/users", authenticate, users);
  // app.use("/api/download", authenticate, download);

  app.use("/api/allocations", authenticate, allocations);
  app.use("/api/assignments", authenticate, assignments);
  app.use("/api/capex", authenticate, capex);
  app.use("/api/deadlines", authenticate, deadlines);
  app.use("/api/global", authenticate, global);
  app.use("/api/materials", authenticate, materials);
  app.use("/api/other", authenticate, other);
  app.use("/api/projects", authenticate, projects);
  app.use("/api/revenue", authenticate, revenue);
  app.use("/api/risks", authenticate, risks);
  app.use("/api/setup", authenticate, setup);
  app.use("/api/tasks", authenticate, tasks);
  app.use("/api/team", authenticate, team);
  app.use("/api/travel", authenticate, travel);
  app.use("/api/email", email);
};
