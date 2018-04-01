const Joi = require("joi");

module.exports = {
  param: Joi.string().required().description("Parameter to search"),
  val: Joi.string().required().description("Value to search")
}
