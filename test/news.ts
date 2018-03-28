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
describe('News', () => {
  it('it should return news', (done) => {
    chai.request(AppServer)
      .get('/news')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should return news in french', (done) => {
    chai.request(AppServer)
      .get('/news/fr')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should return news in it', (done) => {
    chai.request(AppServer)
      .get('/news/it')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})
