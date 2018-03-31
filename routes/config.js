exports.plugin = {
  register: (server, options) => {
              for (var route in require("./" + options.path) {
                server.register(route);
              }
            },
  name: "api-v1-topic-routes",
  version: "0.1.0"
}
