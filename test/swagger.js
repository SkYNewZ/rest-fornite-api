//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Swagger', () => {
  describe('/GET /static/swagger.json', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get('/static/swagger.json')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });

    });
  });

  describe('/GET /static/swagger.yaml', () => {
    it('it should 200', (done) => {
      chai.request(server)
        .get('/static/swagger.yaml')
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