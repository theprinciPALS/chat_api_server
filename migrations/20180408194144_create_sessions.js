
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(t) {
    t.increments('id');
    t.timestamp('created_at').notNull();
    // bcrypt hashes are 60 chars long!
    t.string('hash',60);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
