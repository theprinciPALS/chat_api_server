var bookshelf = require("../config/bookshelf").bookshelf;
const bcrypt = require("bcryptjs");

module.exports = bookshelf.Model.extend({
  tableName: "sessions",
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashSession, this);
  },
  hashSession: function(model, attrs, options) {
    return new Promise(function(resolve, reject) {
      bcrypt.hash(model.attributes.hash, 10, function(err, hash) {
        if( err ) reject(err);
        model.set('hash', hash);
        resolve(hash); // data is created only after this occurs
      });
    });
  }
});
