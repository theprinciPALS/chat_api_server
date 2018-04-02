module.exports = {
  method: "PUT",
  path: "/api/v1/topic/{id}",
  handler: require("../../../../controllers/api/v1/topic").update,
  options: {
    description: "Updates a topic with the provided parameters",
    tags: ["api", "authenticated"],
    validate: {
      params: require("../../../../schemas/api/v1/topics/show"),
      payload: require("../../../../schemas/api/v1/topics/update")
    },
    cors: {
      origin: "ignore"
    },
    auth: "default"
  }
};
