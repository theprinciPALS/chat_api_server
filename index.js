const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

async function registerRoutes() {
    await server.register({
      plugin: require("./routes/config.js"),
      options: {
        path: "api/v1/topic"
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
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
    console.log(server.table());
};

start();
