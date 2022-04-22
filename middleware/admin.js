module.exports = function (req, res, next) {
  if (!req.admin) return res.status(403).send({ message: "Access denied." });
  next();
};
