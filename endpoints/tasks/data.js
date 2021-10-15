let taskSetupData = [
  {
    projectId: "abc",
    taskId: "task1",
    workPackageTitle: "Title...",
    workPackageId: "pack1",
    description: "Description... on the server",
    days: 1,
    startDep: null,
    endDep: null,
    dayLoading: "front",
    schedule: [
      { barNumber: 1, value: 1 },
      { barNumber: 0, value: 0 },
      { barNumber: 0, value: 0 },
    ],
  },
];

module.exports = taskSetupData;
