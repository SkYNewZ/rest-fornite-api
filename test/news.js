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
  describe('/GET /v1/news/:lang?', () => {
    it('it should return news', (done) => {
      chai.request(server)
        .get('/v1/news')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });

    });
  });

  describe('/GET /v1/news/:lang?', () => {
    it('it should return news in french', (done) => {
      chai.request(server)
        .get('/v1/news/fr')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });

    });
  });
});
