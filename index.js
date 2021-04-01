// const server = require('./server.js');

// const port = process.env.PORT || 3300;

// server.listen(port, () => {
//   console.log(`\n**** Server listening on port ${port} ****\n`);
require("dotenv").config();

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/auth");
const gantt = require("./routes/gantt");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/gantt", gantt);
app.use("/", home);

console.log('index.js ' + config.get("name"));
console.log('index.js ' + config.get("mail.host"));
console.log('index.js ' + config.get("mail.password"));
console.log('index.js ' + process.env.PASSWORD);

if (app.get("env") === "development") {
  console.log(`index.js Environment: ${app.get("env")}`);
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

dbDebugger("turn on with env variable");

app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port}...`));
