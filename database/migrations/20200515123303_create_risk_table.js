exports.up = function (knex) {
  return knex.schema.createTable("risks", (risks) => {
    risks.increments();
    risks
      .integer("projectId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    risks.string("type");
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
