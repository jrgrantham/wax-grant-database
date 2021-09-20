const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    // console.log(decoded);
    const { admin, userId, projectId } = decoded;
    console.log(admin);
    const selectedProject = req.body.projectId;
    req.userId = userId;
    req.admin = admin;
    req.projectId = admin ? selectedProject : projectId;
    next();
  } catch (ex) {
    res.status(401).send({ message: "Invalid token" });
  }
};
