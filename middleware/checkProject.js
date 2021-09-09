const { Setup } = require("../endpoints/allProjects/model");

module.exports = async function (req, res, next) {
  try {
    const email = req.user.email;
    const isAdmin = req.isAdmin;
    const projectId = req.projectId;
    const { lead, pOne, pTwo } = await Setup.findById(projectId);
    if (email == lead || email == pOne || email == pTwo || isAdmin) next();
    res.status(403).send("Access denied");
  } catch (ex) {
    res.status(404).send("Failed to find specified project");
  }
};
