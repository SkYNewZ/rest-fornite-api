//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Stats', () => {
  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should return 404 because wrong username', (done) => {
      chai.request(server)
        .get('/v1/stats/pc/wrongusernameatall')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code');
          res.body.should.have.property('message');
          done();
        });

    });
  });

  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should return 404 because wrond plateform', (done) => {
      chai.request(server)
        .get('/v1/stats/ps4/skynewz')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code');
          res.body.should.have.property('message');
          done();
        });

    });
  });

  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should GET stats by the given username', (done) => {
      chai.request(server)
        .get('/v1/stats/pc/skynewz')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });

    });
  });
});