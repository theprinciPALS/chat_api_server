module.exports = {
  method: "PUT",
  path: "/api/v1/topic/{id}",
  handler: require("./controllers/api/v1/topic").update,
  options: {
    description: "Updates a topic with the provided parameters",
    tags: ["api", "authenticated"],
    validate: {
      params: {
        id: Joi
            .number()
            .integer()
            .required()
            .description("ID of the topic to update")
      },
      payload: require("./schemas/api/v1/topics/update")
    },
    cors: {
      origin: "ignore"
    }
  }
};
