/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

const expect = chai.expect
chai.use(chaiHttp)

describe('Connection', () => {
  it('GET - server responds with status 200', (done) => {
    chai.request(app)
      .get('/conn/info')
      .then((res) => {
        expect(res).to.have.status(200)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - server status is connected', (done) => {
    chai.request(app)
      .get('/conn/info')
      .then((res) => {
        expect(res.body.server).to.equal('connected')
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - database status is connected', (done) => {
    chai.request(app)
      .get('/conn/info')
      .then((res) => {
        expect(res.body.database).to.equal('connected')
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - the database is downloadable', (done) => {
    chai.request(app)
      .get('/conn/data')
      .then((res) => {
        expect(res.body.status).to.equal(1)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
})
