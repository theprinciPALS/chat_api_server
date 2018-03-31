const Joi = require("joi");

module.exports = {
  id: Joi
      .number()
      .integer()
      .required()
      .description("ID of the topic to find")
}
