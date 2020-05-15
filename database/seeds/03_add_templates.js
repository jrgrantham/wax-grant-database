
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('templates').del()
    .then(function () {
      // Inserts seed entries
      return knex('templates').insert([
        {
          description: "temp description1",
          probability: 1,
          consequence: 1,
          mitigation: "temp mitigation1",
          ai: true,
          dlt: true,
          man: true,
        },
        {
          description: "temp description2",
          probability: 1,
          consequence: 1,
          mitigation: "temp mitigation2",
          ai: true,
          dlt: true,
          man: true,
        },
        {
          description: "temp description3",
          probability: 1,
          consequence: 1,
          mitigation: "temp mitigation3",
          ai: true,
          dlt: true,
          man: true,
        },
      ]);
    });
};
