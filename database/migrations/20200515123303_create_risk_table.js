exports.up = function (knex) {
  return knex.schema.createTable("risks", (risks) => {
    risks.increments();
    risks
      .integer("projectId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    risks.text("description");
    risks.integer("probability");
    risks.integer("consequence");
    risks.integer("risk");
    risks.string("owner");
    risks.text("mitigation");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("risks");
};
