module.exports = {
  method: "GET",
  path: "/topic/{param}/{val}",
  handler: require("../../../../controllers/api/v1/topic").find,
  options: {
    description: "Finds the topic(s) with the that have the provided value for the provided parameter",
    tags: ["api"],
    validate: {
      params: require("../../../../schemas/api/v1/topics/find")
    },
    cors: {
      origin: "ignore"
    }
  }
};
