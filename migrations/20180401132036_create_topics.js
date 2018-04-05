
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function(t) {
    t.increments('id').unsigned().primary();
    t.timestamp('created_at').notNull();
    t.timestamp('updated_at').nullable();

    t.string('name', 50).notNull().unique();
    t.string('creatorEmail', 100).notNull().unique();
    t.boolean('underReview').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('topics');
};
