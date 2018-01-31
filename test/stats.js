//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');
const uuidv1 = require('uuid');

chai.use(chaiHttp);

describe('Stats with username', () => {
  describe('/GET /stats/:plateform/:username', () => {
    it('it should return 404 because wrong username', (done) => {
      chai.request(server)
        .get('/stats/pc/wrongusernameatall')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Player Not Found');
          done();
        });
    });
  });

  describe('/GET /stats/:plateform/:username', () => {
    it('it should return 404 because wrond plateform for given username', (done) => {
      chai.request(server)
        .get('/stats/ps4/skynewz')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Impossible to fetch User. User not found on this platform');
          done();
        });
    });
  });

  describe('/GET /stats/:plateform/:username', () => {
    it('it should return 400 because bad plateform', (done) => {
      chai.request(server)
        .get('/stats/aaa/skynewz')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message').eql('Please precise a good platform: ps4/xb1/pc');
          done();
        });
    });
  });

  describe('/GET /stats/:plateform/:username', () => {
    it('it should get stats', (done) => {
      chai.request(server)
        .get('/stats/pc/skynewz')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('Stats with ID', () => {
  describe('/GET /stats/id/:platform/:id', () => {
    it('it should GET stats by the given ID', (done) => {
      chai.request(server)
        .get('/stats/id/pc/8b057df0-e637-44f3-8962-f3c7635674b4')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET /stats/id/:platform/:id', () => {
    it('it should return 404 because GOOD id but WRONG plateform', (done) => {
      chai.request(server)
        .get('/stats/id/ps4/8b057df0-e637-44f3-8962-f3c7635674b4')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Impossible to fetch User. User not found on this platform');
          done();
        });
    });
  });

  describe('/GET /stats/id/:platform/:id with id : ' + uuidv1(), () => {
    it('it should return 404 because GOOD platform but WROND id', (done) => {
      chai.request(server)
        .get('/stats/id/pc/' + uuidv1())
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Impossible to fetch User. User not found on this platform');
          done();
        });
    });
  });

  describe('/GET /stats/id/:platform/:id', () => {
    it('it should return 400 because plateform is unknown', (done) => {
      chai.request(server)
        .get('/stats/id/aaa/8b057df0-e637-44f3-8962-f3c7635674b4')
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
