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
describe("Default", () => {
  it("it should 404", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/404")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("it should 200", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
