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
describe('Shop', () => {
  it('it should get store info', (done) => {
    chai.request(AppServer)
      .get('/store')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should get store info in french', (done) => {
    chai.request(AppServer)
      .get('/store/fr')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should get store info in it', (done) => {
    chai.request(AppServer)
      .get('/store/it')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})
