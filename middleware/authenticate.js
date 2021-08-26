const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const { isAdmin, projectId } = decoded;
    const selectedProject = req.body.projectId;
    req.user = decoded;
    req.isAdmin = isAdmin;
    req.projectId = isAdmin ? selectedProject : projectId;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
