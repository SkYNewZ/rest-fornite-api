//During the test the env letiable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('Check', () => {
    it('it should return fornite ETA', (done) => {
        chai.request(server)
            .get('/check')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.should.have.property('status');
                done();
            });
    });
});
