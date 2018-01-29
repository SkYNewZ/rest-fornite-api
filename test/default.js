//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Default tests', () => {
  describe('/GET /404', () => {
    it('it should 404', (done) => {
      chai.request(server)
        .get('/404')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code');
          res.body.should.have.property('message').eql('Page not found');
          done();
        });

    });
  });
});
