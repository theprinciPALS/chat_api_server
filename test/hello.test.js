// Unfortunately, we have to go several directories up :(
const knex = require("../config/bookshelf").knex;
// create the tables before we load the server
knex.migrate.latest().then(() => {

});
const server = require("../");
const Lab = require("lab");
const lab = exports.lab = Lab.script();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

lab.experiment("GET /hello", () => {
  lab.beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  lab.afterEach(() => {
    sandbox.restore();
  })

  lab.test("returns a 200 OK", async () => {
    res = await server.inject({
      url: "/hello",
      method: "GET"
    });
    expect(res.result).to.equal("hello world");
  });
});
