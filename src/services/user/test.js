// Modules
const Chai = require("chai");
const ChaiHttp = require("chai-http");

// Server
const server = require("../../www.test");

Chai.use(ChaiHttp);
const userService = Chai.request(server);
const { expect } = Chai;

describe("User", function() {
  let id = 0;
  it("[GET] Search user", () =>
    userService.get("/users").then(res => {
      expect(res).to.have.status(200);
      const { data, total } = res.body;
      // Data return must match
      expect(data).to.be.an("array");
      expect(total).to.be.an("number");

      // Data may be empty
      if (data[0]) {
        expect(data[0]).to.be.an("object");
        expect(data[0].id).to.be.an("number");
        id = data[0].id;
      }
    }));
  it("[GET] Get user by id", () =>
    userService.get(`/users/${id}`).then(res => {
      expect(res).to.have.status(200);
      const { data } = res.body;
      // Data return must match
      expect(data).to.be.an("object");
      expect(data.id).to.be.equal(id);
    }));
});
