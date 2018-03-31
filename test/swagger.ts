// During the test the env letiable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");
import { Request, Response } from "express";
import { AppConfig } from "../src/config/config";
import { AppServer } from "../src/index";
chai.use(chaiHttp);

// Our parent block
describe("Swagger", () => {
  it("it should 200", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get(AppConfig.static_uri + "/swagger.json")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("it should 200", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get(AppConfig.static_uri + "/swagger.yaml")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("it should 200", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api-docs")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
