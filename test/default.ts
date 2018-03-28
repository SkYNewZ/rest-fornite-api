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
describe('Default', () => {
  it('it should 404', (done) => {
    chai.request(AppServer)
      .get('/404')
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(AppServer)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.equal('<iframe src="https://skynewz.github.io/rest-fornite-api" style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">Your browser doesn\'t support iframes</iframe>')
        done()
      })
  })
})
