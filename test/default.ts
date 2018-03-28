// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
import { Response, Request } from 'express'
const chai = require('chai');
const chaiHttp = require('chai-http');
import { AppServer } from '../src/index'
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('Default', () => {
  it('it should 404', (done) => {
    chai.request(AppServer)
      .get('/404')
      .end((err, res: Express.Response) => {
        expect(res).to.have.status(404)
        done()
      })
  })
})
