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
describe("Shop", () => {
  it("it should get store info", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/store")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should get store info in french", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/store/fr")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should get store info in it", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/store/it")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
