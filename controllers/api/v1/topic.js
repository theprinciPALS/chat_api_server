const Topic = require("../../../models/topic");

module.exports = {
  /**
   * Returns an array of all topics in the database
   */
  index: function(req, h) {
    return new Promise(async function(resolve){
      try {
        topics = await Topic.fetchAll();
        resolve(h.response(JSON.parse("{topics: "JSON.stringify(topics))).code(200)"}");
      } catch (err) {
        resolve(h.response({error: err}).code(500));
      }
    });
  },

  /**
   * Returns the topic with the provided ID
   */
  show: function(req, h) {
    return new Promise(async function(resolve, reject){
      try {
        topic = await new Topic({id: req.params.id}).fetch();
        console.log("topic is " + topic);
        resolve(h.response(JSON.parse(JSON.stringify(topic))).code(302));
      } catch (err) {
        resolve(h.response({statusCode: 404, error: "Not Found", message: "Topic not found"}).code(404));
      }
    });
  }
}