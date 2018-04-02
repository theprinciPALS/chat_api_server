module.exports = {
  method: "POST",
  path: "/api/v1/topic",
  handler: require("../../../../controllers/api/v1/topic").create,
  options: {
    description: "Creates a new topic",
    tags: ["api", "authenticated"],
    validate: {
      payload: require("../../../../schemas/api/v1/topics/create")
    },
    cors: {
      origin: "ignore"
    },
    auth: "default"
  }
};
