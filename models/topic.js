var bookshelf = require("../config/bookshelf").bookshelf;
const Joi = require("joi");

module.exports = bookshelf.Model.extend({
  tableName: "topics",

  schema: {
    create: Joi.object().keys(require("../schemas/api/v1/topics/create")),
    update: Joi.object().keys(require("../schemas/api/v1/topics/update"))
  }
});
