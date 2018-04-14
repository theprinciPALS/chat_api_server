const Topic = require("../../../models/topic");
const sessionValidator = require("../../../helpers/auth/sessionValidator");
const redis = require("redis");

const redisURL = 'redis://' + process.env.REDIS_USER + ':' + process.env.REDIS_PASSWORD + '@' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT

const subscriber = redis.createClient(redisURL);
const publisher = redis.createClient(redisURL);

class TopicSocket {
  /**
   * Creates the object and listens for incoming connections
   * @param {hapi.server} server - a hapi.js server to listen on
   * @param {string} label - what connection to use from the provided server
   * @example
   * // Create a topic socket plugin for hapi
   * exports.register = function(server, options, next) {
   *   ts = new TopicSocket(server, options.label);
   *   next();
   * };

   * exports.register.attributes = {
   *   name: "topics-socket"
   * }
   */
  constructor(server) {
    this.server = server;
    this.io = require("socket.io")(server.listener, {origins: "*:*"});
    subscriber.on("message", (channel, message) => this.onMessageFromRedis(channel, message));
    subscriber.subscribe("messages");
    this.io.on("connection", (socket) => {
      this.authenticateSocket(socket);
    });
  }
  /**
   * Handles an incoming websocket connection. All messages that we expect to
   * receive should be in here. See second example for this.
   * @param {io.socket} socket - a live websocket from io.on(connection)
   * @example
   * io.on("connection", (socket) => {
   *  topicSocket.handleConnection(socket);
   * });
   * @example
   * handleConnection(socket) {
   *   socket.on("something", (data) => this.something(data))
   *   socket.on("another", (data) => this.another(data))
   *   // and so on...
   * }
   */
  handleConnection(socket) {
    socket.on("message", (data) => this.propagateMessage(socket.topicID, data));
  }

  onMessageFromRedis(channel, message) {
    console.log("message from redis is " + message);
    var parsed = JSON.parse(message);
    var id = parsed.id;
    var data = parsed.data;
    this.io.to(id).emit("message", data);
  }

  /*
   * This is how we send a message to redis
   */
  propagateMessage(id, data) {
    var body = {
      id: id,
      data: data
    };
    publisher.publish("messages", JSON.stringify(body));
  }

  authenticateSocket(socket) {
    const session = socket.handshake.query.session;
    const salt = socket.handshake.query.salt;
    const topicID = socket.handshake.query.topicID;
    sessionValidator.validate(session, salt).then((success) => {
      if(success) {
        console.log("authenticated session");
        socket.join(topicID);
        socket.topicID = topicID;
        this.handleConnection(socket);
      } else {
        console.log("unauthenticated session");
        socket.join(session);
        this.propagateMessage(session, "invalid");
      }
    }).catch((err) => {
      server.plugins.raven.raven.captureException(err);
    });
  }
}

module.exports = TopicSocket;
