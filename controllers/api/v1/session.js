const Session = require("../../../models/session");
const uuidv4 = require("uuid/v4");

module.exports = {
  create: function(req, h) {
    return new Promise(async function(resolve) {
      try {
        var hash = uuidv4();
        sesh = await new Session({hash: hash})
        sess = await sesh.save();
        resolve(h.response({id: hash}).code(201));
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 500, error: "Internal server error"}).code(500));
      }
    });
  }
}
