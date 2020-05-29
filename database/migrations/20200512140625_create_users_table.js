exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments();
    users.string("email").notNullable().unique();
    users.string("password").notNullable();
    users.string("selected"); //currently visible

    // Project options
    users.boolean("admin");
    users.string("company");
    users.string("nature");
    users.string("type");
    users.string("project");
    users.string("application");

    // Admin settings
    users.boolean("ai");
    users.boolean("dlt");
    users.boolean("man");
    users.boolean("useTemplates");
    users.boolean("exportSpreadsheet");
    users.decimal("fontSize");
    users.string("flavour");
    users.string("appendixRef");
    users.string("maxCharacters");

    // Managerial Risk Options
    users.boolean("manDisplay");
    users.boolean("manDisplayChangeable");
    users.string("manDefaultOwner");
    users.string("manColor");
    users.integer("manMaxRisks");

    // Technical Risk Options
    users.boolean("tecDisplay");
    users.boolean("tecDisplayChangeable");
    users.string("tecDefaultOwner");
    users.string("tecColor");
    users.integer("tecMaxRisks");

    // Commercial Risk Options
    users.boolean("comDisplay");
    users.boolean("comDisplayChangeable");
    users.string("comDefaultOwner");
    users.string("comColor");
    users.integer("comMaxRisks");

    // Legal Risk Options
    users.boolean("legDisplay");
    users.boolean("legDisplayChangeable");
    users.string("legDefaultOwner");
    users.string("legColor");
    users.integer("legMaxRisks");

    // Environmental Risk Options
    users.boolean("envDisplay");
    users.boolean("envDisplayChangeable");
    users.string("envDefaultOwner");
    users.string("envColor");
    users.integer("envMaxRisks");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
