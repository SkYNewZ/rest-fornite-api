// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
import { AppConfig } from '../src/config/config'
import { Response, Request } from 'express'
import * as chai from 'chai'
import { expect } from 'chai'
import { AppServer } from '../src/index'
import chaiHttp = require('chai-http')
chai.use(chaiHttp)

// Our parent block
describe('Swagger', () => {
  it('it should 200', (done) => {
    chai.request(AppServer)
      .get(AppConfig.static_uri + '/swagger.json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(AppServer)
      .get(AppConfig.static_uri + '/swagger.yaml')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(AppServer)
      .get('/api-docs')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})
