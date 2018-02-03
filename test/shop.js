//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Shop', () => {
  describe('/GET /store/:lang?', () => {
    it('it should get store info', (done) => {
      chai.request(server)
        .get('/store')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /store/:lang?', () => {
    it('it should get store info in french', (done) => {
      chai.request(server)
        .get('/store/fr')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /store/:lang?', () => {
    it('it should get store info in it', (done) => {
      chai.request(server)
        .get('/store/it')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
