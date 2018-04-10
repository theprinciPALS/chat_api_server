const Topic = require("../../../models/topic");
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
    const _this = this;
    this.io = require("socket.io")(server.listener);
    this.io.on("connection", (socket) => {
      socket.join(socket.handshake.query.topicID);
      socket.topicID = socket.handshake.query.topicID;
      subscriber.on("message", this.onMessageFromRedis);
      this.handleConnection(socket);
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

  /*
   * This is what we do when we get a message from redis and need to deliver it
   */
  sendMessage(id, data) {
    this.io.to(id).emit(data);
  }

  onMessageFromRedis(channel, message) {
    parsed = JSON.parse(message);
    id = message.id;
    data = message.data;
    this.sendMessage(id, data);
  }

  /*
   * This is how we send a message to redis
   */
  propagateMessage(id, data) {
    body = {
      id: id,
      data: data
    };
    publisher.publish("messages", JSON.stringify(body));
  }
}

module.exports = TopicSocket;
