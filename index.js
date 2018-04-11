const Hapi=require('hapi');
const git = require('git-rev-sync');

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8000
});

server.auth.scheme("stupidName", require("./schemes/stupidName"));
server.auth.scheme("session", require("./schemes/session"));
server.auth.strategy("default", "session");

async function registerRoutes() {
    await server.register({
      plugin: require("./routes/config.js"),
      options: {
        paths: ["api/v1/topic", "api/v1/session"]
      }
    });
}

async function registerSentry() {
  // This will get the SHA1 of out latest release
  // We provide this to sentry se we can track errors by release
  await server.register({
    plugin: require("./helpers/raven/config.js"),
    options: {
      dsn: process.env.SENTRY_DSN,
      id: process.env.SENTRY_ID,
      release: git.long()
    }
  });
}

async function registerSockets() {
  await server.register({
    plugin: require("./sockets/config.js"),
    options: {

    }
  });
}

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler: function(request,h) {
        return 'hello world';
    }
});

// Start the server
async function start() {


  await(registerRoutes());
  await(registerSentry());
  await(registerSockets());
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();

module.exports = server;
