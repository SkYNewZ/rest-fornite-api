//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Downloadable files', () => {
  describe('/GET /v1/swagger.json', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get('/v1/swagger.json')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });

    });
  });

  describe('/GET /v1/swagger.yaml', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get('/v1/swagger.yaml')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });

    });
  });
});
