/* eslint-env mocha */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const expect = chai.expect
chai.use(chaiHttp)

describe('Products', () => {
  it('GET - server responds with status 200', (done) => {
    chai.request(app)
      .get('/products')
      .then((res) => {
        expect(res).to.have.status(200)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - products list is avaiable', (done) => {
    chai.request(app)
      .get('/products')
      .then((res) => {
        expect(res.body.status).to.equal(1)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - products details are avaiable', (done) => {
    chai.request(app)
      .get('/products/get/1')
      .then((res) => {
        expect(res.body.status).to.equal(1)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
  it('GET - waste details are avaiable', (done) => {
    chai.request(app)
      .get('/products/waste/1')
      .then((res) => {
        expect(res.body.status).to.equal(1)
        done()
      })
      .catch((err) => {
        throw err
      })
  })
})
