//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');
let Config = require('../src/config');

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
