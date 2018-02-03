//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../api');
var Config = require('../src/config');

chai.use(chaiHttp);

//Our parent block
describe('Static files, test only one', () => {
  describe('/GET ' + Config.static_uri + '/store/[VIRTUAL]1_x_Candy_Axe_for_1500_MtxCurrency.png', () => {
    it('it should return fornite ETA', (done) => {
      chai.request(server)
        .get(Config.static_uri + '/store/[VIRTUAL]1_x_Candy_Axe_for_1500_MtxCurrency.png')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
