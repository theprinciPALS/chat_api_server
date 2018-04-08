const Topic = require("../../../models/topic");

module.exports = {
  /**
   * Returns an array of all topics in the database
   */
  index: function(req, h) {
    return new Promise(async function(resolve){
      try {
        topics = await Topic.fetchAll();
        resolve(h.response({
          topics: topics
        }).code(200));
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({error: err}).code(500));
      }
    });
  },

  /**
   * Returns the topic with the provided ID
   */
  show: function(req, h) {
    return new Promise(async function(resolve){
      try {
        topic = await new Topic({id: req.params.id}).fetch();
        console.log("topic is " + topic);
        resolve(h.response(JSON.parse(JSON.stringify(topic))).code(302));
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 404, error: "Not Found", message: "Topic not found"}).code(404));
      }
    });
  },

  /**
   * Creates a topic with the provided parameters
   */
  create: function(req, h) {
    return new Promise(async function(resolve) {
      try {
        dev = new Topic(req.payload);
        newTopic = await dev.save();
        resolve(h.response(JSON.parse(JSON.stringify(newTopic))).code(201));
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 500, error: "Internal server error"}).code(500));
      }
    });
  },
  /*
   * Updates the topic with the provided ID with the provided parameters
  */
  update: function(req, h) {
    return new Promise(async function(resolve) {
      try {
        dev = await new Topic({id: req.params.id}).save(req.payload);
        resolve(h.response(JSON.parse(JSON.stringify(dev))).code(200))
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 500, error: "Internal server error"}).code(500));
      }
    });
  },

  /**
   * Deletes the topic with the provided ID
   */
  delete: function(req, h) {
    return new Promise(async function(resolve) {
      try {
        dev = await new Topic({id: req.params.id}).destroy();
        resolve(h.response(JSON.parse(JSON.stringify(dev))).code(204));
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 404, error: "Not Found", message: "Topic not found"}).code(404));
      }
    });
  },

  /**
   * Searches for topics that meet the requirements in the URL (see index.js)
   */
  find: function(req, h) {
    return new Promise(async (resolve) => {
      try {
        param = req.params.param;
        value = req.params.val;
        console.log("the val is " + value);
        result = await Topic.query({
                  where: {
                    [param]: value
                  }
                }).fetch();
        if(result !== null) {
          resolve(h.response({
            topics: result
          }).code(200));
        } else {
          resolve(h.response({"statusCode":404,"error":"Not Found","message":"Topic not found"}).code(404));
        }
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 500, error: "Internal server error121"}).code(500));
      }
    });
  }

}
