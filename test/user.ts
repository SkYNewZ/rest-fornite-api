// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
import { AppServer } from '../src/index'
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('User', () => {
  it('it should GET a user by the given username', (done) => {
    chai.request(AppServer)
      .get('/user/pc/skynewz')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should return 404 because wrong username', (done) => {
    chai.request(AppServer)
      .get('/user/pc/wrongusernameatall')
      .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code')
        expect(res.body).to.have.property('_message')
        done()
      })
  })

  it('it should return 404 because wrond plateform', (done) => {
    chai.request(AppServer)
      .get('/user/ps4/skynewz')
      .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code')
        expect(res.body).to.have.property('_message')
        done()
      })
  })

  it('it should return 400 because wrond plateform', (done) => {
    chai.request(AppServer)
      .get('/user/aaa/skynewz')
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code')
        expect(res.body).to.have.property('_message')
        done()
      })
  })
})
