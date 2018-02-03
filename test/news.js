//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('News', () => {
  describe('/GET /news/:lang?', () => {
    it('it should return news', (done) => {
      chai.request(server)
        .get('/news')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /news/:lang?', () => {
    it('it should return news in french', (done) => {
      chai.request(server)
        .get('/news/fr')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /news/:lang?', () => {
    it('it should return news in it', (done) => {
      chai.request(server)
        .get('/news/it')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
