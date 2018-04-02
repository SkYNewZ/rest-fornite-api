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
describe("User", () => {
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

  it("it should GET a user by the given username", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/user/pc/skynewz")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should return 404 because wrong username", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/user/pc/wrongusernameatall")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("it should return 404 because wrond plateform", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/user/ps4/skynewz")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("it should return 400 because wrond plateform", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/user/aaa/skynewz")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("code");
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
