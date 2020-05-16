exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("risks")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("risks").insert([
        {
          projectId: 1,
          type: 'managerial',
          description: "description1",
          probability: 1,
          consequence: 1,
          owner: "JG",
          mitigation: "mitigation1",
        },
        {
          projectId: 1,
          type: 'commercial',
          description: "description2",
          probability: 1,
          consequence: 1,
          owner: "JG",
          mitigation: "mitigation2",
        },
        {
          projectId: 1,
          type: 'commercial',
          description: "description3",
          probability: 1,
          consequence: 1,
          owner: "JG",
          mitigation: "mitigation3",
        },
        {
          projectId: 1,
          type: 'commercial',
          description: "description4",
          probability: 1,
          consequence: 1,
          owner: "JG",
          mitigation: "mitigation4",
        },
        {
          projectId: 1,
          type: 'commercial',
          description: "description5",
          probability: 1,
          consequence: 1,
          owner: "JG",
          mitigation: "mitigation5",
        },
      ]);
    });
};
