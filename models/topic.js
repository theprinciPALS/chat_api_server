var bookshelf = require("../config/bookshelf").bookshelf;
const Joi = require("joi");

module.exports = bookshelf.Model.extend({
  tableName: "topics"
});
