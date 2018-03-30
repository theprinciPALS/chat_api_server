/**
 * Database connection information
 */

// Get the database info from the knexfile, and make sure we are using the
// right enviornment (defualts to development)
var knex = require("knex")(require("../knexfile.js")[process.env.NODE_ENV || "development"]);

var bookshelf = require("bookshelf")(knex);

// Use Joi to validate models
bookshelf.plugin(require("bookshelf-joi-validator"));

exports.bookshelf = bookshelf;
exports.knex = knex;
