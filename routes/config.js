exports.plugin = {
  register: async (server, options) => {
              for(var path in options.paths) {
                const routesToRegister = require("./" + options.paths[path] + ".js");
                for (var route in routesToRegister) {
                  server.route(routesToRegister[route]);
                }
              }
            },
  name: "routes",
  version: "0.1.0"
}
