//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('PVE', () => {
  describe('/GET /pve/:username', () => {
    it('it should return 404 because wrong username', (done) => {
      chai.request(server)
        .get('/pve/wrongusernameatall')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/GET /pve/:username', () => {
    it('it should return pve info for given username', (done) => {
      chai.request(server)
        .get('/pve/skynewz')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('PVE INFO', () => {
  describe('/GET /pve/info/:lang?', () => {
    it('it fornite pve info in french', (done) => {
      chai.request(server)
        .get('/pve/info/fr')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /pve/info/:lang?', () => {
    it('it fornite pve info in it', (done) => {
      chai.request(server)
        .get('/pve/info/it')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /pve/info/:lang?', () => {
    it('it fornite pve info', (done) => {
      chai.request(server)
        .get('/pve/info')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});