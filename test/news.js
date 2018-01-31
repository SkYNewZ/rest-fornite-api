//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

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
