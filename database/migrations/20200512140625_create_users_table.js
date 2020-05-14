
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('email')
      .notNullable()
      .unique();
    users.boolean('admin');
    users.string('company');
    users.string('nature');
    users.string('type');
    users.string('project');
    users.string('application');
    
    users.boolean('ai');
    users.boolean('dlt');
    users.boolean('man');
    users.boolean('useTemplates');
    users.boolean('exportSpreadsheet');
    users.string('flavour');
    users.string('appendixRef');
    users.string('maxCharacters');

    users.string('password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
