const winston = require("winston");
const express = require("express");
const app = express();

require("dotenv").config();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/debugger")(app);

const port = process.env.PORT || 3300;
app.listen(port, () => winston.info(`listening on port ${port}...`));
