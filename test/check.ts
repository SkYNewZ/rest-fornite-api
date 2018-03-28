// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
import { Response, Request } from 'express'
import * as chai from 'chai'
import { expect } from 'chai'
import { AppServer } from '../src/index'
import chaiHttp = require('chai-http')
chai.use(chaiHttp)

// Our parent block
describe('Check', () => {
  it('it should return fornite ETA', (done) => {
    chai.request(AppServer)
      .get('/check')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('status')
        done()
      })
  })
})
