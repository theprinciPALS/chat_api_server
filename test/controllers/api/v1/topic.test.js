// Unfortunately, we have to go several directories up :(
const knex = require("../../../../config/bookshelf").knex;
// create the tables before we load the server
knex.migrate.latest().then(() => {

});
const server = require("../../../../");
const Lab = require("lab");
const lab = exports.lab = Lab.script();
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
require("sinon-as-promised");
const Topic = require("../../../../models/topic");

lab.experiment("GET /topic", () => {
  lab.beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  lab.afterEach(() => {
    sandbox.restore();
  })

  lab.test("returns a 200 OK", async () => {
    res = await server.inject({
      url: "/topic",
      method: "GET"
    });
    expect(res.statusCode).to.equal(200);
  });

  lab.test("returns an array of topics", async () => {
    sandbox.stub(Topic.prototype, "fetchAll").resolves([new Topic({
      id: 0,
      name: "Ryan Is Awesome",
      creatorEmail: "abc@example.com",
      underReview: true
    }), new Topic({
      id: 1,
      name: "Joe Is Awesome",
      creatorEmail: "joe@example.com",
      underReview: false
    })]);
    res = await server.inject({
      url: "/topic",
      method: "GET"
    });
    expect(res.result).to.deep.equal({
      topics: [
        {
          "id": 0,
          "name": "Ryan is Awesome",
          "creatorEmail": "abc@example.com",
          "underReview": true
        },
        {
          "id": 1,
          "name": "Joe is Awesome",
          "creatorEmail": "joe@example.com",
          underReview: false
        }
      ]
    });
  });
});

lab.experiment("GET /topic/:id", async () => {
  lab.beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  lab.afterEach(() => {
    sandbox.restore();
  });

  lab.test("returns 302 found if the record exists", async () => {
    sandbox.stub(Topic.prototype, "fetch").resolves(new Topic({
      id: 0,
      name: "Ryan Is Awesome",
      creatorEmail: "abc@example.com",
      underReview: true
    });
    res = await server.inject({
      url: "/topic/1",
      method: "GET"
    });
    expect(res.statusCode).to.equal(302);
  });

  lab.test("returns the correct topic if found", async () => {
    sandbox.stub(Topic.prototype, "fetch").resolves(new Topic({
      id: 0,
      name: "Ryan Is Awesome",
      creatorEmail: "abc@example.com",
      underReview: true
    });
    res = await server.inject({
      url: "/topic/0",
      method: "GET"
    });
    console.log(JSON.stringify("result is " + res.result));
    expect(res.result).to.deep.equal({
      id: 0,
      name: "Ryan Is Awesome",
      creatorEmail: "abc@example.com",
      underReview: true
    });
  });

  lab.test("returns 404 not found if the deivce does not exist", async () => {
    sandbox.stub(Topic.prototype, "fetch").rejects(new Error("Not found"));
    res = await server.inject({
      url: "/topic/100",
      method: "GET"
    });
    expect(res.statusCode).to.equal(404);
  });

  lab.test("returns an error if the topic does not exist", async () => {
    sandbox.stub(Topic.prototype, "fetch").rejects(new Error("Not found"));
    res = await server.inject({
      url: "/topic/100",
      method: "GET"
    });
    // The only important line is the message, but we check everything
    expect(res.result).to.deep.equal({
      error: "Not Found",
      message: "Topic not found",
      statusCode: 404
    });
  });
});
