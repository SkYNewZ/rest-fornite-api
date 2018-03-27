// During the test the env letiable is set to test
process.env.NODE_ENV = 'test'

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const uuidv1 = require('uuid')
import { AppServer } from '../src/index'
const expect = chai.expect
chai.use(chaiHttp)


describe('Stats with username', () => {
  it('it should return 404 because wrong username', (done) => {
    chai.request(AppServer)
      .get('/stats/pc/wrongusernameatall')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code').to.equal(404)
        expect(res.body).to.have.property('_message').to.equal('Player Not Found')
        done()
      })
  })

  it('it should return 404 because wrond plateform for given username', (done) => {
    chai.request(AppServer)
      .get('/stats/ps4/skynewz')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code').to.equal(404)
        expect(res.body).to.have.property('_message').to.equal('Impossible to fetch User. User not found on this platform')
        done()
      })
  })

  it('it should return 400 because bad plateform', (done) => {
    chai.request(AppServer)
      .get('/stats/aaa/skynewz')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code').to.equal(400)
        expect(res.body).to.have.property('_message').to.equal('Please precise a good platform: ps4/xb1/pc')
        done()
      })
  })

  it('it should get stats', (done) => {
    chai.request(AppServer)
      .get('/stats/pc/skynewz')
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

describe('Stats with ID', () => {
  it('it should GET stats by the given ID', (done) => {
    chai.request(AppServer)
      .get('/stats/id/pc/8b057df0-e637-44f3-8962-f3c7635674b4')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
  })

  it('it should return 404 because GOOD id but WRONG plateform', (done) => {
    chai.request(AppServer)
      .get('/stats/id/ps4/8b057df0-e637-44f3-8962-f3c7635674b4')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code').to.equal(404)
        expect(res.body).to.have.property('_message').to.equal('Impossible to fetch User. User not found on this platform')
        done()
      })
  })

  it('it should return 404 because GOOD platform but WROND id', (done) => {
    chai.request(AppServer)
      .get('/stats/id/pc/' + uuidv1())
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code').to.equal(404)
        expect(res.body).to.have.property('_message').to.equal('Impossible to fetch User. User not found on this platform')
        done()
      })
  })

  it('it should return 400 because plateform is unknown', (done) => {
    chai.request(AppServer)
      .get('/stats/id/aaa/8b057df0-e637-44f3-8962-f3c7635674b4')
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('_code').to.equal(400)
        expect(res.body).to.have.property('_message').to.equal('Please precise a good platform: ps4/xb1/pc')
        done()
      })
  })
})
