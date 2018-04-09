const Session = require("../../../models/session");
const uuidv4 = require("uuid/v4");
const auth0 = require("../../../helpers/auth/auth0");

module.exports = {
  create: function(req, h) {
    return new Promise(async function(resolve) {
      try {
        auth0.authenticate(req.payload.username, req.payload.password, async function(success) {
          if(!success) {
            resolve(h.response({statusCode: 401, error: "Incorrect username or password"}).code(401));
          } else {
            var hash = uuidv4();
            sesh = await new Session({hash: hash})
            sess = await sesh.save();
            resolve(h.response({id: hash}).code(201));
          }
        });
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 500, error: "Internal server error"}).code(500));
      }
    });
  }
}
