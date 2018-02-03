//During the test the env letiable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

let response = null;

chai.use(chaiHttp);

describe('Caching', () => {
    it('it should be slow', (done) => {
        chai.request(server)
            .get('/check')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.property('status');
                response = res.body;
                done();
            });
    });

    it('it should be quick', (done) => {
        chai.request(server)
            .get('/check')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql(response);
                done();
            });
    });
});
