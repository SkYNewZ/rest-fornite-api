// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
import { AppServer } from '../src/index'
const expect = chai.expect
chai.use(chaiHttp)

chai.use(chaiHttp)

// Our parent block
describe('Check', () => {
  it('it should return fornite ETA', (done) => {
    chai.request(AppServer)
      .get('/check')
      .end((err, res) => {
        if (err) {
          done()
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('status')
        done()
      })
  })
})
