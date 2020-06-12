
exports.up = function(knex) {
  return knex.schema.createTable('templates', templates => {
    templates.increments();
    templates.string('type');
    templates.text('description');
    templates.integer('probability');
    templates.integer('consequence');
    templates.integer('risk');
    templates.text('mitigation');
    templates.boolean('ai');
    templates.boolean('dlt');
    templates.boolean('man');
    templates.boolean('all');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('templates')
};
