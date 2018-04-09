const Session = require("../models/session");
const bcrypt = require("bcryptjs");

module.exports = (server, options) => {
  return {
    authenticate: (request, h) => {
        const hash = bcrypt.hashSync(request.raw.req.headers.session, request.raw.req.headers.salt);
        return new Promise(async function(resolve){
          try {
            sesh = await new Session({hash: hash}).fetch();
            console.log("sesh is " + JSON.stringify(sesh));
            resolve(h.authenticated({credentials: {session: hash}}));
          } catch (err) {
            req.server.plugins.raven.raven.captureException(err);
            resolve(h.unauthenticated());
          }
        });
    }
  }
}
