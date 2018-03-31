module.exports = {
  method: "DELETE",
  path: "/api/v1/topic/{id}",
  handler: require("./controllers/api/v1/topic").delete,
  options: {
    description: "Deletes the topic with the provided ID",
    tags: ["api", "authenticated"],
    validate: {
      params: {
        id: Joi
            .number()
            .integer()
            .required()
            .description("ID of the topic to delete")
      }
    },
    cors: {
      origin: "ignore"
    }
  }
};
