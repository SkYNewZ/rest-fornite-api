// During the test the env letiable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import { UUID } from "angular2-uuid";
import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");
import { Request, Response } from "express";
import { AppServer } from "../src/index";
chai.use(chaiHttp);

describe("Stats with username", () => {

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

  it("it should return 404 because wrong username", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/pc/wrongusernameatall")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("code")
          .to.equal(404);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Player Not Found");
        done();
      });
  });

  it("it should return 404 because wrond plateform for given username", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/ps4/skynewz")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("code")
          .to.equal(404);
        expect(res.body)
          .to.have.property("message")
          .to.equal(
            "Impossible to fetch User. User not found on this platform"
          );
        done();
      });
  });

  it("it should return 400 because bad plateform", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/aaa/skynewz")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("code")
          .to.equal(400);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Please precise a good platform: ps4/xb1/pc");
        done();
      });
  });

  it("it should get stats", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/pc/skynewz")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });
});

describe("Stats with ID", () => {

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

  it("it should GET stats by the given ID", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/id/pc/8b057df0-e637-44f3-8962-f3c7635674b4")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should return 404 because GOOD id but WRONG plateform", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/id/ps4/8b057df0-e637-44f3-8962-f3c7635674b4")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("code")
          .to.equal(404);
        expect(res.body)
          .to.have.property("message")
          .to.equal(
            "Impossible to fetch User. User not found on this platform"
          );
        done();
      });
  });

  it("it should return 404 because GOOD platform but WROND id", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/id/pc/" + UUID.UUID())
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("code")
          .to.equal(404);
        expect(res.body)
          .to.have.property("message")
          .to.equal(
            "Impossible to fetch User. User not found on this platform"
          );
        done();
      });
  });

  it("it should return 400 because plateform is unknown", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/stats/id/aaa/8b057df0-e637-44f3-8962-f3c7635674b4")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("code")
          .to.equal(400);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Please precise a good platform: ps4/xb1/pc");
        done();
      });
  });
});
