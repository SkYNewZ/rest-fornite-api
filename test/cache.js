//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');
let Config = require('../src/config');

var response = null;

chai.use(chaiHttp);

describe('Caching', () => {
  describe('/GET /check WITHOUT caching', () => {
    it('it should be slow', (done) => {
      chai.request(server)
        .get('/check')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
          response = res.body;
          done();
        });
    });
  });

  describe('/GET /check WITH caching', () => {
    it('it should be quick', (done) => {
      chai.request(server)
        .get('/check')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql(response);
          done();
        });
    });
  });
});
