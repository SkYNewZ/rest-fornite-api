// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
import { AppServer } from '../index'
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('Default', () => {
  it('it should 404', (done) => {
    chai.request(AppServer)
      .get('/404')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('code')
        expect(res.body).to.have.property('message').to.equal('Page not found')
        done()
      })
  })
})
