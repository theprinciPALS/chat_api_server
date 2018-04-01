exports.plugin = {
  register: async (server, options) => {
              const routesToRegister = require("./" + options.path + ".js");
              for (var route in routesToRegister) {
                server.route(routesToRegister[route]);
              }
            },
  name: "routes",
  version: "0.1.0"
}
