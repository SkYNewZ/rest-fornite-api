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
describe("News", () => {
  let token: string = "";

  before(done => {
    chai
      .request(AppServer)
      .post("/api/oauth/token")
      .type("application/x-www-form-urlencoded")
      .send({
        email: process.env.OAUTH_TEST_MAIL,
        password: process.env.OAUTH_TEST_PASSWORD
      })
      .end((err, res) => {
        token = res.body.access_token;
        done();
      });
  });

  it("it should return news", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/news")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should return news in french", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/news/fr")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("it should return news in it", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/news/it")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
