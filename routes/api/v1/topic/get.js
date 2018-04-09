module.exports = {
  method: "GET",
  path: "/api/v1/topic/{id}",
  handler: require("../../../../controllers/api/v1/topic").show,
  options: {
    description: "Returns the topic that has the provided ID",
    notes: "To filter or find multiple topics, use the /find endpoint",
    tags: ["api", "authenticated"],
    validate: {
      params: require("../../../../schemas/api/v1/topics/show")
    },
    cors: {
      origin: "ignore"
    },
    auth: "default"
  }
};
