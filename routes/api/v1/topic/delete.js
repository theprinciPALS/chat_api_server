module.exports = {
  method: "DELETE",
  path: "/api/v1/topic/{id}",
  handler: require("../../../../controllers/api/v1/topic").delete,
  options: {
    description: "Deletes the topic with the provided ID",
    tags: ["api", "authenticated"],
    validate: {
      params: require("../../../../schemas/api/v1/topics/show")
    },
    cors: {
      origin: "ignore"
    }
  }
};
