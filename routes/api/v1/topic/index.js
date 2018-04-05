module.exports = {
  method: "GET",
  path: "/api/v1/topic",
  handler: require("../../../../controllers/api/v1/topic").index,
  options: {
    description: "Returns a JSON object containing all topics in the database",
    tags: ["api"],
    cors: {
      origin: "ignore"
    },
    auth: "default"
  }
};
