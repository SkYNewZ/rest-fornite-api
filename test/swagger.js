//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../api');
var Config = require('../src/config');

chai.use(chaiHttp);

//Our parent block
describe('Swagger', () => {
  describe('/GET ' + Config.static_uri + '/swagger.json', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get(Config.static_uri + '/swagger.json')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET ' + Config.static_uri + '/swagger.yaml', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get(Config.static_uri + '/swagger.yaml')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET /api-docs', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get('/api-docs')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
