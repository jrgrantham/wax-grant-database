exports.seed = function (knex) {
  // Deletes ALL existing entries
  // return knex("templates")
  //   .del()
  //   .then(function () {
  // Inserts seed entries
  return knex("templates").insert([
    {
      type: "managerial",
      description: "managerial description1",
      probability: 1,
      consequence: 1,
      risk: 1,
      mitigation: "managerial mitigation1",
      ai: true,
      dlt: true,
      man: true,
      all: false,
    },
    {
      type: "commercial",
      description: "commercial description2",
      probability: 1,
      consequence: 1,
      risk: 1,
      mitigation: "commercial mitigation2",
      ai: false,
      dlt: true,
      man: true,
      all: false,
    },
    {
      type: "commercial",
      description: "commercial description3",
      probability: 1,
      consequence: 1,
      risk: 1,
      mitigation: "commercial mitigation3",
      ai: true,
      dlt: true,
      man: true,
      all: false,
    },
    {
      type: "technical",
      description: "technical description4",
      probability: 1,
      consequence: 1,
      risk: 1,
      mitigation: "technical mitigation4",
      ai: true,
      dlt: true,
      man: true,
      all: false,
    },
    {
      type: "environmental",
      description: "environmental description5",
      probability: 1,
      consequence: 1,
      risk: 1,
      mitigation: "environmental mitigation5",
      ai: true,
      dlt: true,
      man: true,
      all: false,
    },
    {
      type: "legal",
      description: "legal description6",
      probability: 1,
      consequence: 1,
      risk: 1,
      mitigation: "legal mitigation6",
      ai: true,
      dlt: true,
      man: true,
      all: false,
    },
  ]);
  // });
};
