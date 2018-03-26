// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../api')
const expect = chai.expect
chai.use(chaiHttp)

// Our parent block
describe('PVE', () => {
  it('it should return 404 because wrong username', (done) => {
    chai.request(server)
      .get('/pve/wrongusernameatall')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('code')
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('it should return pve info for given username', (done) => {
    chai.request(server)
      .get('/pve/skynewz')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})

describe('PVE INFO', () => {
  it('it fornite pve info in french', (done) => {
    chai.request(server)
      .get('/pve/info/fr')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it fornite pve info in it', (done) => {
    chai.request(server)
      .get('/pve/info/it')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it fornite pve info', (done) => {
    chai.request(server)
      .get('/pve/info')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})
