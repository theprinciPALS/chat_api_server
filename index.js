const Hapi=require('hapi');
const exec = require('child_process').exec;

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8000
});

server.auth.scheme("stupidName", require("./schemes/stupidName"));
server.auth.strategy("default", "stupidName");

async function registerRoutes() {
    await server.register({
      plugin: require("./routes/config.js"),
      options: {
        path: "api/v1/topic"
      }
    });
}

async function registerSentry() {
  // This will get the SHA1 of out latest release
  // We provide this to sentry se we can track errors by release
  await exec('git rev-parse HEAD', async function(err, stdout, stderr) {
    await server.register({
      plugin: require("./helpers/raven/config.js"),
      options: {
        dsn: process.env.SENTRY_DSN,
        id: process.env.SENTRY_ID,
        release: stdout
      }
    });
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
