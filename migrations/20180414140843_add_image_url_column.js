
exports.up = function(knex, Promise) {
  return knex.schema.table("topics", function(t) {
    t.dropColumn("creatorEmail");
    t.string('image').notNull().default("https://www.pennington.com/all-products/grass-seed/resources/all-you-need-to-know-about-zoysia-grass");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("topics", function(t) {
    t.dropColumn("image");
    t.string('creatorEmail', 100).notNull().unique();
  });
};
