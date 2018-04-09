
exports.up = function(knex, Promise) {
  return knex.schema.table("sessions", function(t) {
    t.timestamp("updated_at").nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("sessions", function(t) {
    t.dropColumn("updated_at");
  })
};
