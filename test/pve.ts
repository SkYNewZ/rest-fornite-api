// During the test the env letiable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");
import { Request, Response } from "express";
import { beforeEach } from "mocha";
import { AppServer } from "../src/index";
chai.use(chaiHttp);

// Our parent block
describe("PVE", () => {
  // ignore beacause of https://github.com/qlaffont/fortnite-api/issues/48
  beforeEach(function() {
    this.skip();
  });

  it("it should return 404 because wrong username", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/pve/user/wrongusernameatall")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("it should return pve info for given username", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/pve/user/skynewz")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });
});

describe("PVE INFO", () => {
  it("it should return fornite pve info in french", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/pve/info/fr")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should return fornite pve info in it", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/pve/info/it")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should return fornite pve info", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/pve/info")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
