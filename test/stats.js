//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');
const uuidv1 = require('uuid/v1');

chai.use(chaiHttp);

//Our parent block
describe('Stats', () => {

  // <---------------------------------> WITH USERNAME


  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should return 404 because wrong username', (done) => {
      chai.request(server)
        .get('/v1/stats/pc/wrongusernameatall')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Player Not Found');
          done();
        });
    });
  });

  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should return 404 because wrond plateform for given username', (done) => {
      chai.request(server)
        .get('/v1/stats/ps4/skynewz')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Impossible to fetch User. User not found on this platform');
          done();
        });
    });
  });

  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should return 400 because bad plateform', (done) => {
      chai.request(server)
        .get('/v1/stats/aaa/skynewz')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message').eql('Please precise a good platform: ps4/xb1/pc');
          done();
        });
    });
  });

  describe('/GET /v1/stats/:plateform/:username', () => {
    it('it should get stats', (done) => {
      chai.request(server)
        .get('/v1/stats/pc/skynewz')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });


  // <---------------------------------> WITH ID

  describe('/GET /v1/stats/id/:platform/:id', () => {
    it('it should GET stats by the given ID', (done) => {
      chai.request(server)
        .get('/v1/stats/id/pc/8b057df0e63744f38962f3c7635674b4')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /v1/stats/id/:platform/:id', () => {
    it('it should return 404 because wrong plateform', (done) => {
      chai.request(server)
        .get('/v1/stats/id/ps4/8b057df0e63744f38962f3c7635674b4')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Impossible to fetch User. User not found on this platform');
          done();
        });
    });
  });

  describe('/GET /v1/stats/id/:platform/:id', () => {
    it('it should return 404 because wrong ID', (done) => {
      chai.request(server)
        .get('/v1/stats/id/pc/8b057df0e63744f38962f3c7635674b4AAAAA')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Impossible to fetch User.');
          done();
        });
    });
  });

  describe('/GET /v1/stats/id/:platform/:id' + uuidv1(), () => {
    it('it should return 400 because bad plateform', (done) => {
      chai.request(server)
        .get('/v1/stats/id/aaa/' + uuidv1())
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message').eql('Please precise a good platform: ps4/xb1/pc');
          done();
        });
    });
  });
});
