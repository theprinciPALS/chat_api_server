var Raven = require("raven");
exports.plugin = {
  register: async (server, options) => {
    Raven.config('https://' + options.dsn + '@sentry.io/' + options.id, {
      release: options.release
    }).install();
    server.expose("raven", Raven);
  },
  name: "raven",
  version: "0.1.0"
}
