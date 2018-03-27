// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
import * as chai from 'chai'
import * as chaiHttp from 'chai-http'
import { AppServer } from '../index'
import { AppConfig } from '../config/config'
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('Swagger', () => {
  it('it should 200', (done) => {
    chai.request(AppServer)
      .get(AppConfig.static_uri + '/swagger.json')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(AppServer)
      .get(AppConfig.static_uri + '/swagger.yaml')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(AppServer)
      .get('/api-docs')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        done()
      })
  })
})
