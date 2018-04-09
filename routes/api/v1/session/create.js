const Joi = require("joi");

module.exports = {
  method: "POST",
  path: "/api/v1/session",
  handler: require("../../../../controllers/api/v1/session").create,
  options: {
    description: "Creates a new session",
    tags: ["api"],
    validate: {
      payload: {
        username: Joi.string(),
        password: Joi.string()
      }
    },
    cors: {
      origin: "ignore"
    }
  }
};
