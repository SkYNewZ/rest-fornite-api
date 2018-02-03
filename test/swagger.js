//During the test the env letiable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');
let Config = require('../src/config');

chai.use(chaiHttp);

//Our parent block
describe('Swagger', () => {
    it('it should 200', (done) => {
        chai.request(server)
            .get(Config.static_uri + '/swagger.json')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should 200', (done) => {
        chai.request(server)
            .get(Config.static_uri + '/swagger.yaml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should 200', (done) => {
        chai.request(server)
            .get('/api-docs')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
