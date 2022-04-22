// const winston = require("winston");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("wax grant server is running...");
});

require("dotenv").config();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/config")();
require("./startup/debugger")(app);

const port = process.env.PORT || 3330;
app.listen(port, () => console.log(`listening on port ${port}...`));
// app.listen(port, () => winston.info(`listening on port ${port}...`));
