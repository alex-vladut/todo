exports.up = function (knex) {
  return knex.schema.createTable('todos', function (table) {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.uuid('userId').notNullable();
    table.boolean('isCompleted').defaultTo(false).notNullable();
    table.foreign('userId').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos');
};
