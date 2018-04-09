var bookshelf = require("../config/bookshelf").bookshelf;
const bcrypt = require("bcryptjs");

module.exports = bookshelf.Model.extend({
  tableName: "sessions",
  hasTimestamps: true
});
