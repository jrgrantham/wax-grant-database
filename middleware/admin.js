module.exports = function (req, res, next) {
  console.log('admin middleware - ', req);
  if (!req.admin) return res.status(403).send({message: "Access denied."});
  next();
};
