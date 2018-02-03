//During the test the env letiable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../api');

chai.use(chaiHttp);

//Our parent block
describe('User', () => {
    it('it should GET a user by the given username', (done) => {
        chai.request(server)
            .get('/user/pc/skynewz')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should return 404 because wrong username', (done) => {
        chai.request(server)
            .get('/user/pc/wrongusernameatall')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('code');
                res.body.should.have.property('message');
                done();
            });
    });

    it('it should return 404 because wrond plateform', (done) => {
        chai.request(server)
            .get('/user/ps4/skynewz')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('code');
                res.body.should.have.property('message');
                done();
            });
    });

    it('it should return 400 because wrond plateform', (done) => {
        chai.request(server)
            .get('/user/aaa/skynewz')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('code');
                res.body.should.have.property('message');
                done();
            });
    });
});
