// During the test the env letiable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");
import { Request, Response } from "express";
import { AppServer } from "../src/index";
chai.use(chaiHttp);

// Our parent block
describe("Check", () => {
  let token: string = "";

  before((done) => {
    chai.request(AppServer)
      .post("/api/oauth/token")
      .type("application/x-www-form-urlencoded")
      .send({
        email: process.env.OAUTH_TEST_MAIL,
        password: process.env.OAUTH_TEST_PASSWORD,
      })
      .end((err, res) => {
        token = res.body.access_token;
        done();
      });
  });

  it("it should return fornite ETA", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/check")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("status");
        done();
      });
  });
});
