const { Setup } = require("../endpoints/setup");
const { User } = require("../endpoints/users/model");

module.exports = {
  checkProject: async function (provided) {
    const { providedProjectId, admin, userId } = provided;
    // console.log("checking project");
    try {
      const project = await Setup.findOne({ projectId: providedProjectId });
      const projectId = project.projectId;
      console.log("project found, returning projectId");
      return projectId;
    } catch (ex) {
      console.log("project not found");
      if (admin) {
        console.log("user is admin");
        try {
          const project = await Setup.findOne({});
          const projectId = project.projectId;
          console.log("setting alternate project: " + projectId);
          const filter = userId;
          const update = {projectId};
          const user = await User.findOneAndUpdate(filter, update, {
            new: true,
          });
          console.log(user.projectId);
          return user.projectId
        } catch {
          console.log("failed to update project");
        }
      }
      return false;
    }
  },
  bar: function () {
    // whatever
  },
};

// module.exports = async function (provided) {
//   const { providedProjectId, admin, userId } = provided;
//   console.log("checking project");
//   try {
//     const project = await Setup.findOne({ projectId: providedProjectId });
//     const projectId = project.projectId;
//     console.log("project found, returning projectId");
//     return projectId;
//   } catch (ex) {
//     console.log("project not found");
//     if (admin) {
//       console.log("admin - updating selected project");
//       try {
//         const project = await Setup.findOne({});
//         const projectId = project.projectId;
//         const filter = userId;
//         const update = projectId;
//         await User.findOneAndUpdate(filter, update);
//       } catch {
//         console.log("failed to update project");
//       }
//     }
//     return null;
//   }
// };
