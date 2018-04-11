const TopicSocket = require("./api/v1/topic");

exports.plugin = {
  register: (server, options) => {
              ts = new TopicSocket(server);
              server.expose("TopicSocket", ts);
            },
  name: "sockets",
  version: "0.1.0"
}
