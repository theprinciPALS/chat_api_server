const Topic = require("../../../models/topic");

module.exports = {
  /**
   * Returns an array of all topics in the database
   */
  index: function(req, h) {
    return new Promise(async function(resolve){
      try {
        topics = await Topic.fetchAll();
        resolve(h.response(JSON.parse(JSON.stringify(topics))).code(200));
      } catch (err) {
        resolve(h.response({error: err}).code(500));
      }
    });
  }
}
