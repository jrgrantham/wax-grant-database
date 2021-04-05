require("dotenv").config();


const express = require("express");
const app = express();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
// require("./startup/validation")();
require("./startup/debugger")(app);

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`listening on port ${port}...`));
