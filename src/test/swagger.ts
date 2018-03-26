// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../api')
const Config = require('../config/config')
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('Swagger', () => {
  it('it should 200', (done) => {
    chai.request(server)
      .get(Config.static_uri + '/swagger.json')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(server)
      .get(Config.static_uri + '/swagger.yaml')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        done()
      })
  })

  it('it should 200', (done) => {
    chai.request(server)
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
