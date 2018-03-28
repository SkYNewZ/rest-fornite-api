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
describe('PVE', () => {
  it('it should return 404 because wrong username', (done) => {
    chai.request(AppServer)
      .get('/pve/wrongusernameatall')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code')
        expect(res.body).to.have.property('_message')
        done()
      })
  })

  it('it should return pve info for given username', (done) => {
    chai.request(AppServer)
      .get('/pve/skynewz')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})

describe('PVE INFO', () => {
  it('it fornite pve info in french', (done) => {
    chai.request(AppServer)
      .get('/pve/info/fr')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it fornite pve info in it', (done) => {
    chai.request(AppServer)
      .get('/pve/info/it')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it fornite pve info', (done) => {
    chai.request(AppServer)
      .get('/pve/info')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})
