require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./authenticate/auth-router");
const authenticate = require('./authenticate/authenticate-middleware');
const userRouter = require('./users/users-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json("risk server running");
});

server.use("/api/auth", authRouter);
server.use('/api/users', authenticate, userRouter)

module.exports = server;
