process.env.NODE_ENV = "test";

import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");
import { Request, Response } from "express";
import { AppServer } from "../src/index";
chai.use(chaiHttp);

describe("Oauth", () => {
  let token: string = "";

  it("it should return 404 because user not found in database", (done: MochaDone) => {
    chai
      .request(AppServer)
      .post("/api/oauth/token")
      .type("application/x-www-form-urlencoded")
      .send({
        email: "foo",
        password: "bar"
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("message")
          .to.equal("Authentication failed. User not found");
        done();
      });
  });

  it("it should return 404 because wrong password", (done: MochaDone) => {
    chai
      .request(AppServer)
      .post("/api/oauth/token")
      .type("application/x-www-form-urlencoded")
      .send({
        email: process.env.OAUTH_TEST_MAIL,
        password: process.env.OAUTH_TEST_PASSWORD + "bar"
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a("object");
        expect(res.body)
          .to.have.property("message")
          .to.equal("Authentication failed.");
        done();
      });
  });

  it("it should return 200 and a wonderful token", (done: MochaDone) => {
    chai
      .request(AppServer)
      .post("/api/oauth/token")
      .type("application/x-www-form-urlencoded")
      .send({
        email: process.env.OAUTH_TEST_MAIL,
        password: process.env.OAUTH_TEST_PASSWORD
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("access_token");
        expect(res.body).to.have.property("expiresIn");
        token = res.body.access_token;
        done();
      });
  });

  it("it shoult return 403 because not token provided", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/check")
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body)
          .to.have.property("message")
          .to.equal("No Bearer token provided.");
        done();
      });
  });

  it("it shoult return 403 because token expired", (done: MochaDone) => {
    chai
      .request(AppServer)
      .get("/api/check")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1ZW50aW5AbGVtYWlyZXByby5mciIsImlhdCI6MTUyMjcwMTIzNiwiZXhwIjoxNTIyNzAxNTM2fQ.oi2-XvpCjOynTF7TSVxKA53bY5N_FNVMFyFiCBtDcgY"
      )
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Failed to authenticate token.");
        done();
      });
  });

  it("it shoult return 200 on /api/check with the previous token", (done: MochaDone) => {
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
