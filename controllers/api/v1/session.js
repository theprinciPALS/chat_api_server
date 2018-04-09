const Session = require("../../../models/session");
const uuidv4 = require("uuid/v4");
const auth0 = require("../../../helpers/auth/auth0");
const bcrypt = require("bcryptjs");

module.exports = {
  create: function(req, h) {
    return new Promise(async function(resolve) {
      try {
        auth0.authenticate(req.payload.username, req.payload.password, async function(success) {
          if(!success) {
            resolve(h.response({statusCode: 401, error: "Incorrect username or password"}).code(401));
          } else {
            // we make the salt here and provide it to the client
            // because the hash is (and should be) random for each request
            // we must send it to them so we can use it when authenticating - Safa
            var hash = uuidv4();
            var salt = bcrypt.genSaltSync(10);
            var saltedHash = bcrypt.hashSync(hash, salt);
            sesh = await new Session({hash: saltedHash})
            sess = await sesh.save();
            console.log("sesh is " + JSON.stringify(sess));
            resolve(h.response({id: hash, salt: salt}).code(201));
          }
        });
      } catch (err) {
        req.server.plugins.raven.raven.captureException(err);
        resolve(h.response({statusCode: 500, error: "Internal server error"}).code(500));
      }
    });
  }
}
