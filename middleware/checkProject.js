const { Setup } = require("./model");

module.exports = async (req, res, next) => {

    const projectId = req.projectId;
    const project = await Setup.findById(projectId);
    res.send(project);

  // try {
  //   const projectId = req.projectId;
  // // const project = await Setup.findById(projectId);
  //   const email = req.user.email
  //   console.log(req.projectId);
  //   // req.isAdmin
  //   // req.projectId
  //   next();
  // } catch (ex) {
  //   res.status(400).send("Invalid token.");
  // }
};
