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
    const { admin, userId, projectId, rememberMe, name } = decoded;
    // console.log('authenticate', userId);
    req.userId = userId;
    req.admin = admin;
    req.projectId = projectId;
    req.rememberMe = rememberMe;
    req.name = name;
    next();
  } catch (ex) {
    res.status(401).send({ message: "Invalid token" });
  }
};
