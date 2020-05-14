require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./authenticate/auth-router");
const authenticate = require('./authenticate/authenticate-middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json("server running");
});

server.use("/api/auth", authRouter);

module.exports = server;
