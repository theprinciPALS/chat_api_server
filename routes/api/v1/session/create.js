module.exports = {
  method: "POST",
  path: "/api/v1/session",
  handler: require("../../../../controllers/api/v1/session").create,
  options: {
    description: "Creates a new session",
    tags: ["api"],
    cors: {
      origin: "ignore"
    }
  }
};
