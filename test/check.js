//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Check', () => {
  describe('/GET /check', () => {
    it('it should return fornite ETA', (done) => {
      chai.request(server)
        .get('/check')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.have.property('status');
          done();
        });
    });
  });
});
