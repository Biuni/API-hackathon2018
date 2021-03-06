/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const expect = chai.expect
chai.use(chaiHttp)

describe('Connection', () => {
  it('GET - server responds with status 200', (done) => {
    chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - database status is connected', (done) => {
    chai.request(app)
      .get('/')
      .then((res) => {
        expect(res.body.database).to.equal('connected')
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - the services are all avaiable', (done) => {
    chai.request(app)
      .get('/')
      .then((res) => {
        expect(res.body.status).to.equal(1)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
})
