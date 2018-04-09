module.exports = {
  authenticate: async function(email, password, callback) {
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://theprincipals.eu.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: {
         grant_type: 'password',
         username: email,
         password: password,
         audience: 'https://thepeaceful.site',
         scope: 'email',
         client_id: process.env.AUTH0_CLIENT_ID,
         client_secret: process.env.AUTH0_CLIENT_SECRET },
         json: true
      };

    await request(options, function (error, response, body) {
      if(body.error) {
        callback(false);
      } else {
        callback(true);
      }
    });
  }
}
