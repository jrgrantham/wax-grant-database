require("dotenv").config();

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((error) => console.log("could not connect to mongodb, " + error));

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const error = require("./middleware/error");
const deadline = require("./routes/deadlines");
const resources = require("./routes/resources");
const users = require("./routes/users");
const allocations = require("./routes/allocations");
const auth = require("./routes/auth");
const home = require("./routes/home");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const logger = require("./middleware/logger");
const authenticate = require("./middleware/auth");

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

console.log("index.js " + config.get("name"));
console.log("index.js " + config.get("mail.host"));
console.log("index.js " + config.get("mail.password"));
console.log("index.js " + process.env.PASSWORD);

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
