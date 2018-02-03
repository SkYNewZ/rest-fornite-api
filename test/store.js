//During the test the env letiable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Shop', () => {
    it('it should get store info', (done) => {
        chai.request(server)
            .get('/store')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should get store info in french', (done) => {
        chai.request(server)
            .get('/store/fr')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should get store info in it', (done) => {
        chai.request(server)
            .get('/store/it')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
