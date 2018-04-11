const bcrypt = require("bcryptjs");
const Session = require("../../models/session");

module.exports = {
  async validate(session, salt) {
    return new Promise(async function(resolve) {
      const hash = bcrypt.hashSync(session, salt);
      try {
        sesh = await new Session({hash: hash}).fetch();
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }
}
