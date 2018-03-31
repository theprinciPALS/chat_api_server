const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler: function(request,h) {
        return 'hello world';
    }
});

server.route({
  method: "GET",
  path: "/api/v1/topic",
  handler: require("./controllers/api/v1/topic").index,
  options: {
    description: "Returns a JSON object containing all topics in the database",
    tags: ["api"],
    cors: {
      origin: "ignore"
    }
  }
});

server.route({
  method: "GET",
  path: "/api/v1/topic/{id}",
  handler: require("./controllers/api/v1/topic").show,
  options: {
    description: "Returns the topic that has the provided ID",
    notes: "To filter or find multiple topics, use the /find endpoint",
    tags: ["api", "authenticated"],
    validate: {
      params: require("./schemas/api/v1/topics/show")
    },
    cors: {
      origin: "ignore"
    }
  }
});

server.route({
  method: "POST",
  path: "/api/v1/topic",
  handler: require("./controllers/api/v1/topic").create,
  options: {
    description: "Creates a new topic",
    tags: ["api", "authenticated"],
    validate: {
      payload: require("./schemas/api/v1/topics/create")
    },
    cors: {
      origin: "ignore"
    }
  }
});

server.route({
  method: "PUT",
  path: "/api/v1/topic/{id}",
  handler: require("./controllers/api/v1/topic").update,
  options: {
    description: "Updates a topic with the provided parameters",
    tags: ["api", "authenticated"],
    validate: {
      params: {
        id: Joi
            .number()
            .integer()
            .required()
            .description("ID of the topic to update")
      },
      payload: require("./schemas/api/v1/topics/update")
    },
    cors: {
      origin: "ignore"
    }
  }
});

server.route({
  method: "DELETE",
  path: "/api/v1/topic/{id}",
  handler: require("./controllers/api/v1/topic").delete,
  options: {
    description: "Deletes the topic with the provided ID",
    tags: ["api", "authenticated"],
    validate: {
      params: {
        id: Joi
            .number()
            .integer()
            .required()
            .description("ID of the topic to delete")
      }
    },
    cors: {
      origin: "ignore"
    }
  }
});

server.route({
  method: "GET",
  path: "/api/v1/topic/find/{param}/{val}",
  handler: require("./controllers/api/v1/topic").find,
  options: {
    description: "Finds the topic(s) with the that have the provided value for the provided parameter",
    tags: ["api"],
    validate: {
      params: {
        param: Joi.string().required().description("Parameter to search"),
        val: Joi.string().required().description("Value to search")
      }
    },
    cors: {
      origin: "ignore"
    }
  }
});

// Start the server
async function start() {

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
