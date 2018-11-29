/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

const expect = chai.expect
chai.use(chaiHttp)

describe('Error', () => {
  it('GET - wrong request responds with status 404', (done) => {
    chai.request(app)
      .get('/error')
      .then((res) => {
        expect(res).to.have.status(404)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('POST - wrong request responds with status 404', (done) => {
    chai.request(app)
      .post('/error')
      .then((res) => {
        expect(res).to.have.status(404)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('PUT - wrong request responds with status 404', (done) => {
    chai.request(app)
      .put('/error')
      .then((res) => {
        expect(res).to.have.status(404)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('DELETE - wrong request responds with status 404', (done) => {
    chai.request(app)
      .delete('/error')
      .then((res) => {
        expect(res).to.have.status(404)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
})
