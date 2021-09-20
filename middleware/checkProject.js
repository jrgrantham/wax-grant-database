const { Setup } = require("../endpoints/projects/model");

module.exports = async function (req, res, next) {
  try {
    const email = req.user.email;
    const admin = req.admin;
    const projectId = req.headers.selectedprojectid;
    const { lead, pOne, pTwo } = await Setup.findById(projectId);
    if (email == lead || email == pOne || email == pTwo || admin) next();
    res.status(403).send("Access denied");
  } catch (ex) {
    res.status(404).send("Failed to find specified project");
  }
};
